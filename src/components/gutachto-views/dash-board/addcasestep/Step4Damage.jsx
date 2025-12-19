import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <div>
      {/* 2 Columns: Left = Switches, Right = Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RIGHT SIDE - ALL INPUTS */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label> {t("regiser_case.step4Damage.description")}</Label>
            <Textarea
              name="damage.description"
              value={values.damage.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2"
              placeholder={t(
                "regiser_case.step4Damage.placeholders.description"
              )}
            />
          </div>

          <div>
            <Label>{t("regiser_case.step4Damage.other")}</Label>
            <Input
              name="damage.other"
              value={values.damage.other}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2"
              placeholder={t("regiser_case.step4Damage.placeholders.other")}
            />
          </div>

          <div>
            <Label>{t("regiser_case.step4Damage.status")}</Label>
            <Input
              name="damage.status"
              value={values.damage.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2"
              placeholder={t("regiser_case.step4Damage.placeholders.status")}
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
            <Label>{t("regiser_case.step4Damage.rear_impact")}</Label>

            <Switch
              checked={values.damage.rear_impact_crash}
              onCheckedChange={(checked) =>
                setFieldValue("damage.rear_impact_crash", checked)
              }
            />
          </div>

          {/* Lane Change */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.lane_change")}
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Label>{t("regiser_case.step4Damage.lane_change")}</Label>

            <Switch
              checked={values.damage.lane_change}
              onCheckedChange={(checked) =>
                setFieldValue("damage.lane_change", checked)
              }
            />
          </div>

          {/* Right of Way Violation */}
          <div
            tabIndex={0}
            onKeyDown={(e) =>
              handleArrowKeys(e, "damage.right_of_way_violation")
            }
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Label>{t("regiser_case.step4Damage.right_of_way")}</Label>

            <Switch
              checked={values.damage.right_of_way_violation}
              onCheckedChange={(checked) =>
                setFieldValue("damage.right_of_way_violation", checked)
              }
            />
          </div>

          {/* Parking Lot */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.parking_lot")}
            className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Label>{t("regiser_case.step4Damage.parking_lot")}</Label>

            <Switch
              checked={values.damage.parking_lot}
              onCheckedChange={(checked) =>
                setFieldValue("damage.parking_lot", checked)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
