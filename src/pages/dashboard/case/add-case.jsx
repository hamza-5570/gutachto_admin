// -------------------------
// 1) Imports
// -------------------------
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form, FieldArray } from "formik";
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

// -------------------------
// 2) Step Labels
// -------------------------

// -------------------------
// 3) Stepper Component (Responsive)
// -------------------------
function Stepper({ currentStep }) {
  const { t } = useTranslation();
  const stepLabels = [
    t("regiser_case.steps.genral_info"),
    t("regiser_case.steps.witness"),
    t("regiser_case.steps.accident"),
    t("regiser_case.steps.damage"),
    t("regiser_case.steps.report_invoice"),
    t("regiser_case.steps.other"),
  ];
  useEffect(() => {
    const activeStep = document.querySelector(".active-step");
    if (activeStep) {
      activeStep.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [currentStep]);

  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide">
      <div
        className="
          flex items-center justify-start gap-2 sm:gap-3
          min-w-[550px] sm:min-w-0 px-2 sm:px-0
        "
      >
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === stepLabels.length - 1;

          return (
            <React.Fragment key={index}>
              <div
                className={`flex flex-col items-center flex-shrink-0 w-20 sm:w-24 md:w-28 ${
                  isActive ? "active-step" : ""
                }`}
              >
                <div
                  className={`
                    flex items-center justify-center
                    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
                    rounded-full border-2 z-10 text-xs sm:text-sm
                    transition-all duration-200
                    ${
                      isCompleted
                        ? "bg-green-500 text-white border-green-500"
                        : isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-500 border-gray-300"
                    }
                  `}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>

                <span
                  className={`mt-2 text-[10px] sm:text-[12px] text-center leading-tight ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>

              {!isLast && (
                <div className="flex-1 h-0.5 mx-1 sm:mx-2 hidden sm:block">
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
    </div>
  );
}

// -------------------------
// 4) Helper: getIn
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
// 5) Step Field Mapping
// -------------------------
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
// 7) Main Component
// -------------------------
export default function AddCase() {
  const [step, setStep] = useState(1);
  const [createCase, { isLoading: isCreating }] = useCreateCaseMutation();
  const totalSteps = 6;
  const user = getUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // -------------------------
  // 6) Validation Schemas
  // -------------------------
  const vehicleImageSchema = Yup.object().shape({
    angle: Yup.string().required("Angle is required"),
    image_url: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL required"),
  });

  const witnessSchema = Yup.object().shape({
    address: Yup.string().required(
      t("regiser_case.step2witness.errors.witness")
    ),
  });

  const accidentSchema = Yup.object().shape({
    date: Yup.date().nullable().required("Accident date is required"),
    location: Yup.string().required("Location is required"),
    vehicle_images: Yup.array()
      .of(vehicleImageSchema)
      .min(1, t("regiser_case.step3Accident.errors.vehicle_images")),
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
      .required(t("regiser_case.step5Report.errors.dismantling_fee"))
      .positive(),
    total_car_damage_sum: Yup.number()
      .min(0)
      .required(t("regiser_case.step5Report.errors.total_car_damage_sum"))
      .positive(),
    inspector_fee: Yup.number()
      .min(0)
      .required(t("regiser_case.step5Report.errors.inspector_fee"))
      .positive(),
    lawyer_fee: Yup.number()
      .min(0)
      .required(t("regiser_case.step5Report.errors.lawyer_fee"))
      .positive(),
  });

  const invoiceSchema = Yup.object().shape({
    total_invoiced_amount: Yup.number()
      .min(0)
      .required(t("regiser_case.step5Report.errors.total_invoiced_amount"))
      .positive(),
    open_sum: Yup.number()
      .min(0)
      .required(t("regiser_case.step5Report.errors.open_sum"))
      .positive(),
    paid_sum: Yup.number()
      .min(0)
      .required(t("regiser_case.step5Report.errors.paid_sum"))
      .positive(),
  });

  const CaseSchema = Yup.object().shape({
    account_id: Yup.string().required(
      t("regiser_case.step1generalinfo.errors.account_id")
    ),
    start_date: Yup.date()
      .nullable()
      .required(t("regiser_case.step1generalinfo.errors.start_date")),
    date_of_last_change: Yup.date()
      .nullable()
      .required(t("regiser_case.step1generalinfo.errors.date_of_last_change")),
    person_in_charge: Yup.string().required(
      t("regiser_case.step1generalinfo.errors.person_in_charge")
    ),
    witness: Yup.array().of(witnessSchema).min(0),
    internal_inspector: Yup.string().required(
      t("regiser_case.step1generalinfo.errors.internal_inspector")
    ),
    car_repair_shop: Yup.string().required(
      t("regiser_case.step1generalinfo.errors.car_repair_shop")
    ),
    accident: accidentSchema,
    damage: damageSchema,
    status: Yup.string().required(
      t("regiser_case.step1generalinfo.errors.status")
    ),
    report: reportSchema,
    police_file: Yup.string().nullable(),
    mail_correspondence: Yup.array().of(Yup.string().nullable()).min(0),
    invoice: invoiceSchema,
    notes: Yup.string().nullable(),
  });
  // /////////////////////
  // initialValues
  // //////////////////////
  const initialValues = {
    account_id: user?._id,
    start_date: new Date().toISOString(),
    date_of_last_change: new Date().toISOString(),
    person_in_charge: "",
    witness: [emptyWitness()],
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
    <div className="w-full">
      {/* Stepper */}
      <Stepper currentStep={step} />

      {/* Formik */}
      <Formik
        initialValues={initialValues}
        validationSchema={CaseSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const result = await createCase(values).unwrap();
            toast.success(result.message);
            navigate("/dashboard/all-case");
          } catch (error) {
            toast.error(error?.data?.message || "Error creating case");
          } finally {
            setSubmitting(false);
          }
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
          const onNext = async () => {
            const fields = stepFields(step);
            const formErrors = await validateForm();
            let hasError = fields.some(
              (f) => getIn(formErrors, f) !== undefined
            );

            if (step === 2) {
              const witnessErrors = getIn(formErrors, "witness");
              if (Array.isArray(witnessErrors)) {
                const anyInvalid = witnessErrors.some((we) => we && we.address);
                if (anyInvalid) hasError = true;
              }
            }

            if (hasError) {
              const touchedObj = {};
              fields.forEach((path) => {
                if (path === "witness") {
                  touchedObj.witness = (values.witness || []).map(() => ({
                    address: true,
                  }));
                } else {
                  const parts = path.split(".");
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
              <div className="flex-1 overflow-y-auto p-4">
                <Form>
                  {step === 1 && (
                    <Step1GeneralInfo
                      {...{ values, errors, touched, handleChange, handleBlur }}
                    />
                  )}
                  {step === 2 && (
                    <Step2Witness
                      {...{
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                      }}
                    />
                  )}
                  {step === 3 && (
                    <Step3Accident
                      {...{
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                      }}
                    />
                  )}
                  {step === 4 && (
                    <Step4Damage
                      {...{ values, errors, touched, handleChange, handleBlur }}
                    />
                  )}
                  {step === 5 && (
                    <Step5ReportInvoice
                      {...{
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                      }}
                    />
                  )}
                  {step === 6 && (
                    <Step6Other
                      {...{ values, errors, touched, handleChange, handleBlur }}
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
