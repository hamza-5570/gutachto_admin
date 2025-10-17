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
import { useGetCaseByIdQuery } from "@/services/admin-api";
import { UserIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { TbAlertSmall, TbReportSearch } from "react-icons/tb";
import { FaCarCrash } from "react-icons/fa";
import damage from "../../../../public/assets/svg/damage-svgrepo-com.svg";
import { PiInvoiceDuotone } from "react-icons/pi";
import { SiStatuspage } from "react-icons/si";

export default function CaseDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetCaseByIdQuery(id);
  //  const [photoIndex, setPhotoIndex] = useState({
  //     photoIndex: 0,
  //     isOpen: false,
  //   });

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/dashboard/all-case">Cases</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/all-case/${id}`}>Case</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Account Detail */}
      <div className="grid grid-cols-12 my-5  gap-4">
        <div className="col-span-6 flex flex-col gap-4">
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <FaCarCrash />
                  </div>
                  <span className="font-semibold text-lg">
                    Accident Information
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
                          data?.accident?.id
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Car Repair Shop
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.car_repair_shop
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        account_id
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.account_id
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Date
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.date
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Location
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.location
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Vehicle Images
                      </TableCell>
                      <TableCell className="font-semibold flex items-center overflow-x-auto">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.vehicle_images.map((image) => {
                            return (
                              <img
                                src={image.image_url}
                                alt="image"
                                className="w-10  h-10 rounded-lg"
                              />
                            );
                          })
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Vehicle Id
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.vehicle_id
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Vehicle opponent license plate
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.accident?.vehicle_opponent_license_plate
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <TbReportSearch />
                  </div>
                  <span className="font-semibold text-lg">
                    Report Information
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Dismantling fee
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.dismantling_fee
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Person in charge
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.person_in_charge
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Internal Inspector
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.internal_inspector
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Total car damage
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.total_car_damage_sum
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Inspector fee
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.inspector_fee
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Lawyer fee
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.report?.lawyer_fee
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Police file
                      </TableCell>
                      <TableCell className="font-semibold">
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
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <PiInvoiceDuotone />
                  </div>
                  <span className="font-semibold text-lg">
                    Invoice Information
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Total Invoiced Amount
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.invoice?.total_invoiced_amount
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Open Amount
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.invoice?.open_sum
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Paid Amount
                      </TableCell>
                      <TableCell className="font-semibold">
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
                    Status Information
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        status
                      </TableCell>
                      <TableCell className="font-semibold">
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
          {/* Damage View */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <img src={damage} alt="damage" />
                  </div>
                  <span className="font-semibold text-lg">
                    Damage Information
                  </span>
                </li>
              </ul>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Rear Impact Crash
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.rear_impact_crash ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Lane Change
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.lane_change ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Right Of Way Violation
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.right_of_way_violation ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Parking lot
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.parking_lot ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        other
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.damage?.other
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        description
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : (
                          data?.damage?.description
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Diagonal View
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.diagonal_view ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        View of damage
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.view_of_damage ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Prior damage
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.prior_damage ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Tires
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.tires ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-normal text-gray-400">
                        Status
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isLoading ? (
                          <Skeleton className="h-2 min-w-[100px]" />
                        ) : data?.damage?.status ? (
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

          {/* Witness */}
          <Card className="w-full rounded-3xl">
            <CardContent>
              <ul className="py-4">
                <li className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
                    <PiInvoiceDuotone />
                  </div>
                  <span className="font-semibold text-lg">
                    Witness Information
                  </span>
                </li>
              </ul>
              <div>
                <Table className="w-full">
                  <div className="w-full flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
                    <div className="w-fit text-sm text-[#121417] font-medium">
                      Id
                    </div>

                    <div className="w-fit text-sm text-[#121417] font-medium">
                      Address
                    </div>
                  </div>
                  <TableBody>
                    {data?.witness?.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-normal text-gray-400">
                            {item.id}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {item.address}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
