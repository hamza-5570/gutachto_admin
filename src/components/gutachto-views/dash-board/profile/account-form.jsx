import React from "react";
import { Formik, Form } from "formik";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserMutation,
} from "@/services/auth-api";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function AccountForm() {
  const [UpdateUser, { isLoading }] = useUpdateUserMutation();
  // eslint-disable-next-line no-unused-vars
  const [GetUserProfile, { isLoading: userLoading }] =
    useLazyGetUserProfileQuery();
  const { data, refetch } = useGetUserProfileQuery();
  const { t } = useTranslation();
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await UpdateUser(values).unwrap();
      if (response) {
        toast.success(response.message);
        const userData = await GetUserProfile().unwrap();
        localStorage.setItem("user", JSON.stringify(userData));
        refetch();
      }

      resetForm();
    } catch (error) {
      toast.error(error.data.detail, {
        hideProgressBar: true,
        position: "top-center",
        autoClose: 2000,
      });
      resetForm();
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  return (
    <Formik
      initialValues={{
        ...data,
      }}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="mt-5" onSubmit={props.handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div className="mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.account_information.firstname")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.first_name}
                name="first_name"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
            <div className="mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.account_information.lastname")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.last_name}
                name="last_name"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.account_information.username")}
              </Label>
              <Input
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
                name="username"
                type="text"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
            <div className="mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.account_information.address")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.address}
                name="address"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.account_information.phone")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone}
                name="phone"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-3 gap-x-5">
            <div className="flex  gap-2  mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.alerts_information.enable_email_alerts")}
              </Label>
              <Switch
                checked={props.values.enable_email_alerts}
                onCheckedChange={(value) => {
                  props.setFieldValue("enable_email_alerts", value);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-3 gap-x-5">
            <div className="flex gap-2 mt-3">
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.alerts_information.enable_sms_alerts")}
              </Label>
              <Switch
                checked={props.values.enable_sms_alerts}
                onCheckedChange={(value) => {
                  props.setFieldValue("enable_sms_alerts", value);
                }}
              />
            </div>
          </div>

          <hr className="border-t border-[#EEEEEE] my-5" />

          <Button
            type="submit"
            className="text-xs lg:text-sm font-medium rounded-xl h-[44px] xl:w-[150px]"
          >
            {" "}
            {isLoading ? <Loader /> : "Save changes"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
