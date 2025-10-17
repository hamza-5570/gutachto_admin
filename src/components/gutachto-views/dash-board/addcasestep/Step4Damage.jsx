import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useFormikContext } from "formik";

export default function Step4Damage() {
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext();

  const handleArrowKeys = (e, field) => {
    if (e.key === "ArrowRight") {
      setFieldValue(field, true);
    } else if (e.key === "ArrowLeft") {
      setFieldValue(field, false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-medium mb-4">Damage</h3>

      {/* 2 Columns: Left = Switches, Right = Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RIGHT SIDE - ALL INPUTS */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>Description</Label>
            <Textarea
              name="damage.description"
              value={values.damage.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <Label>Other</Label>
            <Input
              name="damage.other"
              value={values.damage.other}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Input
              name="damage.status"
              value={values.damage.status}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        {/* LEFT SIDE - ALL SWITCHES */}
        <div className="flex flex-col gap-4">
          {/* Rear Impact Crash */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.rear_impact_crash")}
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Switch
              checked={values.damage.rear_impact_crash}
              onCheckedChange={(checked) =>
                setFieldValue("damage.rear_impact_crash", checked)
              }
            />
            <Label>Rear Impact Crash</Label>
          </div>

          {/* Lane Change */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.lane_change")}
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Switch
              checked={values.damage.lane_change}
              onCheckedChange={(checked) =>
                setFieldValue("damage.lane_change", checked)
              }
            />
            <Label>Lane Change</Label>
          </div>

          {/* Right of Way Violation */}
          <div
            tabIndex={0}
            onKeyDown={(e) =>
              handleArrowKeys(e, "damage.right_of_way_violation")
            }
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Switch
              checked={values.damage.right_of_way_violation}
              onCheckedChange={(checked) =>
                setFieldValue("damage.right_of_way_violation", checked)
              }
            />
            <Label>Right of Way Violation</Label>
          </div>

          {/* Parking Lot */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.parking_lot")}
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Switch
              checked={values.damage.parking_lot}
              onCheckedChange={(checked) =>
                setFieldValue("damage.parking_lot", checked)
              }
            />
            <Label>Parking Lot</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
