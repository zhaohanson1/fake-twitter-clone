import { Box, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function RetweetButton(props: any) {
  return (
    <Box>
      <IconButton>
        <FavoriteIcon
          id="like-button"
        ></FavoriteIcon>
      </IconButton>
    </Box>
  );
}
