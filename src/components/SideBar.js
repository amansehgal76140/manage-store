import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const DisplayList = [
  "Party",
  "All Entries and Bill",
  "Stock",
  "Item",
  "Reports",
  "Manage Staff",
  "Setting",
  "Paid Plan",
  "Help and Support",
];

const drawerWidth = 180;

function SideBar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "black",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {DisplayList.map((text, index) => {
          if (index === 5)
            return (
              <ListItem
                key={text}
                disablePadding
                sx={{ backgroundColor: "primary.main" }}
              >
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SideBar;
