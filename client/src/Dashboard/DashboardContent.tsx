import { Grid } from "@mui/material";
import clsx from "clsx";
import { useState, useEffect } from "react";
import ContentEditableBox from "./ContentEditableBox";
import StatusBox from "./StatusBox";

export default function DashboardContent(props: any) {
  const classes = props.classes;
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (props.user) {
      fetch(`/api/user/${props.user}/status`, { method: "GET" })
        .then((res) => res.json())
        .then((result) => {
          if (isMounted) setStatuses(result);
        });
    }

    console.log(statuses);

    return () => {
      isMounted = false;
    };
  }, [props.user]);

  return (
    <Grid item container direction="column" xs spacing={1}>
      <Grid item xs>
        <ContentEditableBox user={props.user} />
      </Grid>
      <Grid item xs>
        {statuses.map((status: any) => {
          var dateAsString = new Date(status.creationDate).toString();;
          return (
            <div key={status.id}>
              <StatusBox date={dateAsString} content={status.content} />
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
}
