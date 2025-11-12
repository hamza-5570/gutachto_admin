import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldArray, getIn } from "formik";
import { useTranslation } from "react-i18next";

export const emptyWitness = () => ({ address: "" });

export default function Step2Witness({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 p-3 rounded">
      <div className="flex items-center justify-between mb-2 ">
        <h3 className="text-lg font-medium">
          {t("regiser_case.step2witness.witness")}
        </h3>
        <FieldArray name="witness">
          {(arrayHelpers) => (
            <div>
              <Button
                type="button"
                variant="default"
                onClick={() => arrayHelpers.push(emptyWitness())}
              >
                {t("regiser_case.step2witness.add_witness")}
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
                className="grid sm:grid-cols-3 grid-cols-1 gap-2 items-center"
              >
                <div>
                  <Label>{t("regiser_case.step2witness.add_witness")}</Label>
                  <Input
                    name={`witness[${idx}].address`}
                    value={w.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2"
                  />
                  {getIn(touched, `witness.${idx}.address`) &&
                  getIn(errors, `witness.${idx}.address`) ? (
                    <div className="text-red-600 text-sm">
                      {getIn(errors, `witness.${idx}.address`)}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>{t("regiser_case.step2witness.remove")}</Label>
                  <Button
                    type="button"
                    variant="default"
                    className="w-fit"
                    onClick={() => remove(idx)}
                  >
                    {t("regiser_case.step2witness.remove")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
}
