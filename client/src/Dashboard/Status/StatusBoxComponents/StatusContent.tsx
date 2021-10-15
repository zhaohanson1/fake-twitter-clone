import { Box } from "@mui/material";
import { useState } from "react";
import EditMenu from "./EditMenu";
import CommentButton from "./StatusButtons/CommentButton";
import LikeButton from "./StatusButtons/LikeButton";
import RetweetButton from "./StatusButtons/RetweetButton";
import ShareButton from "./StatusButtons/ShareButton";
import MenuButton from "./StatusButtons/MenuButton";

export default function StatusContent(props: any) {
  const [editable, setEditable] = useState(false);
  var { status, setFetched } = props;
  const date = status.creationDate;
  const statusId = status.id;

  return (
    <Box sx={{ p: 1, border: "1px black solid", width: "100%" }}>
      <Box sx={{ p: 1, border: "1px black solid", display: "flex" }}>
        _Username Tags
        <Box sx={{ p: 1, border: "1px black solid", width: "auto" }}>Name</Box>
        <Box sx={{ p: 1, border: "1px black solid", width: "auto" }}>
          @Username
        </Box>
        <Box sx={{ p: 1, border: "1px black solid", width: "auto" }}>
          {new Date(date).toLocaleString()}
        </Box>
        <MenuButton
          setEditable={setEditable}
          statusId={statusId}
          setFetched={setFetched}
        />
      </Box>
      <Box sx={{ border: "1px black solid" }}>
        <Box sx={{ p: 1, border: "1px black solid" }}>
          {editable ? (
            <EditMenu
              initValue={status.content}
              statusId={statusId}
              setEditable={setEditable}
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
          <LikeButton status={status} />
          <ShareButton />
        </Box>
      </Box>
    </Box>
  );
}
