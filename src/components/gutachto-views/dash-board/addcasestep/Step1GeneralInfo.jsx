import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getIn } from "formik";

export default function Step1GeneralInfo({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Account ID</Label>
        <Input
          name="account_id"
          value={values.account_id}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getIn(touched, "account_id") && getIn(errors, "account_id") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "account_id")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>Person In Charge</Label>
        <Input
          name="person_in_charge"
          value={values.person_in_charge}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getIn(touched, "person_in_charge") &&
        getIn(errors, "person_in_charge") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "person_in_charge")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>Internal Inspector</Label>
        <Input
          name="internal_inspector"
          value={values.internal_inspector}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getIn(touched, "internal_inspector") &&
        getIn(errors, "internal_inspector") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "internal_inspector")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>Car Repair Shop</Label>
        <Input
          name="car_repair_shop"
          value={values.car_repair_shop}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getIn(touched, "car_repair_shop") &&
        getIn(errors, "car_repair_shop") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "car_repair_shop")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>Status</Label>
        <Input
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {getIn(touched, "status") && getIn(errors, "status") ? (
          <div className="text-red-600 text-sm">{getIn(errors, "status")}</div>
        ) : null}
      </div>
    </div>
  );
}
