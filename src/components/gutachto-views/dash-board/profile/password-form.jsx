import React from "react";
import { Formik, Form } from "formik";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdatePasswordMutation,
} from "@/services/auth-api";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
export default function PasswordForm() {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  // eslint-disable-next-line no-unused-vars
  const [GetUserProfile, { isLoading: userLoading }] =
    useLazyGetUserProfileQuery();
  const { data, refetch } = useGetUserProfileQuery();
  const { t } = useTranslation();
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await updatePassword(values).unwrap();
      if (response) {
        const userData = await GetUserProfile().unwrap();
        localStorage.setItem("user", JSON.stringify(userData));
        refetch();
        toast.success(response.message);
      }

      resetForm();
    } catch (error) {
      toast.error(error.data.message, {
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
                {t("profile.account_information.old_password")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.old_password}
                name="old_password"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                {t("profile.account_information.new_password")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.new_password}
                name="new_password"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Jhon wick"
              />
            </div>
          </div>

          <hr className="border-t border-[#EEEEEE] my-5" />

          <Button
            type="submit"
            className="text-xs lg:text-sm font-medium rounded-xl h-[44px] xl:w-[150px]"
          >
            {" "}
            {isLoading ? (
              <Loader />
            ) : (
              t("profile.account_information.save_changes")
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
