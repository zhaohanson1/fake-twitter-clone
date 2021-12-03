import { Box, Card } from "@mui/material";

import StatusAvatar from "./StatusAvatar";
import StatusHeader from "./StatusHeader";
import StatusContent from "./StatusContent";

export default function StatusBox(props: any) {
  const { status, forceUpdate } = props;
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          p: 1,
          bgcolor: "gray.00",
        }}
      >
        <Card sx={{ width: "100%" }} variant="outlined">
          <StatusHeader />
          <Box
            sx={{
              p: 1,
              border: "1px black solid",
              display: "flex",
              width: "auto",
            }}
          >
            <StatusAvatar />
            <StatusContent status={status} forceUpdate={forceUpdate} />
          </Box>
        </Card>
      </Box>
    </div>
  );
}
