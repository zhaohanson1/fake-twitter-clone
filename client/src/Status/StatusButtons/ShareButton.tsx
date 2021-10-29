import { Box, IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';

export default function RetweetButton(props: any) {
  return (
    <Box>
      <IconButton>
        <ShareIcon
          id="share-button"
        ></ShareIcon>
      </IconButton>
    </Box>
  );
}
