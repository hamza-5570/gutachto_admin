import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldArray } from "formik";
import { CirclePlus, Plus, Trash, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Step6Other({ values, handleChange, handleBlur }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <div>
          <Label> {t("regiser_case.step6Other.police_file")}</Label>
          <Input
            name="police_file"
            value={values.police_file}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2"
            placeholder={t("regiser_case.step6Other.placeholders.police_file")}
          />
        </div>

        <div>
          <Label>{t("regiser_case.step6Other.notes")}</Label>
          <Textarea
            name="notes"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2"
            placeholder={t("regiser_case.step6Other.placeholders.notes")}
          />
        </div>
      </div>
      <div>
        <FieldArray name="mail_correspondence">
          {({ push, remove }) => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {t("regiser_case.step6Other.mail_correspondence")}
                </h3>
              </div>
              <div>
                {values.mail_correspondence.map((m, i, arr) => (
                  <div key={i} className="flex items-center gap-2 mt-2">
                    <Input
                      name={`mail_correspondence[${i}]`}
                      value={m}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t(
                        "regiser_case.step6Other.placeholders.mail"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <Button type="button" onClick={() => remove(i)}>
                        <Trash2 size="icon" variant="outline" />
                      </Button>
                      {/* SHOW ON LAST INDEX ONLY */}
                      {arr.length - 1 === i && (
                        <div className="flex justify-end ">
                          <Button
                            type="button"
                            className="w-fit "
                            onClick={() => push("")}
                          >
                            <CirclePlus size="icon" variant="outline" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
}
