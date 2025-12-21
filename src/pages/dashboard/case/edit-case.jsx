// -------------------------
// 1) Imports
// -------------------------
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Step1GeneralInfo from "@/components/gutachto-views/dash-board/addcasestep/Step1GeneralInfo";
import Step2Witness from "@/components/gutachto-views/dash-board/addcasestep/Step2Witness";
import Step3Accident from "@/components/gutachto-views/dash-board/addcasestep/Step3Accident";
import Step4Damage from "@/components/gutachto-views/dash-board/addcasestep/Step4Damage";
import Step5ReportInvoice from "@/components/gutachto-views/dash-board/addcasestep/Step5ReportInvoice";
import Step6Other from "@/components/gutachto-views/dash-board/addcasestep/Step6Other";
import {
  useGetCaseByIdQuery,
  useUpdateCaseDetailsMutation,
  useUpdateCaseStatusMutation,
} from "@/services/admin-api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { Stepper } from "./add-case";

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
// 6) Main Component: AddCase
// -------------------------
export default function EidtCase() {
  const [step, setStep] = useState(1);
  const [updateCaseDetails, { isLoading: isCreating }] =
    useUpdateCaseDetailsMutation();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id"); // e.g. /users?page=2
  const { data: caseData } = useGetCaseByIdQuery(id);
  const [updateCaseStatus, { isLoading }] = useUpdateCaseStatusMutation();
  const { t } = useTranslation();
  const totalSteps = 6;
  const navigate = useNavigate();

  return (
    <div>
      {/* Stepper */}
      <Stepper currentStep={step} />

      {/* Formik */}
      <Formik
        initialValues={{
          ...caseData,
          damage: {
            ...caseData?.damage,
            rear_impact_crash: caseData?.damage?.rear_impact_crash
              ? "yes"
              : "no",
            lane_change: caseData?.damage?.lane_change ? "yes" : "no",
            right_of_way_violation: caseData?.damage?.right_of_way_violation
              ? "yes"
              : "no",
            parking_lot: caseData?.damage?.parking_lot ? "yes" : "no",
          },
        }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          // handle submit (API call etc.)
          console.log("values", values);
          updateCaseStatus({ case_id: id, new_status: values.status }).unwrap();

          updateCaseDetails({
            case_id: id,
            data: {
              ...values,
              damage: {
                ...values.damage,
                rear_impact_crash:
                  values.damage?.rear_impact_crash == "yes" ? true : false,
                lane_change: values.damage?.lane_change == "yes" ? true : false,
                right_of_way_violation:
                  values.damage?.right_of_way_violation == "yes" ? true : false,
                parking_lot: values?.damage.parking_lot == "yes" ? true : false,
              },
            },
          })
            .unwrap()
            .then((result) => {
              toast.success(t("regiser_case.success_message.updated_case"));
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
                    {t("regiser_case.step2witness.previous")}
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button type="button" onClick={onNext}>
                    {t("regiser_case.step1generalinfo.next")}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submitForm}
                    disabled={isSubmitting}
                  >
                    {isCreating ? (
                      <Loader />
                    ) : (
                      t("regiser_case.step6Other.save")
                    )}
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
