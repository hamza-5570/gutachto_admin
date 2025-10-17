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

export default function AccountDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetAccountQuery(id);

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/dashboard/accounts">Accounts</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/accounts/${id}`}>Account</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Account Detail */}
      <div className="grid grid-cols-12 my-5  gap-4">
        <div className="col-span-6">
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <UserIcon />
                  </div>
                  <span className="font-semibold text-lg">
                    Account Information
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Id
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?._id
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        First Name
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.first_name
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Last Name
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.last_name
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Address
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 w-" />
                        ) : (
                          data?.address
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Phone
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.phone
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Username
                      </TableCell>
                      <TableCell className="font-semibold">
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
        <div className="col-span-6 2 flex flex-col gap-2">
          <div className="col-span-3">
            <Card className="w-full rounded-3xl">
              <CardContent>
                <ul className="py-4">
                  <li className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                      <TbAlertSmall size={20} />
                    </div>
                    <span className="font-semibold text-lg">
                      Alerts Information
                    </span>
                  </li>
                </ul>
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-normal text-gray-400">
                          Enable Email Alerts
                        </TableCell>
                        <TableCell className="font-semibold">
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
                        <TableCell className="font-normal text-gray-400">
                          Enable Sms Alerts
                        </TableCell>
                        <TableCell className="font-semibold">
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
                      Role & Status Information
                    </span>
                  </li>
                </ul>
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-normal text-gray-400">
                          Admin
                        </TableCell>
                        <TableCell className="font-semibold">
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
                        <TableCell className="font-normal text-gray-400">
                          Active
                        </TableCell>
                        <TableCell className="font-semibold">
                          {isLoading ? (
                            <Skeleton className="h-2 min-w-[100px]" />
                          ) : data?.is_active ? (
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
