import React from "react";
import { Formik, Form } from "formik";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useDeleteAccountMutation,
  useGetUserProfileQuery,
} from "@/services/auth-api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function DeleteForm() {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  // eslint-disable-next-line no-unused-vars
  const router = useNavigate();
  const { data } = useGetUserProfileQuery();
  const { t } = useTranslation();
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await deleteAccount(values).unwrap();
      if (response) {
        localStorage.clear();
        toast.success(response.message);
        await router("/");
      }

      resetForm();
    } catch (error) {
      toast.error(error.data.message);
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
                {t("profile.account_information.password")}
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="**************************"
              />
            </div>
          </div>

          <hr className="border-t border-[#EEEEEE] my-5" />

          <Button
            type="submit"
            variant="destructive"
            className="text-xs lg:text-sm font-medium rounded-xl h-[44px] xl:w-[150px]"
          >
            {" "}
            {isLoading ? (
              <Loader />
            ) : (
              t("profile.account_information.delete_account")
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
