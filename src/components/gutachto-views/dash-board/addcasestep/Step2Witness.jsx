import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldArray, getIn } from "formik";

export const emptyWitness = () => ({ address: "" });

export default function Step2Witness({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  return (
    <div className="bg-gray-100 p-3 rounded">
      <div className="flex items-center justify-between mb-2 ">
        <h3 className="text-lg font-medium">Witnesses</h3>
        <FieldArray name="witness">
          {(arrayHelpers) => (
            <div>
              <Button
                type="button"
                variant="default"
                onClick={() => arrayHelpers.push(emptyWitness())}
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
              <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                <div>
                  <Label>Address</Label>
                  <Input
                    name={`witness[${idx}].address`}
                    value={w.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {getIn(touched, `witness.${idx}.address`) &&
                  getIn(errors, `witness.${idx}.address`) ? (
                    <div className="text-red-600 text-sm">
                      {getIn(errors, `witness.${idx}.address`)}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Remove</Label>
                  <Button
                    type="button"
                    variant="default"
                    className="w-fit"
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
  );
}
