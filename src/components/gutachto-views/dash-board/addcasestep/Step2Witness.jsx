import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldArray, getIn } from "formik";
import { CirclePlus, Trash2 } from "lucide-react";
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
    <div>
      <div className="grid grid-cols-2">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2 ">
            <h3 className="text-sm font-medium">
              {t("regiser_case.step2witness.witness")}
            </h3>
          </div>

          <FieldArray name="witness">
            {({ remove }) => (
              <div className="flex flex-col gap-2">
                {values?.witness?.map((w, idx) => (
                  <div>
                    <Label>{idx + 1}.</Label>
                    <div key={idx} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input
                          name={`witness[${idx}].address`}
                          value={w.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="mt-2"
                          placeholder={t(
                            "regiser_case.step2witness.placeholders.address"
                          )}
                        />
                        {getIn(touched, `witness.${idx}.address`) &&
                        getIn(errors, `witness.${idx}.address`) ? (
                          <div className="text-red-600 text-sm">
                            {getIn(errors, `witness.${idx}.address`)}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => remove(idx)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
          <div className="flex justify-end mt-5">
            <FieldArray name="witness">
              {(arrayHelpers) => (
                <div>
                  <Button
                    type="button"
                    onClick={() => arrayHelpers.push(emptyWitness())}
                  >
                    <CirclePlus size={20} />{" "}
                    <span className="text-xs">Add New</span>
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>
        </div>
      </div>
    </div>
  );
}
