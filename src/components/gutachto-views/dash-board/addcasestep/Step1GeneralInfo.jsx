import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getIn } from "formik";
import { useTranslation } from "react-i18next";

export default function Step1GeneralInfo({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <div>
        <Label>{t("regiser_case.step1generalinfo.id")}</Label>
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
      </div> */}

      <div>
        <Label>{t("regiser_case.step1generalinfo.person_in_charge")}</Label>
        <Input
          name="person_in_charge"
          value={values.person_in_charge}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-2"
          placeholder={t(
            "regiser_case.step1generalinfo.placeholders.person_in_charge"
          )}
        />
        {getIn(touched, "person_in_charge") &&
        getIn(errors, "person_in_charge") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "person_in_charge")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>{t("regiser_case.step1generalinfo.internal_inspector")}</Label>
        <Input
          name="internal_inspector"
          value={values.internal_inspector}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-2"
          placeholder={t(
            "regiser_case.step1generalinfo.placeholders.internal_inspector"
          )}
        />
        {getIn(touched, "internal_inspector") &&
        getIn(errors, "internal_inspector") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "internal_inspector")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>{t("regiser_case.step1generalinfo.car_repair_shop")}</Label>
        <Input
          name="car_repair_shop"
          value={values.car_repair_shop}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-2"
          placeholder={t(
            "regiser_case.step1generalinfo.placeholders.car_repair_shop"
          )}
        />
        {getIn(touched, "car_repair_shop") &&
        getIn(errors, "car_repair_shop") ? (
          <div className="text-red-600 text-sm">
            {getIn(errors, "car_repair_shop")}
          </div>
        ) : null}
      </div>

      <div>
        <Label>{t("regiser_case.step1generalinfo.status")}</Label>
        <Input
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-2"
          placeholder={t("regiser_case.step1generalinfo.placeholders.status")}
        />
        {getIn(touched, "status") && getIn(errors, "status") ? (
          <div className="text-red-600 text-sm">{getIn(errors, "status")}</div>
        ) : null}
      </div>
    </div>
  );
}
