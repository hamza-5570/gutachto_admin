import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useCreateCaseMutation } from "@/services/admin-api";
import { toast } from "react-toastify";

/* -------------------------
   Yup Schemas (unchanged)
   ------------------------- */

const vehicleImageSchema = Yup.object().shape({
  id: Yup.string().required("Image id is required"),
  angle: Yup.string().required("Angle is required"),
  image_url: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL required"),
});

const witnessSchema = Yup.object().shape({
  id: Yup.string().required("Witness id is required"),
  address: Yup.string().required("Address is required"),
});

const accidentSchema = Yup.object().shape({
  id: Yup.string().required("Accident id required"),
  date: Yup.date().nullable().required("Accident date is required"),
  location: Yup.string().required("Location is required"),
  vehicle_images: Yup.array().of(vehicleImageSchema).min(0),
  vehicle_id: Yup.string().required("Vehicle id is required"),
  vehicle_opponent_license_plate: Yup.string().required(
    "Opponent license plate required"
  ),
  accident_description: Yup.string().required("Description required"),
});

const damageSchema = Yup.object().shape({
  id: Yup.string().required("Damage id is required"),
  rear_impact_crash: Yup.boolean(),
  lane_change: Yup.boolean(),
  right_of_way_violation: Yup.boolean(),
  parking_lot: Yup.boolean(),
  other: Yup.string().nullable(),
  description: Yup.string().nullable(),
  diagonal_view: Yup.boolean(),
  view_of_damage: Yup.boolean(),
  prior_damage: Yup.boolean(),
  tires: Yup.boolean(),
  status: Yup.string().nullable(),
});

const reportSchema = Yup.object().shape({
  id: Yup.string().required("Report id required"),
  dismantling_fee: Yup.number().min(0),
  total_car_damage_sum: Yup.number().min(0),
  inspector_fee: Yup.number().min(0),
  lawyer_fee: Yup.number().min(0),
});

const invoiceSchema = Yup.object().shape({
  id: Yup.string().required("Invoice id required"),
  total_invoiced_amount: Yup.number().min(0),
  open_sum: Yup.number().min(0),
  paid_sum: Yup.number().min(0),
});

const CaseSchema = Yup.object().shape({
  account_id: Yup.string().required("Account id required"),
  start_date: Yup.date().nullable().required("Start date required"),
  date_of_last_change: Yup.date()
    .nullable()
    .required("Date of last change required"),
  person_in_charge: Yup.string().required("Person in charge is required"),
  witness: Yup.array().of(witnessSchema).min(0),
  internal_inspector: Yup.string().nullable(),
  car_repair_shop: Yup.string().nullable(),
  accident: accidentSchema,
  damage: damageSchema,
  status: Yup.string().required(),
  report: reportSchema,
  police_file: Yup.string().nullable(),
  mail_correspondence: Yup.array().of(Yup.string().nullable()).min(0),
  invoice: invoiceSchema,
  notes: Yup.string().nullable(),
});

/* -------------------------
   Initial Values (unchanged)
   ------------------------- */

const emptyVehicleImage = () => ({ id: "", angle: "", image_url: "" });
const emptyWitness = () => ({ id: "", address: "" });

const initialValues = {
  account_id: "",
  start_date: new Date().toISOString(),
  date_of_last_change: new Date().toISOString(),
  person_in_charge: "",
  witness: [emptyWitness()],
  internal_inspector: "",
  car_repair_shop: "",
  accident: {
    id: "",
    date: new Date().toISOString(),
    location: "",
    vehicle_images: [emptyVehicleImage()],
    vehicle_id: "",
    vehicle_opponent_license_plate: "",
    accident_description: "",
  },
  damage: {
    id: "",
    rear_impact_crash: false,
    lane_change: false,
    right_of_way_violation: false,
    parking_lot: false,
    other: "",
    description: "",
    diagonal_view: false,
    view_of_damage: false,
    prior_damage: false,
    tires: false,
    status: "",
  },
  status: "case created",
  report: {
    id: "",
    dismantling_fee: 0,
    total_car_damage_sum: 0,
    inspector_fee: 0,
    lawyer_fee: 0,
  },
  police_file: "",
  mail_correspondence: [""],
  invoice: {
    id: "",
    total_invoiced_amount: 0,
    open_sum: 0,
    paid_sum: 0,
  },
  notes: "",
};

/* -------------------------
   Helpers
   ------------------------- */

