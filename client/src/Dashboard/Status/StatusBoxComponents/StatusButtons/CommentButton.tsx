import { Box, IconButton } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

export default function CommentButton(props: any) {
  return (
    <Box>
      <IconButton>
        <ModeCommentIcon
          id="comment-button"
          aria-haspopup="true"
        ></ModeCommentIcon>
      </IconButton>
    </Box>
  );
}
