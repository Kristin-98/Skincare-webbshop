"use client";

import { MenuRounded } from "@mui/icons-material";
import { Theme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import * as React from "react";
import theme from "../theme/theme";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Admin"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} href="/admin">
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  if (isLargeScreen) {
    return (
      <>
        <Link
          href="/admin"
          style={{
            textDecoration: "none",
            color: theme.palette.primary.main,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Admin
        </Link>
        <Link
          href="/customer-order-history"
          style={{
            textDecoration: "none",
            color: theme.palette.primary.main,
            fontWeight: "bold",            
          }}
        >
          Customer order
        </Link>
      </>
    );
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuRounded sx={{ fontSize: 40 }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
