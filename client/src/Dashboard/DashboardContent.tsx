import { Grid } from "@mui/material";
import clsx from "clsx";

export default function DashboardContent(props: any) {
const classes = props.classes;
  return (
    <Grid item container direction="column" xs spacing={1}>
      <Grid item xs>
        <div className={classes.container}>2</div>
      </Grid>
      <Grid item xs>
        <div className={clsx(classes.container, classes.containerTall)}>3</div>
      </Grid>
    </Grid>
  );
}
