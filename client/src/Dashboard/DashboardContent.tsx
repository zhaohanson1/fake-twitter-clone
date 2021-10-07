import { Grid } from "@mui/material";
import clsx from "clsx";
import { useState, useEffect } from "react";
import ContentEditableBox from "./Status/ContentEditableBox";
import StatusBox from "./Status/StatusBox";

export default function DashboardContent(props: any) {
  const classes = props.classes;
  const [statuses, setStatuses] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (props.user) {
      fetch(`/api/status`, { method: "GET" })
        .then((res) => res.json())
        .then((result) => {
          if (isMounted) {
            setStatuses(result);
            setFetched(true);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [props.user, fetched]);

  return (
    <Grid item container direction="column" xs spacing={1}>
      <Grid item xs>
        <ContentEditableBox user={props.user} setFetched={setFetched} />
      </Grid>
      <Grid item xs>
        {statuses.map((status: any) => {
          var dateAsString = new Date(status.creationDate).toString();

          return (
            <div key={status._id}>
              <StatusBox
                date={dateAsString}
                content={status.content}
                statusId={status._id}
                setFetched={setFetched}
              />
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
}
