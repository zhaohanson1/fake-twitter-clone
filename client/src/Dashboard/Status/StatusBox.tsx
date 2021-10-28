import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";

import StatusAvatarBox from "./StatusBoxComponents/StatusAvatarBox";
import StatusHeader from "./StatusBoxComponents/StatusHeader";
import StatusContent from "./StatusBoxComponents/StatusContent";

export default function StatusBox(props: any) {
  const { status, user, setFetched } = props;
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,
          bgcolor: "gray.00",
          border: "1px black solid",
        }}
      >
        <Box sx={{ p: 1, border: "1px black solid", width: "100%" }}>
          <StatusHeader />
          <Box
            sx={{
              p: 1,
              border: "1px black solid",
              display: "flex",
              width: "auto",
            }}
          >
            <StatusAvatarBox />
            <StatusContent
              status={status}
              user={user}
              setFetched={setFetched}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
