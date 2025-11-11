import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCaseByIdQuery } from "@/services/admin-api";
import { Mail, UserIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { TbAlertSmall, TbReportSearch } from "react-icons/tb";
import { FaCarCrash } from "react-icons/fa";
import damage from "../../../../public/assets/svg/damage-svgrepo-com.svg";
import { PiEnvelope, PiInvoiceDuotone } from "react-icons/pi";
import { SiStatuspage } from "react-icons/si";
import { useTranslation } from "react-i18next";

export default function CaseDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetCaseByIdQuery(id);

  const { t } = useTranslation();

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/dashboard/all-case">{t("case_detail.cases")}</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/all-case/${id}`}>
              {t("case_detail.case")}
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Account Detail */}
      <div className="grid grid-cols-12 my-5 gap-4">
        <div className="col-span-6 flex flex-col gap-4">
          {/* Accident Information */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <FaCarCrash />
                  </div>
                  <span className="font-semibold text-lg">
                    {t("case_detail.accident_information.title")}
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.id")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.id
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.car_repair_shop")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.car_repair_shop
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.account_id")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.account_id
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.date")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.date
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.location")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.location
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.vehicle_images")}
                      </TableCell>
                      <TableCell className="font-normal flex items-center overflow-x-auto">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.vehicle_images?.map((image) => (
                            <img
                              key={image.id}
                              src={image.image_url}
                              alt="image"
                              className="w-10 h-10 rounded-lg"
                            />
                          ))
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.accident_information.vehicle_id")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.vehicle_id
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t(
                          "case_detail.accident_information.vehicle_opponent_license_plate"
                        )}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.vehicle_opponent_license_plate
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t(
                          "case_detail.accident_information.accident_description"
                        )}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.accident_description
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Report Information */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <TbReportSearch />
                  </div>
                  <span className="font-semibold text-lg">
                    {t("case_detail.report_information.title")}
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.dismantling_fee")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.dismantling_fee
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.person_in_charge")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.person_in_charge
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.internal_inspector")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.internal_inspector
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.total_car_damage")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.total_car_damage_sum
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.inspector_fee")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.inspector_fee
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.lawyer_fee")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.lawyer_fee
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.report_information.police_file")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.police_file
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Information */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <PiInvoiceDuotone />
                  </div>
                  <span className="font-semibold text-lg">
                    {t("case_detail.invoice_information.title")}
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        {t(
                          "case_detail.invoice_information.total_invoiced_amount"
                        )}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.invoice?.total_invoiced_amount
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.invoice_information.open_amount")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.invoice?.open_sum
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.invoice_information.paid_amoount")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.invoice?.paid_sum
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          {/* Status */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <SiStatuspage />
                  </div>
                  <span className="font-semibold text-lg">
                    {t("case_detail.status_information.title")}
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.status_information.status")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.status
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Damage Information */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <img src={damage} alt="damage" />
                  </div>
                  <span className="font-semibold text-lg">
                    {t("case_detail.damage_information.title")}
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.rear_impact")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.rear_impact_crash ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.lane_change")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.lane_change ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.right_of_way")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.right_of_way_violation ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.parking_lot")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.parking_lot ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.other")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.damage?.other
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.description")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.damage?.description
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.diagonal_view")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.diagonal_view ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.view_of_damage")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.view_of_damage ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.prior_damage")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.prior_damage ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.tires")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.tires ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold">
                        {t("case_detail.damage_information.status")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.status ? (
                          t("common.yes")
                        ) : (
                          t("common.no")
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Witness */}
          <WitnessInfoCard data={data} />

          {/* Mail */}
          <MailCorrespondence data={data} />

          {/* Note */}
          <Note data={data} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

function WitnessInfoCard({ data }) {
  const { t } = useTranslation();

  return (
    <Card className="w-full rounded-3xl shadow-sm border border-gray-200">
      <CardContent>
        <ul className="py-4">
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-200 text-gray-700">
              <PiInvoiceDuotone className="text-xl" />
            </div>
            <span className="font-semibold text-lg text-gray-900">
              {t("case_detail.witness_information.title")}
            </span>
          </li>
        </ul>

        <div className="overflow-x-auto">
          <Table className="w-full border border-[#DBE0E5] rounded-lg">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[100px] text-sm text-[#121417] font-medium">
                  {t("case_detail.witness_information.id")}
                </TableHead>
                <TableHead className="text-sm text-[#121417] font-medium">
                  {t("case_detail.witness_information.address")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.witness?.length > 0 ? (
                data.witness.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition">
                    <TableCell className="font-semibold text-gray-800">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-normal text-gray-700">
                      {item.address}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-gray-500 py-4"
                  >
                    {t("case_detail.witness_information.no_data")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function MailCorrespondence({ data }) {
  const { t } = useTranslation();

  return (
    <Card className="w-full rounded-3xl shadow-sm border border-gray-200">
      <CardContent>
        <ul className="py-4">
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-200 text-gray-700">
              <PiEnvelope className="text-xl" />
            </div>
            <span className="font-semibold text-lg text-gray-900">
              {t("case_detail.mailCorrespondence.title")}
            </span>
          </li>
        </ul>

        <div className="overflow-x-auto">
          <Table className="w-full border border-[#DBE0E5] rounded-lg">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-sm text-[#121417] font-medium">
                  {t("case_detail.mailCorrespondence.mail")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.mail_correspondence?.length > 0 ? (
                data.mail_correspondence.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition">
                    <TableCell className="font-normal text-gray-700">
                      {item}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={1}
                    className="text-center text-gray-500 py-4"
                  >
                    {t("case_detail.mailCorrespondence.no_data")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function Note({ data, isLoading }) {
  const { t } = useTranslation();

  return (
    <Card className="w-full rounded-3xl shadow-sm border border-gray-200">
      <CardContent>
        <ul className="py-4">
          <li className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-200 text-gray-700">
              <PiEnvelope className="text-xl" />
            </div>
            <span className="font-semibold text-lg text-gray-900">
              {t("case_detail.note.title")}
            </span>
          </li>
        </ul>
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold ">
                  {t("case_detail.note.total_invoiced_amount")}
                </TableCell>
                <TableCell className="font-normal">
                  {isLoading ? (
                    <Skeleton className="h-2 min-w-[100px]" />
                  ) : (
                    data?.invoice?.total_invoiced_amount
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
