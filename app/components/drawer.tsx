"use client";

import { MenuRounded } from "@mui/icons-material";
import { Theme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import * as React from "react";
import { useSession } from "../auth-client";
import theme from "../theme/theme";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  const { data } = useSession();
  const isAdmin = data?.user?.isAdmin === true;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {isAdmin && (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/admin">
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      )}
    </Box>
  );

  if (isLargeScreen) {
    return (
      <>
        {isAdmin && (
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
        )}
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

// "use client";

// import { MenuRounded } from "@mui/icons-material";
// import { Theme, useMediaQuery } from "@mui/material";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Link from "next/link";
// import * as React from "react";
// import { useSession } from "../auth-client";
// import theme from "../theme/theme";

// export default function TemporaryDrawer() {
//   const [open, setOpen] = React.useState(false);
//   const isLargeScreen = useMediaQuery((theme: Theme) =>
//     theme.breakpoints.up("sm")
//   );

//   const { data } = useSession();
//   console.log("Session data:", data);
//   const isAdmin = (data?.user as { isAdmin?: boolean })?.isAdmin === true;

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {isAdmin && (
//           <ListItem disablePadding>
//             <ListItemButton component={Link} href="/admin">
//               <ListItemText primary="Admin" />
//             </ListItemButton>
//           </ListItem>
//         )}
//       </List>
//       <Divider />
//     </Box>
//   );

//   if (isLargeScreen) {
//     return (
//       <>
//         {isAdmin && (
//           <Link
//             href="/admin"
//             style={{
//               textDecoration: "none",
//               color: theme.palette.primary.main,
//               fontWeight: "bold",
//               marginLeft: 10,
//             }}
//           >
//             Admin
//           </Link>
//         )}
//       </>
//     );
//   }

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>
//         <MenuRounded sx={{ fontSize: 40 }} />
//       </Button>
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// }
