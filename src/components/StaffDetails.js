import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { baseUrl } from "../Constant";
import axios from "axios";

function StaffDetails({ staffData, setStaffData, editStaff }) {
  const [actionId, setActionId] = useState(-1);

  const handleRow = (id) => {
    setActionId(id);
  };

  const deleteStaff = (staffId) => {
    axios
      .delete(baseUrl + "/api/v1/staff/delete/" + staffId)
      .then((res) => {
        console.log(res);
        const tempDetails = staffData.filter(
          (staff) => staff.staffId !== staffId
        );
        setStaffData(tempDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Chip
          label="Store 1"
          variant="contained"
          sx={{ backgroundColor: "primary.main", color: "white" }}
        />
      </Stack>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "primary.secondary" }}>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Mobile Number</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staffDetails) => {
              const visibility =
                actionId === staffDetails.staffId ? "display" : "hidden";
              return (
                <TableRow
                  key={staffDetails.staffId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onMouseEnter={() => handleRow(staffDetails.staffId)}
                  onMouseLeave={() => handleRow(-1)}
                >
                  <TableCell align="left">{staffDetails.name}</TableCell>
                  <TableCell align="left">{staffDetails.mobile}</TableCell>
                  <TableCell align="left">{staffDetails.role}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ visibility }}>
                      <Button
                        variant="outlined"
                        onClick={() => editStaff(staffDetails)}
                        size="small"
                        sx={{ mr: 1, borderColor: "black", color: "black" }}
                      >
                        Edit Staff
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => deleteStaff(staffDetails.staffId)}
                        size="small"
                        sx={{
                          mr: 1,
                          borderColor: "primary.error",
                          color: "primary.error",
                        }}
                      >
                        Delete Staff
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StaffDetails;
