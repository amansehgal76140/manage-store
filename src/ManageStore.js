import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { PrimaryMainTheme } from "./PrimaryMainTheme";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import StaffDetails from "./components/StaffDetails";
import SideBar from "./components/SideBar";
import axios from "axios";
import CustomizedDialogs from "./components/CustomDialogs";
import { baseUrl, storeId } from "./Constant";

const drawerWidth = 180;

export default function ManageStore() {
  const [staffData, setStaffData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currStaff, setCurrStaff] = useState({
    mobile: "",
    name: "",
    staffId: "",
    role: "",
  });

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = () => {
    console.log(staffData);
    axios
      .get(baseUrl + "/api/v2/staffAccess/get/" + storeId)
      .then((res) => {
        console.log(res.data.salesManager);
        const temp = res.data.salesManagerModels.map((storeManager) => {
          return {
            staffId: storeManager.staffModel.staffId,
            name: storeManager.staffModel.name,
            mobile: storeManager.staffModel.mobile,
            role: "SALES_MANAGER",
          };
        });
        const temp1 = res.data.storeManagerModels.map((storeManager) => {
          return {
            staffId: storeManager.staffModel.staffId,
            name: storeManager.staffModel.name,
            mobile: storeManager.staffModel.mobile,
            role: "STORE_MANAGER",
          };
        });
        const temp2 = res.data.salesPurchaseManagerModels.map(
          (storeManager) => {
            return {
              staffId: storeManager.staffModel.staffId,
              name: storeManager.staffModel.name,
              mobile: storeManager.staffModel.mobile,
              role: "SALES_PURCHASE_MANAGER",
            };
          }
        );
        var staffDetails = temp.concat(temp1, temp2);
        console.log(staffDetails);
        setStaffData(staffDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDialog = () => {
    setCurrStaff({
      staffId: "",
      name: "",
      mobile: "",
      store: "Store 1",
      role: "Select Role",
      code: "",
      type: "Add",
    });
    setOpen(true);
  };

  const editStaff = (staffData) => {
    const length = staffData.mobile.length;
    const temp = {
      ...staffData,
      type: "Edit",
      mobile: staffData.mobile.substring(3, length),
      code: staffData.mobile.substring(0, 3),
    };
    console.log(temp);
    setCurrStaff(temp);
    setOpen(true);
  };

  if (staffData.length === 0) return <div>Loading....</div>;

  return (
    <ThemeProvider theme={PrimaryMainTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "white",
            color: "black",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Manage Staff
            </Typography>
            <Button
              variant="contained"
              onClick={openDialog}
              size="medium"
              sx={{ backgroundColor: "primary.main" }}
            >
              Add Staff
            </Button>
          </Toolbar>
        </AppBar>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <CustomizedDialogs
            open={open}
            setOpen={setOpen}
            staffData={staffData}
            setStaffData={setStaffData}
            currStaff={currStaff}
          />
          <StaffDetails
            staffData={staffData}
            setStaffData={setStaffData}
            editStaff={editStaff}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
