import { Divider, Grid, List, ListItem } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { useState, useEffect } from "react";
import ContentEditableBox from "./Status/ContentEditableBox";
import StatusBox from "./Status/StatusBox";

export default function DashboardContent(props: any) {
  const {user, classes} = props;
  const [statuses, setStatuses] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    if (user) {
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
  }, [user, fetched]);

  return (
    <Grid item container direction="column" xs spacing={1}>
      <Grid item xs>
        <ContentEditableBox user={props.user} setFetched={setFetched} />
      </Grid>
      <Grid item xs>
        <List sx={{ bgcolor: "background.paper" }}>
          {statuses.map((status: any) => {
            return (
              <React.Fragment key={status._id}>
                <ListItem>
                  <StatusBox
                    status={status}
                    user={user}
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
