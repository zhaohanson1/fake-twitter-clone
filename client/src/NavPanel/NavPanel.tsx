import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../Contexts/UserContext";

export default function NavPanel(props: any) {
  const { user } = useUserContext();

  function handleLogout(_e: React.MouseEvent) {
    const reqOpts = {
      method: "POST",
    };
    fetch("api/auth/logout", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data.redirectURI) {
          window.location.href = data.redirectURI;
        }
      });
  }
  return (
    <Grid item xs>
      <div className={props.classes.container}>
        <Box sx={{ p: 2, ml: 12 }}>
          <List>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={`OkaygeBusiness ${user}`} />
            </ListItemButton>
            <ListItemButton component="a" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </div>
    </Grid>
  );
}
