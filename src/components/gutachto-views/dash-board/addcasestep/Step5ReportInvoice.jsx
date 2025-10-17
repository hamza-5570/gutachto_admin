import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getIn } from "formik";

export default function Step5ReportInvoice({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Report</h3>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <div>
            <Label>Dismantling Fee</Label>
            <Input
              type="number"
              name="report.dismantling_fee"
              value={values.report.dismantling_fee}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
            {getIn(touched, "report.dismantling_fee") &&
            getIn(errors, "report.dismantling_fee") ? (
              <div className="text-red-600 text-sm">
                {getIn(errors, "report.dismantling_fee")}
              </div>
            ) : null}
          </div>
          <div>
            <Label>Total Car Damage Sum</Label>
            <Input
              type="number"
              name="report.total_car_damage_sum"
              value={values.report.total_car_damage_sum}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
            {getIn(touched, "report.total_car_damage_sum") &&
            getIn(errors, "report.total_car_damage_sum") ? (
              <div className="text-red-600 text-sm">
                {getIn(errors, "report.total_car_damage_sum")}
              </div>
            ) : null}
          </div>
          <div>
            <Label>Inspector Fee</Label>
            <Input
              type="number"
              name="report.inspector_fee"
              value={values.report.inspector_fee}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
            {getIn(touched, "report.inspector_fee") &&
            getIn(errors, "report.inspector_fee") ? (
              <div className="text-red-600 text-sm">
                {getIn(errors, "report.inspector_fee")}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-2">
          <Label>Lawyer Fee</Label>
          <Input
            type="number"
            name="report.lawyer_fee"
            value={values.report.lawyer_fee}
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
          />
          {getIn(touched, "report.lawyer_fee") &&
          getIn(errors, "report.lawyer_fee") ? (
            <div className="text-red-600 text-sm">
              {getIn(errors, "report.lawyer_fee")}
            </div>
          ) : null}
        </div>
      </div>

      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium mb-2">Invoice</h3>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <div>
            <Label>Total Invoiced Amount</Label>
            <Input
              type="number"
              name="invoice.total_invoiced_amount"
              value={values.invoice.total_invoiced_amount}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
            {getIn(touched, "invoice.total_invoiced_amount") &&
            getIn(errors, "invoice.total_invoiced_amount") ? (
              <div className="text-red-600 text-sm">
                {getIn(errors, "invoice.total_invoiced_amount")}
              </div>
            ) : null}
          </div>
          <div>
            <Label>Open Sum</Label>
            <Input
              type="number"
              name="invoice.open_sum"
              value={values.invoice.open_sum}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
            {getIn(touched, "invoice.open_sum") &&
            getIn(errors, "invoice.open_sum") ? (
              <div className="text-red-600 text-sm">
                {getIn(errors, "invoice.open_sum")}
              </div>
            ) : null}
          </div>
          <div>
            <Label>Paid Sum</Label>
            <Input
              type="number"
              name="invoice.paid_sum"
              value={values.invoice.paid_sum}
              onChange={handleChange}
              onBlur={handleBlur}
              min={0}
            />
            {getIn(touched, "invoice.paid_sum") &&
            getIn(errors, "invoice.paid_sum") ? (
              <div className="text-red-600 text-sm">
                {getIn(errors, "invoice.paid_sum")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
