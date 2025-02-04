import { Box, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BASE_URL, PRODUCT_LIST_BY_CATEGORY } from "../../Constants/Config";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import { useAuthDetails } from "./../../Common/cookiesHelper";

const ViewItemsModal = ({ selectedView, onViewClick }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemsData, setItemsData] = useState([]);
  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };

  const fetchCategoryProductData = async () => {
    const {token,...otherUserData} = userTypeData
    const data = {
      cat_id: selectedView.id,
      ...userTypeData,
    };
    try {
      const { token, ...dataNew } = data;
      const response = await axios.post(
        BASE_URL + PRODUCT_LIST_BY_CATEGORY,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        setItemsData(response.data.result);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    // console.log(selectedView)
    fetchCategoryProductData();
  }, [selectedView]);

  const handleClick = () => {
    handleOpen(true);
    onViewClick(selectedView);
  };

  return (
    <>
      <div>
        <span
          className="categories-items categories-items-btn viewModal-Btn"
          onClick={handleClick}
        >
          View Items
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="view-category-item-modal" style={myStyles}>
            <div
              className="q-add-categories-section-header text-[18px]"
              style={{
                justifyContent: "space-between",
                fontFamily: "CircularSTDBook",
              }}
            >
              <span>
                <span>{selectedView.title}</span>
              </span>
              <div>
                <div className="flex justify-between gap-4">
                  {/* <select className="custom-selecter cursor-pointer">
                    <option>Recently Added</option>
                    <option> Month</option>
                    <option>Weeks</option>
                  </select> */}

                  <img
                    src={CrossIcon}
                    alt="icon"
                    className="  quic-btn-cancle w-6 h-6"
                    onClick={() => handleClose()}
                  />
                </div>
              </div>
            </div>
            <div className="view-category-item-modal-header viewModal-width">
              {itemsData && itemsData.length >= 1 ? (
                <Table striped>
                  <div className="  p-2 my-2">
                    {itemsData.map((item, index) => (
                      <>
                        <p
                          className="q_view_modal_details"
                          key={index}
                          style={{ fontFamily: "CircularSTDMedium !important" }}
                        >
                          {item.title}
                        </p>
                      </>
                    ))}
                  </div>
                </Table>
              ) : (
                <p className="pl-5">No product data available</p>
              )}
            </div>

            <div className="q-add-categories-section-middles-footer">
              {/* <button
                onClick={() => handleClose()}

                className="quic-btn quic-btn-ok"

               

              >
                Ok{" "}
              </button> */}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ViewItemsModal;