function getIn(obj, path) {
  if (!obj) return undefined;
  const normalized = path.replace(/\[(\d+)\]/g, ".$1"); // convert a[0] to a.0
  const parts = normalized.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function stepFields(step) {
  switch (step) {
    case 1:
      return [
        "account_id",
        "person_in_charge",
        "internal_inspector",
        "car_repair_shop",
        "status",
      ];
    case 2:
      return ["witness"];
    case 3:
      return [
        "accident.id",
        "accident.date",
        "accident.location",
        "accident.vehicle_id",
        "accident.vehicle_opponent_license_plate",
        "accident.accident_description",
        "accident.vehicle_images",
      ];
    case 4:
      return [
        "damage.id",
        "damage.description",
        "damage.rear_impact_crash",
        "damage.lane_change",
        "damage.right_of_way_violation",
        "damage.parking_lot",
      ];
    case 5:
      return [
        "report.id",
        "report.dismantling_fee",
        "report.total_car_damage_sum",
        "report.inspector_fee",
        "report.lawyer_fee",
        "invoice.id",
        "invoice.total_invoiced_amount",
      ];
    case 6:
      return ["mail_correspondence", "police_file", "notes"];
    default:
      return [];
  }
}

/* -------------------------
   Main Component
   ------------------------- */

export default function AddCaseMultiStepDialog() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [createCase] = useCreateCaseMutation();

  return (
    <Dialog>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button variant="outline">Add Case</Button>
        </DialogTrigger>
      </div>

      <DialogContent className="w-full max-w-screen-xl h-[90vh] p-0 flex flex-col">
        {/* Header (fixed) */}
        <DialogHeader className="p-6 border-b bg-white grid grid-cols-2 items-center">
          <div className="gap-1 flex flex-col">
            <DialogTitle>Register Case</DialogTitle>
            <DialogDescription>Fill the form step by step.</DialogDescription>
          </div>

          <div className="text-sm text-muted-foreground text-right">
            Step {step} of {totalSteps}
          </div>
        </DialogHeader>

        {/* Formik wraps the scrollable body + footer so footer has access to submitForm/isSubmitting */}
        <Formik
          initialValues={initialValues}
          validationSchema={CaseSchema}
          onSubmit={async (values, formikHelpers) => {
            try {
              await createCase(values).unwrap();
              toast.success("Case created successfully");
              formikHelpers.setSubmitting(false);
              // optionally reset form or close dialog (if you have a close handler)
              // formikHelpers.resetForm();
            } catch (err) {
              // Guard: fmt error if shape unexpected
              const msg =
                err?.data?.detail || err?.message || "Failed to create case";
              toast.error(msg);
              formikHelpers.setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            validateForm,
            setTouched,
            submitForm,
            /* submitForm is used by the footer Save button */
          }) => {
            const onNext = async () => {
              const fields = stepFields(step);
              const formErrors = await validateForm();
              const hasError = fields.some((f) => {
                const e = getIn(formErrors, f);
                return e !== undefined && e !== null;
              });

              if (hasError) {
                // mark step fields as touched so errors show
                const touchedObj = {};
                fields.forEach((path) => {
                  const normalized = path.replace(/\[(\d+)\]/g, ".$1");
                  const parts = normalized.split(".");
                  let cur = touchedObj;
                  for (let i = 0; i < parts.length; i++) {
                    const p = parts[i];
                    if (i === parts.length - 1) {
                      cur[p] = true;
                    } else {
                      cur[p] = cur[p] || {};
                      cur = cur[p];
                    }
                  }
                });
                setTouched({ ...touched, ...touchedObj });
                return;
              }

              setStep((s) => Math.min(s + 1, totalSteps));
              window.scrollTo({ top: 0 });
            };

            const onPrev = () => {
              setStep((s) => Math.max(s - 1, 1));
              window.scrollTo({ top: 0 });
            };

            return (
              <>
                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <Card className="py-4">
                    <CardContent>
                      <Form>
                        {/* STEP 1 */}
                        {step === 1 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Account ID</Label>
                              <Input
                                name="account_id"
                                value={values.account_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.account_id && errors.account_id ? (
                                <div className="text-red-600 text-sm">
                                  {errors.account_id}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <Label>Person In Charge</Label>
                              <Input
                                name="person_in_charge"
                                value={values.person_in_charge}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.person_in_charge &&
                              errors.person_in_charge ? (
                                <div className="text-red-600 text-sm">
                                  {errors.person_in_charge}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <Label>Internal Inspector</Label>
                              <Input
                                name="internal_inspector"
                                value={values.internal_inspector}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>

                            <div>
                              <Label>Car Repair Shop</Label>
                              <Input
                                name="car_repair_shop"
                                value={values.car_repair_shop}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>

                            <div>
                              <Label>Status</Label>
                              <Input
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.status && errors.status ? (
                                <div className="text-red-600 text-sm">
                                  {errors.status}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-medium">Witnesses</h3>
                              <FieldArray name="witness">
                                {(arrayHelpers) => (
                                  <div>
                                    <Button
                                      type="button"
                                      variant="default"
                                      onClick={() =>
                                        arrayHelpers.push(emptyWitness())
                                      }
                                    >
                                      Add Witness
                                    </Button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>

                            <FieldArray name="witness">
                              {({ remove }) => (
                                <div className="space-y-3">
                                  {values.witness.map((w, idx) => (
                                    <div
                                      key={idx}
                                      className="grid grid-cols-3 gap-2 items-end"
                                    >
                                      <div>
                                        <Label>Witness ID</Label>
                                        <Input
                                          name={`witness[${idx}].id`}
                                          value={w.id}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        {getIn(touched, `witness.${idx}.id`) &&
                                        getIn(errors, `witness.${idx}.id`) ? (
                                          <div className="text-red-600 text-sm">
                                            {getIn(errors, `witness.${idx}.id`)}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div>
                                        <Label>Address</Label>
                                        <Input
                                          name={`witness[${idx}].address`}
                                          value={w.address}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                        {getIn(
                                          touched,
                                          `witness.${idx}.address`
                                        ) &&
                                        getIn(
                                          errors,
                                          `witness.${idx}.address`
                                        ) ? (
                                          <div className="text-red-600 text-sm">
                                            {getIn(
                                              errors,
                                              `witness.${idx}.address`
                                            )}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div className="flex gap-2">
                                        <Button
                                          type="button"
                                          variant="default"
                                          onClick={() => remove(idx)}
                                        >
                                          Remove
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                          <div className="p-4 border rounded">
                            <h3 className="text-lg font-medium mb-2">
                              Accident
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Accident ID</Label>
                                <Input
                                  name="accident.id"
                                  value={values.accident.id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {getIn(touched, "accident.id") &&
                                getIn(errors, "accident.id") ? (
                                  <div className="text-red-600 text-sm">
                                    {getIn(errors, "accident.id")}
                                  </div>
                                ) : null}
                              </div>

                              <div>
                                <Label>Accident Date</Label>
                                <Input
                                  type="datetime-local"
                                  name="accident.date"
                                  value={
                                    values.accident.date
                                      ? new Date(values.accident.date)
                                          .toISOString()
                                          .slice(0, 16)
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleChange({
                                      target: {
                                        name: "accident.date",
                                        value: new Date(
                                          e.target.value
                                        ).toISOString(),
                                      },
                                    })
                                  }
                                  onBlur={handleBlur}
                                />
                                {getIn(touched, "accident.date") &&
                                getIn(errors, "accident.date") ? (
                                  <div className="text-red-600 text-sm">
                                    {getIn(errors, "accident.date")}
                                  </div>
                                ) : null}
                              </div>

                              <div>
                                <Label>Location</Label>
                                <Input
                                  name="accident.location"
                                  value={values.accident.location}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div>
                                <Label>Vehicle ID</Label>
                                <Input
                                  name="accident.vehicle_id"
                                  value={values.accident.vehicle_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div>
                                <Label>Opponent License Plate</Label>
                                <Input
                                  name="accident.vehicle_opponent_license_plate"
                                  value={
                                    values.accident
                                      .vehicle_opponent_license_plate
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div className="md:col-span-2">
                                <Label>Accident Description</Label>
                                <Textarea
                                  name="accident.accident_description"
                                  value={values.accident.accident_description}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <FieldArray name="accident.vehicle_images">
                                {({ push, remove }) => (
                                  <div className="md:col-span-2">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-md font-medium">
                                        Vehicle Images
                                      </h4>
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          push(emptyVehicleImage())
                                        }
                                      >
                                        Add Image
                                      </Button>
                                    </div>

                                    {values.accident.vehicle_images.map(
                                      (img, i) => (
                                        <div
                                          key={i}
                                          className="grid grid-cols-4 gap-2 items-end mt-2"
                                        >
                                          <div>
                                            <Label>Image ID</Label>
                                            <Input
                                              name={`accident.vehicle_images[${i}].id`}
                                              value={img.id}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                          </div>
                                          <div>
                                            <Label>Angle</Label>
                                            <Input
                                              name={`accident.vehicle_images[${i}].angle`}
                                              value={img.angle}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                          </div>
                                          <div>
                                            <Label>Image URL</Label>
                                            <Input
                                              name={`accident.vehicle_images[${i}].image_url`}
                                              value={img.image_url}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                          </div>
                                          <div className="flex gap-2 mt-1">
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              onClick={() => remove(i)}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          </div>
                        )}

                        {/* STEP 4 */}
                        {step === 4 && (
                          <div className="p-4 border rounded">
                            <h3 className="text-lg font-medium mb-2">Damage</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>Damage ID</Label>
                                <Input
                                  name="damage.id"
                                  value={values.damage.id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div className="col-span-2">
                                <Label>Description</Label>
                                <Textarea
                                  name="damage.description"
                                  value={values.damage.description}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    name="damage.rear_impact_crash"
                                    checked={values.damage.rear_impact_crash}
                                    onChange={(e) =>
                                      handleChange({
                                        target: {
                                          name: "damage.rear_impact_crash",
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <span>Rear Impact Crash</span>
                                </label>

                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    name="damage.lane_change"
                                    checked={values.damage.lane_change}
                                    onChange={(e) =>
                                      handleChange({
                                        target: {
                                          name: "damage.lane_change",
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <span>Lane Change</span>
                                </label>
                              </div>

                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    name="damage.right_of_way_violation"
                                    checked={
                                      values.damage.right_of_way_violation
                                    }
                                    onChange={(e) =>
                                      handleChange({
                                        target: {
                                          name: "damage.right_of_way_violation",
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <span>Right of Way Violation</span>
                                </label>

                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    name="damage.parking_lot"
                                    checked={values.damage.parking_lot}
                                    onChange={(e) =>
                                      handleChange({
                                        target: {
                                          name: "damage.parking_lot",
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <span>Parking Lot</span>
                                </label>
                              </div>

                              <div>
                                <Label>Other</Label>
                                <Input
                                  name="damage.other"
                                  value={values.damage.other}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div>
                                <Label>Status</Label>
                                <Input
                                  name="damage.status"
                                  value={values.damage.status}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 5 */}
                        {step === 5 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded">
                              <h3 className="text-lg font-medium mb-2">
                                Report
                              </h3>
                              <div>
                                <Label>Report ID</Label>
                                <Input
                                  name="report.id"
                                  value={values.report.id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                <div>
                                  <Label>Dismantling Fee</Label>
                                  <Input
                                    type="number"
                                    name="report.dismantling_fee"
                                    value={values.report.dismantling_fee}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div>
                                  <Label>Total Car Damage Sum</Label>
                                  <Input
                                    type="number"
                                    name="report.total_car_damage_sum"
                                    value={values.report.total_car_damage_sum}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div>
                                  <Label>Inspector Fee</Label>
                                  <Input
                                    type="number"
                                    name="report.inspector_fee"
                                    value={values.report.inspector_fee}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label>Lawyer Fee</Label>
                                <Input
                                  type="number"
                                  name="report.lawyer_fee"
                                  value={values.report.lawyer_fee}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>

                            <div className="p-4 border rounded">
                              <h3 className="text-lg font-medium mb-2">
                                Invoice
                              </h3>
                              <div>
                                <Label>Invoice ID</Label>
                                <Input
                                  name="invoice.id"
                                  value={values.invoice.id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                <div>
                                  <Label>Total Invoiced Amount</Label>
                                  <Input
                                    type="number"
                                    name="invoice.total_invoiced_amount"
                                    value={values.invoice.total_invoiced_amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div>
                                  <Label>Open Sum</Label>
                                  <Input
                                    type="number"
                                    name="invoice.open_sum"
                                    value={values.invoice.open_sum}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <div>
                                  <Label>Paid Sum</Label>
                                  <Input
                                    type="number"
                                    name="invoice.paid_sum"
                                    value={values.invoice.paid_sum}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 6 */}
                        {step === 6 && (
                          <div>
                            <FieldArray name="mail_correspondence">
                              {({ push, remove }) => (
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-medium">
                                      Mail Correspondence
                                    </h3>
                                    <Button
                                      type="button"
                                      onClick={() => push("")}
                                    >
                                      Add Mail
                                    </Button>
                                  </div>

                                  {values.mail_correspondence.map((m, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2 mt-2"
                                    >
                                      <Input
                                        name={`mail_correspondence[${i}]`}
                                        value={m}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => remove(i)}
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </FieldArray>

                            <div className="mt-4">
                              <Label>Police File</Label>
                              <Input
                                name="police_file"
                                value={values.police_file}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>

                            <div className="mt-4">
                              <Label>Notes</Label>
                              <Textarea
                                name="notes"
                                value={values.notes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        )}
                      </Form>
                    </CardContent>
                  </Card>
                </div>

                {/* Fixed footer (inside Formik render so we have submitForm/isSubmitting) */}
                <DialogFooter className="p-4 border-t bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    {step > 1 && (
                      <Button type="button" onClick={onPrev}>
                        Previous
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {step < totalSteps && (
                      <Button type="button" onClick={onNext}>
                        Next
                      </Button>
                    )}

                    {step === totalSteps && (
                      <Button
                        type="button"
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Save"}
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              </>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
