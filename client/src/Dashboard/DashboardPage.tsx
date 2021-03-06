import { useState } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

const theme = createTheme();

import Grid from "@mui/material/Grid";

import NavPanel from "../NavPanel/NavPanel";
import DashboardContent from "./DashboardContent";
import WidgetPanel from "../WidgetPanel/WidgetPanel";
import { Redirect } from "react-router";
import { useUserContext } from "../Contexts/UserContext";

const useStyles = makeStyles((_theme) => ({
  container: {
    height: "100%", // So that grids 1 & 4 go all the way down
    minHeight: 150, // Give minimum height to a div
    border: "1px solid black",
    fontSize: 30,
    textAlign: "center",
  },
  containerTall: {
    minHeight: 250, // This div has higher minimum height
  },
}));

export default function Dashboard() {
  const [classes, _setClasses] = useState(useStyles());
  const { user, userFetched } = useUserContext();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {userFetched && user === null && <Redirect to="/login" />}
        <Grid container direction="row" spacing={1}>
          <NavPanel classes={classes} />
          <DashboardContent classes={classes} />
          <WidgetPanel classes={classes} />
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
