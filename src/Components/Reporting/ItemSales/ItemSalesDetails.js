import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemSalesData } from "../../../Redux/features/Reports/ItemSales/ItemSalesSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const ItemSalesDetails = (props) => {
  const dispatch = useDispatch();
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [allItemSalesData, setallItemSalesData] = useState("");
  const AllItemSalesDataState = useSelector(
    (state) => state.ItemSalesReportList
  );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id,
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        order_typ: props.OrderTypeData,
        order_env: props.OrderSourceData,
        cat_name: props.SelectCatData,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchItemSalesData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (
      !AllItemSalesDataState.loading &&
      AllItemSalesDataState.ItemSalesData &&
      AllItemSalesDataState.ItemSalesData[0]
    ) {
      // console.log(AllItemSalesDataState.ItemSalesData[0])
      setallItemSalesData(AllItemSalesDataState.ItemSalesData[0]);
    } else {
      setallItemSalesData("");
    }
  }, [
    AllItemSalesDataState,
    AllItemSalesDataState.loading,
    AllItemSalesDataState.ItemSalesData,
  ]);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <div className="q-attributes-bottom-header">
            <span>Item Sales Report</span>
          </div>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
                  # Sold
                </StyledTableCell>
                <StyledTableCell>Gross Sales</StyledTableCell>
                <StyledTableCell>Price Override</StyledTableCell>
                <StyledTableCell>Discounts</StyledTableCell>
                <StyledTableCell>Default Tax</StyledTableCell>
                <StyledTableCell>Other Tax</StyledTableCell>
                <StyledTableCell>Refunded</StyledTableCell>
                <StyledTableCell>Net Sales</StyledTableCell>
              </TableHead>
              <TableBody>
                {allItemSalesData &&
                  allItemSalesData.length >= 1 &&
                  allItemSalesData.map((ItemData, index) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <p>{ItemData.categoryss}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.name}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.total_qty}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.total_price}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.adjust_price}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.discount_amt}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.saletx}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.othertx}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.refund_amount}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>{ItemData.discount_price}</p>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}

                {!allItemSalesData.length >= 1 && (
                  <div className="box">
                    <div className="q-category-bottom-categories-single-category">
                      <p>No data found</p>
                    </div>
                  </div>
                )}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>
      </Grid>
      {/* <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Item Sales Report</span>
          </div>
          <div className="q-attributes-bottom-attriButes-header item_sale_header_div">
            <p className="q-employee-item">Category</p>
            <p className="q-employee-in"> Name </p>
            <p className="q-employee-in"># Sold</p>
            <p className="q-employee-in">Gross Sales</p>
            <p className="q-employee-in">Price Override</p>

            <p className="q-employee-out">Discounts</p>
            <p className="q-employee-worked">Default Tax</p>
            <p className="q-catereport-break">Other Tax</p>
            <p className="q-catereport-break">Refunded</p>
            <p className="q-catereport-break"> Net Sales</p>
          </div>
        </div>

        {allItemSalesData &&
          allItemSalesData.length >= 1 &&
          allItemSalesData.map((ItemData, index) => (
            <div key={index} className="q-attributes-bottom-attriButes-listing">
              <div className="q-employee-bottom-attriButes-single-attributes item_sale_div">
                <p className="q-employee-item">{ItemData.categoryss}</p>
                <p className="q-employee-in">{ItemData.name}</p>
                <p className="q-employee-in">{ItemData.total_qty}</p>
                <p className="q-employee-in">{ItemData.total_price}</p>
                <p className="q-employee-in">{ItemData.adjust_price}</p>

                <p className="q-employee-out">{ItemData.discount_amt}</p>
                <p className="q-employee-worked">{ItemData.saletx}</p>
                <p className="q-catereport-break">{ItemData.othertx}</p>
                <p className="q-catereport-break">{ItemData.refund_amount}</p>
                <p className="q-catereport-break">{ItemData.discount_price}</p>
              </div>
            </div>
          ))}
      </div> */}
    </>
  );
};

export default ItemSalesDetails;
