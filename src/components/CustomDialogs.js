import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import {
  storeAdminPermissions,
  salePurchaseOperatorPermissions,
  salesOpertaorPermissions,
  baseUrl,
  storeId,
  businessId,
} from "../Constant";
import LoadingButton from "@mui/lab/LoadingButton";
import DisplayPermissions from "./DisplayPermissions";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const roles = [
  {
    value: "STORE_MANAGER",
    label: "STORE_MANAGER",
  },
  {
    value: "SALES_PURCHASE_MANAGER",
    label: "SALES_PURCHASE_MANAGER",
  },
  {
    value: "SALES_MANAGER",
    label: "SALES_MANAGER",
  },
  {
    value: "Select Role",
    label: "Select Role",
  },
];

const stores = [
  {
    label: "Store 1",
    value: "Store 1",
  },
];

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1, ml: 3 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  open,
  setOpen,
  staffData,
  setStaffData,
  currStaff,
}) {
  const [staffDetails, setStaffDetails] = useState(currStaff);
  const [save, setSave] = useState(false);

  useEffect(() => {
    setStaffDetails(currStaff);
  }, [currStaff]);

  const onEdit = async () => {
    console.log("Edit");
    setSave(true);
    const { name, mobile, role, code, staffId } = staffDetails;
    const temp = await axios.post(baseUrl + "/api/v1/staff/update", {
      businessId,
      name,
      phone: code + mobile,
      staffId,
    });
    if (temp.data) {
      const data1 = await axios.post(baseUrl + "/api/v1/staffAccess/add", {
        access_type: role,
        staffId: temp.data.staffId,
        storeId,
      });
      if (data1) {
        const tempData = [...staffData];
        const updatedStaffData = tempData.map((staff) => {
          if (staff.staffId === staffId)
            return { name, mobile: code + mobile, staffId, role };
          else return staff;
        });
        console.log(updatedStaffData);
        setOpen(false);
        setStaffData(updatedStaffData);
        setSave(false);
      }
    }
  };

  const onSave = async () => {
    const { name, mobile, role, code } = staffDetails;
    if (
      name.length === 0 ||
      mobile.length === 0 ||
      code.length < 3 ||
      role === "Select Role"
    )
      return;
    setSave(true);
    const staffId = "12";
    const temp = await axios.post(baseUrl + "/api/v1/staff/add", {
      businessId,
      name,
      phone: code + mobile,
      staffId,
    });
    if (temp.data) {
      console.log(temp.data);
      const data1 = await axios.post(baseUrl + "/api/v1/staffAccess/add", {
        access_type: role,
        staffId: temp.data.staffId,
        storeId,
      });
      if (data1) {
        const tempData = [...staffData];
        tempData.push({ name, mobile: code + mobile, staffId, role });
        console.log(tempData);
        setOpen(false);
        setStaffData(tempData);
        setSave(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = { ...staffDetails };
    temp[name] = value;
    console.log(temp);
    setStaffDetails(temp);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!staffDetails.name && open && staffDetails.type === "Edit") {
    return <div>Loading....</div>;
  }

  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        PaperProps={{
          sx: { width: "65%", height: "100%", backgroundColor: "primary.body" },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {staffDetails.type + " Staff"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box pl={2} width={"100%"}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" sx={{ width: "90%" }}>
                  <FormHelperText
                    id="outlined-weight-helper-text"
                    sx={{
                      ml: 0,
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "black",
                    }}
                  >
                    Staff Name*
                  </FormHelperText>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    fullWidth
                    name="name"
                    value={staffDetails.name}
                    onChange={(e) => handleChange(e)}
                    required
                    sx={{ backgroundColor: "white" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "15%", mr: "2%" }} variant="outlined">
                  <FormHelperText
                    id="outlined-code-helper-text"
                    sx={{
                      ml: 0,
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "black",
                    }}
                  >
                    Code*
                  </FormHelperText>
                  <OutlinedInput
                    id="outlined-adornment-code"
                    aria-describedby="outlined-code-helper-text"
                    inputProps={{
                      "aria-label": "code",
                    }}
                    name="code"
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                    value={staffDetails.code}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </FormControl>
                <FormControl sx={{ width: "76%" }} variant="outlined">
                  <FormHelperText
                    id="outlined-mobile-helper-text"
                    sx={{
                      ml: 0,
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "black",
                    }}
                  >
                    Mobile Number*
                  </FormHelperText>
                  <OutlinedInput
                    id="outlined-adornment-mobile"
                    aria-describedby="outlined-mobile-helper-text"
                    inputProps={{
                      "aria-label": "mobile",
                    }}
                    sx={{ backgroundColor: "white" }}
                    required
                    fullWidth
                    value={staffDetails.mobile}
                    onChange={(e) => handleChange(e)}
                    name="mobile"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={6}>
                <FormControl sx={{ width: "90%" }}>
                  <FormHelperText
                    sx={{
                      ml: 0,
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "black",
                    }}
                  >
                    Select Store*
                  </FormHelperText>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    defaultValue="Store 1"
                    sx={{ backgroundColor: "white" }}
                  >
                    {stores.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "93%" }}>
                  <FormHelperText
                    sx={{
                      ml: 0,
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "black",
                    }}
                  >
                    Select Role*
                  </FormHelperText>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    required
                    name="role"
                    defaultValue={currStaff.role}
                    sx={{ backgroundColor: "white" }}
                    onChange={(e) => handleChange(e)}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
            {staffDetails.role !== "Select Role" ? (
              <Box mt={5}>
                <Paper elevation={0} sx={{ padding: 2, width: "97%" }}>
                  <Typography variant="h6">{staffDetails.role}</Typography>
                  {staffDetails.role === "STORE_MANAGER" ? (
                    <DisplayPermissions data={storeAdminPermissions} />
                  ) : (
                    ""
                  )}
                  {staffDetails.role === "SALES_PURCHASE_MANAGER" ? (
                    <DisplayPermissions
                      data={salePurchaseOperatorPermissions}
                    />
                  ) : (
                    ""
                  )}
                  {staffDetails.role === "SALES_MANAGER" ? (
                    <DisplayPermissions data={salesOpertaorPermissions} />
                  ) : (
                    ""
                  )}
                </Paper>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {save ? (
            <LoadingButton loading loadingPosition="end" variant="contained">
              Saving
            </LoadingButton>
          ) : (
            <Button
              autoFocus
              variant="contained"
              onClick={staffDetails.type === "Edit" ? onEdit : onSave}
            >
              Save Changes
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
