import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldArray } from "formik";

export default function Step6Other({ values, handleChange, handleBlur }) {
  return (
    <div>
      <FieldArray name="mail_correspondence">
        {({ push, remove }) => (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Mail Correspondence</h3>
              <Button type="button" onClick={() => push("")}>
                Add Mail
              </Button>
            </div>

            {values.mail_correspondence.map((m, i) => (
              <div key={i} className="flex items-center gap-2 mt-2">
                <Input
                  name={`mail_correspondence[${i}]`}
                  value={m}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button type="button" onClick={() => remove(i)}>
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
  );
}
