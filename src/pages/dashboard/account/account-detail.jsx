import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { FiActivity } from "react-icons/fi";
import { TbAlertSmall } from "react-icons/tb";
import { useGetAccountQuery } from "@/services/admin-api/accountsApi";
import { useTranslation } from "react-i18next";

export default function AccountDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetAccountQuery(id);
  const { t } = useTranslation();

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/dashboard/accounts">
              {t("account_detail.breadcrumbs.accounts")}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/accounts/${id}`}>
              {t("account_detail.breadcrumbs.account")}
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Account Detail */}
      <div className="grid grid-cols-12 my-5  gap-4">
        <div className="md:col-span-6 col-span-12">
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <UserIcon />
                  </div>
                  <span className="font-semibold text-lg">
                    {t("account_detail.account_information.title")}
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold ">
                        {t("account_detail.account_information.id")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?._id
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold ">
                        {t("account_detail.account_information.firstname")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.first_name
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold ">
                        {t("account_detail.account_information.lastname")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.last_name
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold ">
                        {t("account_detail.account_information.address")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 w-" />
                        ) : (
                          data?.address
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold ">
                        {t("account_detail.account_information.phone")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.phone
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold ">
                        {" "}
                        {t("account_detail.account_information.username")}
                      </TableCell>
                      <TableCell className="font-normal">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.username
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-6 col-span-12 2 flex flex-col gap-4">
          <div className="col-span-3">
            <Card className="w-full rounded-3xl">
              <CardContent>
                <ul className="py-4">
                  <li className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                      <TbAlertSmall size={20} />
                    </div>
                    <span className="font-semibold text-lg">
                      {t("account_detail.alerts_information.title")}
                    </span>
                  </li>
                </ul>
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold ">
                          {t(
                            "account_detail.alerts_information.enable_email_alerts"
                          )}
                        </TableCell>
                        <TableCell className="font-normal">
                          {isLoading ? (
                            <Skeleton className="h-2 min-w-[100px]" />
                          ) : data?.enable_email_alerts ? (
                            "Yes"
                          ) : (
                            "No"
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold ">
                          {t(
                            "account_detail.alerts_information.enable_sms_alerts"
                          )}
                        </TableCell>
                        <TableCell className="font-normal">
                          {isLoading ? (
                            <Skeleton className="h-2 min-w-[100px]" />
                          ) : data?.enable_sms_alerts ? (
                            "Yes"
                          ) : (
                            "No"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>{" "}
          <div className="col-span-3">
            <Card className="w-full rounded-3xl">
              <CardContent>
                <ul className="py-4">
                  <li className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                      <FiActivity />
                    </div>
                    <span className="font-semibold text-lg">
                      {t("account_detail.role_status_information.title")}
                    </span>
                  </li>
                </ul>
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold ">
                          {" "}
                          {t("account_detail.role_status_information.admin")}
                        </TableCell>
                        <TableCell className="font-normal">
                          {isLoading ? (
                            <Skeleton className="h-2 min-w-[100px]" />
                          ) : data?.is_admin ? (
                            "Yes"
                          ) : (
                            "No"
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold ">
                          {t("account_detail.role_status_information.active")}
                        </TableCell>
                        <TableCell className="font-normal">
                          {isLoading ? (
                            <Skeleton className="h-2 min-w-[100px]" />
                          ) : data?.is_active ? (
                            "Yes"
                          ) : (
                            "No"
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold ">
                          {t(
                            "account_detail.role_status_information.login_attempt"
                          )}
                        </TableCell>
                        <TableCell className="font-normal">
                          {isLoading ? (
                            <Skeleton className="h-2 min-w-[100px]" />
                          ) : data?.login_attempts ? (
                            "Yes"
                          ) : (
                            "No"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
