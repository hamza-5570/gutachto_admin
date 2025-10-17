import React from "react";
import { Formik, Form } from "formik";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGetCaseByIdQuery,
  useUpdateCaseMutation,
} from "@/services/admin-api";
import toast from "react-hot-toast";

export default function CaseStausForm({ refetch, object }) {
  const [updateCase, { isLoading }] = useUpdateCaseMutation();
  const { data } = useGetCaseByIdQuery(object._id);
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    try {
      const response = await updateCase({
        case_id: object._id,
        new_status: values.new_status,
      }).unwrap();
      if (response) {
        refetch();
      }

      resetForm();
    } catch (error) {
      toast.error(error.data.detail);
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
          <div className="grid grid-cols-1 gap-x-5">
            <div>
              <Label className="text-sm text-[#090F0D] font-medium">
                Status
              </Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.new_status}
                name="new_status"
                className="w-full h-[45px] bg-white border border-[#D0D5DD] rounded-xl mt-1"
                placeholder="Created"
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
