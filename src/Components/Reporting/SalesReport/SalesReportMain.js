import React, { useState } from "react";
import SalesReportList from "./SalesReportList";
import Grid from "@mui/system/Unstable_Grid/Grid";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const SalesReportMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const onDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <Grid container sx={{ paddingY: 3.7 }}>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
    
        <div className="q-attributes-main-page">
          <SalesReportList
            selectedDateRange={selectedDateRange}
            // VendorIdData={VendorIdData}
          />
        </div>
   
    </>
  );
};

export default SalesReportMain;
