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
} from "@/services/admin-api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  const totalSteps = 6;
  const navigate = useNavigate();

  return (
    <div>
      {/* Stepper */}
      <Stepper currentStep={step} />

      {/* Formik */}
      <Formik
        initialValues={{ ...caseData }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          // handle submit (API call etc.)
          console.log("Submitting values:", values);
          updateCaseDetails({
            case_id: id,
            data: values,
          })
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
