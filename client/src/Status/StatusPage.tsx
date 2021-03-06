import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

const theme = createTheme();

import Grid from "@mui/material/Grid";
import StatusBox from "./Status";
import NavPanel from "../NavPanel/NavPanel";

import WidgetPanel from "../WidgetPanel/WidgetPanel";

type StatusParams = {
  id: string;
};

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

export default function StatusPage() {
  const { id } = useParams<StatusParams>();
  const [classes, _setClasses] = useState(useStyles());
  const [status, setStatus] = useState<object>({});
  useEffect(() => {
    const reqOpt = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`/api/status/${id}`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus(data.status);
        } else {
          alert(data.error);
        }
      });
  }, []);

  function forceUpdate() {
    return;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Grid container direction="row" spacing={1}>
          <NavPanel classes={classes} />
          <Grid item container direction="column" xs spacing={1}>
            <Grid item xs>
              {Object.keys(status).length > 0 && (
                <StatusBox status={status} forceUpdate={forceUpdate} />
              )}
            </Grid>
          </Grid>
          <WidgetPanel classes={classes} />
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
