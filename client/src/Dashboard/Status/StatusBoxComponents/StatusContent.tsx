import { Box } from "@mui/material";
import { useState } from "react";
import EditMenu from "./EditMenu";
import CommentButton from "./StatusButtons/CommentButton";
import LikeButton from "./StatusButtons/LikeButton";
import RetweetButton from "./StatusButtons/RetweetButton";
import ShareButton from "./StatusButtons/ShareButton";
import StatusContentHeader from "./StatusContentHeader";

export default function StatusContent(props: any) {
  const [editable, setEditable] = useState(false);
  var { date, content, statusId } = props;
  var { setFetched } = props;

  return (
    <Box sx={{ p: 1, border: "1px black solid", width: "100%" }}>
      <StatusContentHeader
        date={date}
        setEditable={setEditable}
        setFetched={setFetched}
        statusId={statusId}
      />
      <Box sx={{ border: "1px black solid" }}>
        <Box sx={{ p: 1, border: "1px black solid" }}>
          {editable ? (
            <EditMenu
              initValue={content}
              setEditable={setEditable}
              statusId={statusId}
              setFetched={setFetched}
            />
          ) : (
            props.content
          )}
        </Box>
        <Box sx={{ p: 1, border: "1px black solid" }}>Media</Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <CommentButton />
          <RetweetButton />
          <LikeButton />
          <ShareButton />
        </Box>
      </Box>
    </Box>
  );
}
