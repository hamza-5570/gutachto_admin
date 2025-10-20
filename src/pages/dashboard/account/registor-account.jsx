import { useState } from "react";
import { useUserSignUpMutation } from "../../../services/auth-api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input"; // ShadCN Input
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Registor() {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useUserSignUpMutation();
  const navigate = useNavigate();

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
    account_type: Yup.string().required("Account type is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
      .required("Phone number is required"),

    address: Yup.string().required("Address is required"),
    meta_data: Yup.object({
      company_name: Yup.string().required("Company name is required"),
      corporation_contract: Yup.string().url("Invalid URL"),
    }),
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values) => {
    try {
      await signUp(values).unwrap();
      toast.success("Account created successfully");
      navigate("/dashboard/accounts");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" mx-auto pt-12">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-5 pt-5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>First Name*</Label>
                <Field name="first_name">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter first name"
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
                <Label>Last Name*</Label>
                <Field name="last_name">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter last name"
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
                <Label>Email*</Label>
                <Field name="username">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter email"
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
                <Label>Phone*</Label>
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
                <Label>Company Name*</Label>
                <Field name="meta_data.company_name">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter company name"
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
                <Label>Corporation Contract (URL)</Label>
                <Field name="meta_data.corporation_contract">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter contract URL"
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
              <Label>Address*</Label>
              <Field name="address">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter address"
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
              <Label>Password*</Label>
              <div className="relative">
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="mt-3 pr-14"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute top-3 right-3 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Create Account"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
