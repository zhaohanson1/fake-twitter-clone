import { Box } from "@mui/material";

import MenuButton from "./StatusButtons/MenuButton";

export default function StatusContentHeader(props: any) {
  const { setFetched, setEditable } = props;
  const { statusId, date } = props;

  return (
    <Box sx={{ p: 1, border: "1px black solid", display: "flex" }}>
      _Username Tags
      <Box sx={{ p: 1, border: "1px black solid", width: "auto" }}>Name</Box>
      <Box sx={{ p: 1, border: "1px black solid", width: "auto" }}>
        @Username
      </Box>
      <Box sx={{ p: 1, border: "1px black solid", width: "auto" }}>{date}</Box>
      <MenuButton
        setEditable={setEditable}
        statusId={statusId}
        setFetched={setFetched}
      />
    </Box>
  );
}
