import React from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Mypaginations from "@/components/my-paginations";
import Loader from "@/common/loader";

export default function CasesTable({ cases, onIsLoading, refetch }) {
  // const [currentPage] = useState(1);
  // const { pages, items } = accounts || {};
  // const location=useLocation()
  // const navigate=useNavigate()
  // const [searchParams,setSearchParams]=useSearchParams( )
  // const onPageChange = (newPage) => {
  //   setCurrentPage(newPage);
  //   navigate(location.pathname);
  //   setSearchParams({ ...searchParams, page: newPage });
  //   setFilters({...filters,page:newPage})

  // };
  return (
    <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
      <div className="max-w-[300px] xl:max-w-full">
        <TableHeader />
        {onIsLoading ? (
          <Loader />
        ) : cases?.length > 0 ? (
          cases?.map((item, index) => {
            return <TableRow key={index} item={item} refetch={refetch} />;
          })
        ) : (
          <div className="flex flex-col items-center py-4">
            <p className="text-md text-[#121417] font-medium">No Accounts</p>
          </div>
        )}
        {/* <div className="flex justify-center my-4 ">
          <Mypaginations
            count={pages}
            page={currentPage}
            onChange={onPageChange}
          />
        </div> */}
      </div>
    </div>
  );
}
