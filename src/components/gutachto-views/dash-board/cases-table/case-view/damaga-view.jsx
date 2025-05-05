import React from "react";
import damage from "../../../../../../public/assets/svg/damage-svgrepo-com.svg";
import { useGetCaseByIdQuery } from "@/services/admin-api";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell } from "@/components/ui/table";
import TableRow from "../../account-table/table-row";
import { Skeleton } from "@/components/ui/skeleton";

export default function DamageView() {
  const { id } = useParams();
  console.log("id", id);

  const { data, isLoading } = useGetCaseByIdQuery(id);
  console.log("data", data);
  console.log("isLoading", isLoading);

  return (
    <>
    </>
    // <Card className="w-full rounded-3xl">
    //   <CardContent>
    //     <ul className="py-4">
    //       <li className="flex items-center gap-2">
    //         <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-300">
    //           <img src={damage} alt="damage" />
    //         </div>
    //         <span className="font-semibold text-lg">Damage Information</span>
    //       </li>
    //     </ul>
    //     <div>
    //       <Table>
    //         <TableBody>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Rear Impact Crash
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.rear_impact_crash ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Lane Change
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.lane_change ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Right Of Way Violation
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.right_of_way_violation ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Parking lot
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.parking_lot ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               other
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : (
    //                 data?.damage?.other
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               description
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : (
    //                 data?.damage?.description
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Diagonal View
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.diagonal_view ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               View of damage
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.view_of_damage ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Prior damage
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.prior_damage ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Tires
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.tires ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell className="font-normal text-gray-400">
    //               Status
    //             </TableCell>
    //             <TableCell className="font-semibold">
    //               {isLoading ? (
    //                 <Skeleton className="h-2 min-w-[100px]" />
    //               ) : data?.damage?.status ? (
    //                 "Yes"
    //               ) : (
    //                 "No"
    //               )}
    //             </TableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
