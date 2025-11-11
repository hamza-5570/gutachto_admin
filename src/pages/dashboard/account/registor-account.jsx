import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input"; // ShadCN Input
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from "@/services/admin-api/accountsApi";
import { useTranslation } from "react-i18next";

export default function Registor() {
  const [showPassword, setShowPassword] = useState(false);
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    account_type: "car mechanic",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    meta_data: {
      company_name: "",
      corporation_contract: "",
    },
  };

  const validationSchema = Yup.object({
    account_type: Yup.string().required(
      t("register_account_form.errors.account_type")
    ),
    first_name: Yup.string().required(
      t("register_account_form.errors.firstname")
    ),
    last_name: Yup.string().required(
      t("register_account_form.errors.lastname")
    ),
    username: Yup.string()
      .email(t("register_account_form.errors.invalid_email"))
      .required(t("register_account_form.errors.email")),
    password: Yup.string()
      .min(6, t("register_account_form.errors.password_length"))
      .required(t("register_account_form.errors.password")),
    phone: Yup.string()
      .matches(
        /^\+?[0-9]{7,15}$/,
        t("register_account_form.errors.phone_valid")
      )
      .required(t("register_account_form.errors.phone")),

    address: Yup.string().required(t("register_account_form.errors.address")),
    meta_data: Yup.object({
      company_name: Yup.string().required(
        t("register_account_form.errors.meta_data.company_name")
      ),
      corporation_contract: Yup.string().url(
        t("register_account_form.errors.meta_data.corporation_contract")
      ),
    }),
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values) => {
    try {
      await createAccount(values).unwrap();
      toast.success(t("register_account_form.toast.success"));
      navigate("/dashboard/accounts");
    } catch (err) {
      toast.error(err?.data?.message || t("register_account_form.toast.error"));
    }
  };

  return (
    <div className=" mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>{t("register_account_form.firstname")}*</Label>
                <Field name="first_name">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder={t(
                        "register_account_form.firstname_placeholder"
                      )}
                      className="mt-3"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Label>{t("register_account_form.lastname")}*</Label>
                <Field name="last_name">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder={t(
                        "register_account_form.lastname_placeholder"
                      )}
                      className="mt-3"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>{t("register_account_form.email")}*</Label>
                <Field name="username">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder={t("register_account_form.email_placeholder")}
                      className="mt-3"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Label>{t("register_account_form.phone")}*</Label>
                <Field name="phone">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="03511234567"
                      className="mt-3"
                    />
                  )}
                </Field>
                <span className="text-xs text-gray-400">e. g 03511234567</span>

                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>{t("register_account_form.company_name")}*</Label>
                <Field name="meta_data.company_name">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder={t(
                        "register_account_form.company_name_placeholder"
                      )}
                      className="mt-3"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="meta_data.company_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Label>{t("register_account_form.corporation_contract")}</Label>
                <Field name="meta_data.corporation_contract">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder={t(
                        "register_account_form.corporation_contract_placeholder"
                      )}
                      className="mt-3"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="meta_data.corporation_contract"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div>
              <Label>{t("register_account_form.address")}*</Label>
              <Field name="address">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder={t("register_account_form.address_placeholder")}
                    className="mt-3"
                  />
                )}
              </Field>
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Label>{t("register_account_form.password")}*</Label>
              <div className="relative">
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder={t(
                        "register_account_form.password_placeholder"
                      )}
                      className="mt-3 pr-14"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute top-3 right-3 text-sm"
                >
                  {showPassword
                    ? t("register_account_form.hide")
                    : t("register_account_form.show")}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? t("register_account_form.loading")
                : t("register_account_form.create_account")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
