import React from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

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

export default function AccountForm() {
  const [UpdateUser, { isLoading }] = useUpdateUserMutation();
  // eslint-disable-next-line no-unused-vars
  const [GetUserProfile, { isLoading: userLoading }] =
    useLazyGetUserProfileQuery();
  const { data, refetch } = useGetUserProfileQuery();
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await UpdateUser(values).unwrap();
      if (response) {
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
          <div className="grid grid-cols-2 gap-x-5">
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                First name
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
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                Last Name
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
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                Username
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
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                Address
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
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                Phone
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
            <div className="flex flex-col">
              <Label className="text-sm text-[#090F0D] font-medium">
                Enable email alerts
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
            <div className="flex flex-col">
              <Label className="text-sm text-[#090F0D] font-medium">
                Enable SMS notifications{" "}
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
