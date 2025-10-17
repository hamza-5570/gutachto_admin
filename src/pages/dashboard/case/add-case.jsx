// -------------------------
// 1) Imports
// -------------------------
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getUser } from "@/utils/helper";
import Step1GeneralInfo from "@/components/gutachto-views/dash-board/addcasestep/Step1GeneralInfo";
import Step2Witness, {
  emptyWitness,
} from "@/components/gutachto-views/dash-board/addcasestep/Step2Witness";
import Step3Accident from "@/components/gutachto-views/dash-board/addcasestep/Step3Accident";
import Step4Damage from "@/components/gutachto-views/dash-board/addcasestep/Step4Damage";
import Step5ReportInvoice from "@/components/gutachto-views/dash-board/addcasestep/Step5ReportInvoice";
import Step6Other from "@/components/gutachto-views/dash-board/addcasestep/Step6Other";
import { useCreateCaseMutation } from "@/services/admin-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// -------------------------
// 2) Stepper Component
// -------------------------
const stepLabels = [
  "General Info",
  "Witness",
  "Accident",
  "Damage",
  "Report & Invoice",
  "Other",
];

function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {stepLabels.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isLast = index === stepLabels.length - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-shrink-0 w-28">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full border-2 z-10
                  ${
                    isCompleted
                      ? "bg-green-500 text-white border-green-500"
                      : ""
                  }
                  ${
                    isActive && !isCompleted
                      ? "bg-black text-white border-black"
                      : ""
                  }
                  ${
                    !isActive && !isCompleted
                      ? "bg-white text-gray-500 border-gray-300"
                      : ""
                  }
                `}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              <span
                className={`mt-2 text-[12px] text-center ${
                  isActive ? "text-black font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 h-0.5 mx-2">
                <div
                  className={`h-0.5 w-full rounded ${
                    index + 1 < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// -------------------------
// 3) Helper: getIn
// -------------------------
function getIn(obj, path) {
  if (!obj) return undefined;
  const normalized = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = normalized.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

// -------------------------
// 4) Helper: stepFields(step)
// -------------------------
// For witnesses we return "witness" (array) and handle detailed checks in onNext
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
      return ["witness"]; // handle per-item validation in onNext
    case 3:
      return [
        "accident.date",
        "accident.location",
        "accident.vehicle_id",
        "accident.vehicle_opponent_license_plate",
        "accident.accident_description",
        "accident.vehicle_images",
      ];
    case 4:
      return [
        "damage.description",
        "damage.rear_impact_crash",
        "damage.lane_change",
        "damage.right_of_way_violation",
        "damage.parking_lot",
      ];
    case 5:
      return [
        "report.dismantling_fee",
        "report.total_car_damage_sum",
        "report.inspector_fee",
        "report.lawyer_fee",
        "invoice.total_invoiced_amount",
      ];
    case 6:
      return ["mail_correspondence", "police_file", "notes"];
    default:
      return [];
  }
}

// -------------------------
// 5) Yup Validation Schemas
// -------------------------
const vehicleImageSchema = Yup.object().shape({
  angle: Yup.string().required("Angle is required"),
  image_url: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL required"),
});

const witnessSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  // add other witness fields here if you have them (name, phone, etc.)
});

const accidentSchema = Yup.object().shape({
  date: Yup.date().nullable().required("Accident date is required"),
  location: Yup.string().required("Location is required"),
  vehicle_images: Yup.array()
    .of(vehicleImageSchema)
    .min(1, "At least one image is required"),
  vehicle_id: Yup.string().required("Vehicle id is required"),
  vehicle_opponent_license_plate: Yup.string().required(
    "Opponent license plate required"
  ),
  accident_description: Yup.string().required("Description required"),
});

const damageSchema = Yup.object().shape({
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
  dismantling_fee: Yup.number()
    .min(0)
    .required("Dismantling fee is required")
    .positive("Dismantling fee must be a positive number"),
  total_car_damage_sum: Yup.number()
    .min(0)
    .required("Sum is required")
    .positive("Sum must be a positive"),
  inspector_fee: Yup.number()
    .min(0)
    .required("Fee is required")
    .positive("Fee must be a positive"),
  lawyer_fee: Yup.number()
    .min(0)
    .required("Fee is required")
    .positive("Fee must be a positive"),
});

const invoiceSchema = Yup.object().shape({
  total_invoiced_amount: Yup.number()
    .min(0)
    .required("Amount is required")
    .positive("Amount must be a positive"),
  open_sum: Yup.number()
    .min(0)
    .required("Open Sum is required")
    .positive("Amount must be a positive"),

  paid_sum: Yup.number()
    .min(0)
    .required("Paid Sum is required")
    .positive("Amount must be a positive"),
});

const CaseSchema = Yup.object().shape({
  account_id: Yup.string().required("Account id required"),
  start_date: Yup.date().nullable().required("Start date required"),
  date_of_last_change: Yup.date()
    .nullable()
    .required("Date of last change required"),
  person_in_charge: Yup.string().required("Person in charge is required"),
  witness: Yup.array().of(witnessSchema).min(0),
  internal_inspector: Yup.string().required("Internal inspector is required"),
  car_repair_shop: Yup.string().required("Car repair shop is required"),
  accident: accidentSchema,
  damage: damageSchema,
  status: Yup.string().required("Status is required"),
  report: reportSchema,
  police_file: Yup.string().nullable(),
  mail_correspondence: Yup.array().of(Yup.string().nullable()).min(0),
  invoice: invoiceSchema,
  notes: Yup.string().nullable(),
});

// -------------------------
// 6) Main Component: AddCase
// -------------------------
export default function AddCase() {
  const [step, setStep] = useState(1);
  const [createCase, { isLoading: isCreating }] = useCreateCaseMutation();
  const totalSteps = 6;
  const user = getUser();
  const navigate = useNavigate();

  const initialValues = {
    account_id: user?._id || "",
    start_date: new Date().toISOString(),
    date_of_last_change: new Date().toISOString(),
    person_in_charge: "",
    witness: [emptyWitness()], // multiple witnesses supported (start with 1)
    internal_inspector: "",
    car_repair_shop: "",
    accident: {
      date: new Date().toISOString(),
      location: "",
      vehicle_images: [],
      vehicle_id: "",
      vehicle_opponent_license_plate: "",
      accident_description: "",
    },
    damage: {
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
      dismantling_fee: "",
      total_car_damage_sum: "",
      inspector_fee: "",
      lawyer_fee: "",
    },
    police_file: "",
    mail_correspondence: [""],
    invoice: {
      total_invoiced_amount: "",
      open_sum: "",
      paid_sum: "",
    },
    notes: "",
  };

  return (
    <div>
      {/* Stepper */}
      <Stepper currentStep={step} />

      {/* Formik */}
      <Formik
        initialValues={initialValues}
        validationSchema={CaseSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // handle submit (API call etc.)
          console.log("Submitting values:", values);
          createCase(values)
            .unwrap()
            .then((result) => {
              toast.success(result.message);
              navigate("/dashboard/all-case");
            })
            .catch((error) => {
              toast.error(error.data.message);
            });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setTouched,
          validateForm,
          submitForm,
          setFieldValue,
          isSubmitting,
        }) => {
          // onNext with special handling for witness array validation
          const onNext = async () => {
            const fields = stepFields(step);
            const formErrors = await validateForm();

            // Base check using stepFields paths
            let hasError = fields.some(
              (f) => getIn(formErrors, f) !== undefined
            );

            // Special handling for witness (multiple)
            if (step === 2) {
              const witnessErrors = getIn(formErrors, "witness");
              // witnessErrors is likely an array where items may be undefined or { address: '...' }
              if (Array.isArray(witnessErrors)) {
                const anyWitnessInvalid = witnessErrors.some(
                  (we) => we && we.address !== undefined && we.address !== null
                );
                if (anyWitnessInvalid) hasError = true;
              }
            }

            if (hasError) {
              // build touched object that marks the relevant fields as touched
              const touchedObj = {};

              fields.forEach((path) => {
                // If field is witness (array) we want to mark each witness address as touched
                if (path === "witness") {
                  // If values.witness exists, create touched.witness = [{ address: true }, ...]
                  const witnessArr = Array.isArray(values.witness)
                    ? values.witness
                    : [];
                  touchedObj.witness = witnessArr.map(() => ({
                    address: true,
                  }));
                } else {
                  // generic path-to-object conversion (handles nested fields like "accident.date")
                  const normalized = path.replace(/\[(\d+)\]/g, ".$1");
                  const parts = normalized.split(".");
                  let cur = touchedObj;
                  for (let i = 0; i < parts.length; i++) {
                    const p = parts[i];
                    if (i === parts.length - 1) cur[p] = true;
                    else {
                      cur[p] = cur[p] || {};
                      cur = cur[p];
                    }
                  }
                }
              });

              // Merge with existing touched so we don't erase other touched flags
              setTouched({
                ...touched,
                ...touchedObj,
              });
              return;
            }

            // advance step
            setStep((s) => Math.min(s + 1, totalSteps));
            window.scrollTo({ top: 0 });
          };
          console.log("Submitting values:", values);

          const onPrev = () => {
            setStep((s) => Math.max(s - 1, 1));
            window.scrollTo({ top: 0 });
          };

          return (
            <>
              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-4">
                <Form>
                  {step === 1 && (
                    <Step1GeneralInfo
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}

                  {step === 2 && (
                    <Step2Witness
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  {step === 3 && (
                    <Step3Accident
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  {step === 4 && (
                    <Step4Damage
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}

                  {step === 5 && (
                    <Step5ReportInvoice
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  {step === 6 && (
                    <Step6Other
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                </Form>
              </div>

              {/* Footer Buttons */}
              <div className="p-4 bg-white flex justify-end items-center gap-2">
                {step > 1 && (
                  <Button type="button" onClick={onPrev}>
                    Previous
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button type="button" onClick={onNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submitForm}
                    disabled={isSubmitting}
                  >
                    {isCreating ? "Saving..." : "Save"}
                  </Button>
                )}
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
