import { Box, IconButton } from "@mui/material";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function RetweetButton(props: any) {
  return (
    <Box>
      <IconButton>
        <CompareArrowsIcon
          id="retweet-button"
        ></CompareArrowsIcon>
      </IconButton>
    </Box>
  );
}
