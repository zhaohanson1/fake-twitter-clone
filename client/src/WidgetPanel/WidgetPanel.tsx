import { Grid } from "@mui/material";

export default function WidgetPanel(props: any) {
  const classes = props.classes;
  return (
    <Grid item xs>
      <div className={classes.container}>4</div>
    </Grid>
  );
}
