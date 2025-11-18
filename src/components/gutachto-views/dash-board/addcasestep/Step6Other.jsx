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
    <div>
      <div className="bg-gray-100 p-3 rounded">
        <FieldArray name="mail_correspondence">
          {({ push, remove }) => (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">
                  {t("regiser_case.step6Other.mail_correspondence")}
                </h3>
                <Button type="button" onClick={() => push("")}>
                  <CirclePlus />
                  {t("regiser_case.step6Other.add_mail")}
                </Button>
              </div>

              {values.mail_correspondence.map((m, i) => (
                <div key={i} className="flex items-center gap-2 mt-2">
                  <Input
                    name={`mail_correspondence[${i}]`}
                    value={m}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2"
                    placeholder={t("regiser_case.step6Other.placeholders.mail")}
                  />
                  <Button type="button" onClick={() => remove(i)}>
                    <Trash2 /> {t("regiser_case.step6Other.remove")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </FieldArray>
      </div>
      <div className="mt-4">
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

      <div className="mt-4">
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
  );
}
