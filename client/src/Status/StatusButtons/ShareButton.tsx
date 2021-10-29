import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";

export default function RetweetButton(props: any) {
  const { statusId } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    const url = `${window.location.host}/status/${statusId}`;
    navigator.clipboard.writeText(url).catch(function (err) {
      console.error("err in copy");
      console.error(err);
    });
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <ShareIcon id="share-button" aria-label="share-icon"></ShareIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCopy}>
          <LinkIcon aria-label="copy-link" />
          Copy Link to Status
        </MenuItem>
      </Menu>
    </Box>
  );
}
