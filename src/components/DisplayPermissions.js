import { Typography } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

function DisplayPermissions({ data }) {
  return (
    <Box mt={2}>
      {data.map((data, index) => (
        <Typography key={index} variant="body2" sx={{ mt: 0.5 }}>
          - {data}
        </Typography>
      ))}
    </Box>
  );
}

export default DisplayPermissions;
