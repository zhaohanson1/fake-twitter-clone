import { Divider, Grid, List, ListItem } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { useState, useEffect } from "react";
import CreateStatusBox from "../Status/CreateStatusBox";
import StatusBox from "../Status/Status";

export default function DashboardContent(props: any) {
  const { user, classes } = props;
  const [statuses, setStatuses] = useState([]);
  const [fetched, setStatusFetched] = useState(false);

  function forceUpdate() {
    setStatusFetched(false);
  }

  useEffect(() => {
    let isMounted = true;

    if (user) {
      fetch(`/api/status`, { method: "GET" })
        .then((res) => res.json())
        .then((result) => {
          if (isMounted) {
            setStatuses(result);
            setStatusFetched(true);
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
        <CreateStatusBox user={user} forceUpdate={forceUpdate} />
      </Grid>
      <Grid item xs>
        <List sx={{ bgcolor: "background.paper" }}>
          {statuses.map((status: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <ListItem>
                  <StatusBox
                    status={status}
                    user={user}
                    forceUpdate={forceUpdate}
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
