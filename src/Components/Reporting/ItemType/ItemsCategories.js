import React, { useState } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import Itemdatadetails from "./Itemdatadetails";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { useAuthDetails } from "../../../Common/cookiesHelper";
const ItemsCategories = () => {

  const [filteredData, setFilteredData] = useState([]);
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 9;
          break;
        case "Online Order":
          orderEnvValue = 5;
          break;
        case "Store Order":
          orderEnvValue = 6;
          break;
        // Add more cases if needed

        default:
          orderEnvValue = 9;
          break;
      }

      const updatedData = {
        ...data,
        merchant_id,
        order_env: orderEnvValue,
        ...userTypeData,
      };
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");

  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;

      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);
        setOrderSourceDropdownVisible(false);
        break;

      default:
        break;
    }
  };
  const orderSourceList = ["All", "Online Order", "Store Order"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header ml-2">Order Type</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Filter by</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderSource"
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="">
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">Order Type</div>
            </div>
            <div className="q_details_header ml-8">Filter by</div>
          </div>
          <div className="q-order-page-container ml-8">
            <div className="q-order-page-filter">
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("orderSource")}
                >
                  <span className="selected-option mt-1">
                    {selectedOrderSource}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {orderSourceDropdownVisible && (
                  <div className="dropdown-content ">
                    <div
                      onClick={() => handleOptionClick("All", "orderSource")}
                    >
                      All
                    </div>
                    <div
                      onClick={() =>
                        handleOptionClick("Online Order", "orderSource")
                      }
                    >
                      Online Order
                    </div>
                    <div
                      onClick={() =>
                        handleOptionClick("Store Order", "orderSource")
                      }
                    >
                      Store Order
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="q-order-page-filter"></div>
            <div className="q-order-page-filter"></div>
          </div>
        </div>
      </div> */}

      <style>
        {`
            .dailytotoalReport .q_dateRange_header{
              margin-top: 0rem ;
            }
          `}
      </style>

      <div className="mt-10">
        <div className="dailytotoalReport">
          <div className="box">
            <DateRangeComponent onDateRangeChange={handleDataFiltered} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="box">
          <Itemdatadetails data={filteredData} />
        </div>
      </div>
    </>
  );
};

export default ItemsCategories;
