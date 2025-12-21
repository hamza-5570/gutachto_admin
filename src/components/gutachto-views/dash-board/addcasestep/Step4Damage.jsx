import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { getIn, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            className="flex flex-col gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Label>{t("regiser_case.step4Damage.rear_impact")}</Label>
            <div className="mt-1 w-full">
              <Select
                value={values.damage.rear_impact_crash}
                onValueChange={(value) =>
                  setFieldValue("damage.rear_impact_crash", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t(
                      "regiser_case.step4Damage.placeholders.rear_impact"
                    )}
                  />
                </SelectTrigger>

                <SelectContent className="min-w-full">
                  {[
                    { label: t("common.yes"), value: "yes" },
                    { label: t("common.no"), value: "no" },
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lane Change */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.lane_change")}
            className="flex flex-col gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <div>
              <Label>{t("regiser_case.step4Damage.lane_change")}</Label>

              <div className="mt-1 w-full">
                <Select
                  value={values.damage.lane_change}
                  onValueChange={(value) =>
                    setFieldValue("damage.lane_change", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t(
                        "regiser_case.step4Damage.placeholders.lane_change"
                      )}
                    />
                  </SelectTrigger>

                  <SelectContent className="min-w-full">
                    {[
                      { label: t("common.yes"), value: "yes" },
                      { label: t("common.no"), value: "no" },
                    ].map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right of Way Violation */}
          <div
            tabIndex={0}
            onKeyDown={(e) =>
              handleArrowKeys(e, "damage.right_of_way_violation")
            }
            className="flex flex-col gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Label>{t("regiser_case.step4Damage.right_of_way")}</Label>

            <div className="mt-1 w-full">
              <Select
                value={values.damage.right_of_way_violation}
                onValueChange={(value) =>
                  setFieldValue("damage.right_of_way_violation", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t(
                      "regiser_case.step4Damage.placeholders.right_of_way"
                    )}
                  />
                </SelectTrigger>

                <SelectContent className="min-w-full">
                  {[
                    { label: t("common.yes"), value: "yes" },
                    { label: t("common.no"), value: "no" },
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Parking Lot */}
          <div
            tabIndex={0}
            onKeyDown={(e) => handleArrowKeys(e, "damage.parking_lot")}
            className="flex flex-col gap-2 outline-none focus:ring-2 focus:ring-primary rounded p-2"
          >
            <Label>{t("regiser_case.step4Damage.parking_lot")}</Label>

            <div className="mt-1 w-full">
              <Select
                value={values.damage.parking_lot}
                onValueChange={(value) =>
                  setFieldValue("damage.parking_lot", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t(
                      "regiser_case.step4Damage.placeholders.parking_lot"
                    )}
                  />
                </SelectTrigger>

                <SelectContent className="min-w-full">
                  {[
                    { label: t("common.yes"), value: "yes" },
                    { label: t("common.no"), value: "no" },
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
