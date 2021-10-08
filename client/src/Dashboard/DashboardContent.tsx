import { Divider, Grid, List, ListItem } from "@mui/material";
import clsx from "clsx";
import React from "react";
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
        <List sx={{ bgcolor: "background.paper" }}>
          {statuses.map((status: any) => {
            var dateAsString = new Date(status.creationDate).toLocaleString();
            return (
              <React.Fragment key={status._id}>
                <ListItem>
                  <StatusBox
                    date={dateAsString}
                    content={status.content}
                    statusId={status._id}
                    setFetched={setFetched}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
