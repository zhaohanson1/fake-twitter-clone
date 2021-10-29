import { Box } from "@mui/material";
import { useState } from "react";
import EditMenu from "./EditMenu";
import CommentButton from "./StatusButtons/CommentButton";
import LikeButton from "./StatusButtons/LikeButton";
import RetweetButton from "./StatusButtons/RetweetButton";
import ShareButton from "./StatusButtons/ShareButton";
import MenuButton from "./StatusButtons/MenuButton";

export default function StatusContent(props: any) {
  var { user, status, forceUpdate } = props;
  const [editable, setEditable] = useState(false);
  const b = { p: 1, border: "1px black solid" };

  return (
    <Box>
      <Box sx={{ p: 1, display: "flex" }}>
        <Box sx={{ p: 1, width: "auto" }}>Name</Box>
        <Box sx={{ p: 1, width: "auto" }}>@{status.user}</Box>
        <Box sx={{ p: 1,  width: "auto" }}>
          {new Date(status.creationDate).toLocaleString()}
        </Box>
        {user == status.user && (
          <MenuButton
            statusId={status._id}
            setEditable={setEditable}
            forceUpdate={forceUpdate}
          />
        )}
      </Box>
      <Box sx={{}}>
        <Box sx={{ p: 1 }}>
          {editable ? (
            <EditMenu
              statusId={status._id}
              setEditable={setEditable}
              forceUpdate={forceUpdate}
            />
          ) : (
            status.content
          )}
        </Box>
        <Box sx={{ p: 1 }}>{status._id}</Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CommentButton />
          <RetweetButton />
          <LikeButton status={status} user={user} />
          <ShareButton statusId={status._id} />
        </Box>
      </Box>
    </Box>
  );
}
