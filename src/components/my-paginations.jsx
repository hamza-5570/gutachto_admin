import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
const Mypaginations = ({ count, page, onChange }) => {
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    if (page === 1) {
      setCurrentPage(1);
    }
  }, [page]);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Pagination
       defaultPage={6}
       siblingCount={0}
        size={"medium"}
        color="primary"
        boundaryCount={1} 
        variant="outlined"
        shape="rounded"
        count={count}
        page={currentPage}
        onChange={(event, value) => {
          setCurrentPage(value);
          onChange(value);
        }}
     
      />
    </Stack>
  );
};

export default Mypaginations;
