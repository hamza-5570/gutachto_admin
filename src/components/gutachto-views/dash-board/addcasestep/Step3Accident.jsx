import ProductMedia from "@/components/product-media";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getIn } from "formik";

export default function Step3Accident({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-medium mb-2">Accident</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Accident Date</Label>
          <Input
            type="datetime-local"
            name="accident.date"
            value={
              values.accident.date
                ? new Date(values.accident.date).toISOString().slice(0, 16)
                : ""
            }
            onChange={(e) =>
              handleChange({
                target: {
                  name: "accident.date",
                  value: new Date(e.target.value).toISOString(),
                },
              })
            }
            onBlur={handleBlur}
          />
          {getIn(touched, "accident.date") && getIn(errors, "accident.date") ? (
            <div className="text-red-600 text-sm">
              {getIn(errors, "accident.date")}
            </div>
          ) : null}
        </div>

        <div>
          <Label>Location</Label>
          <Input
            name="accident.location"
            value={values.accident.location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {getIn(touched, "accident.location") &&
          getIn(errors, "accident.location") ? (
            <div className="text-red-600 text-sm">
              {getIn(errors, "accident.location")}
            </div>
          ) : null}
        </div>

        <div>
          <Label>Vehicle ID</Label>
          <Input
            name="accident.vehicle_id"
            value={values.accident.vehicle_id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {getIn(touched, "accident.vehicle_id") &&
          getIn(errors, "accident.vehicle_id") ? (
            <div className="text-red-600 text-sm">
              {getIn(errors, "accident.vehicle_id")}
            </div>
          ) : null}
        </div>

        <div>
          <Label>Opponent License Plate</Label>
          <Input
            name="accident.vehicle_opponent_license_plate"
            value={values.accident.vehicle_opponent_license_plate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {getIn(touched, "accident.vehicle_opponent_license_plate") &&
          getIn(errors, "accident.vehicle_opponent_license_plate") ? (
            <div className="text-red-600 text-sm">
              {getIn(errors, "accident.vehicle_opponent_license_plate")}
            </div>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <Label>Accident Description</Label>
          <Textarea
            name="accident.accident_description"
            value={values.accident.accident_description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {getIn(touched, "accident.accident_description") &&
          getIn(errors, "accident.accident_description") ? (
            <div className="text-red-600 text-sm">
              {getIn(errors, "accident.accident_description")}
            </div>
          ) : null}
        </div>
      </div>

      {/* Pass setFieldValue so ProductMedia can update vehicle images */}
      <div className="mt-4">
        <ProductMedia title="Vehicle Images" />
        {getIn(touched, "accident.vehicle_images") &&
        getIn(errors, "accident.vehicle_images") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "accident.vehicle_images")}
          </div>
        ) : null}
      </div>
    </div>
  );
}
