import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function MenuButton(props: any) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { statusId, setEditable, forceUpdate } = props;

  const open = Boolean(anchorEl);
  const handleDelete = (event: React.MouseEvent) => {
    if (statusId === undefined) {
      alert("missing");
      return;
    }
    event.preventDefault();
    const reqOpt = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`/api/status/${statusId}`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditable(false);
          forceUpdate();
          alert("Deleted");
        } else {
          alert("Fail");
        }
      });
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditable(true);
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MenuIcon
          id="menu-button"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        ></MenuIcon>
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
        <MenuItem onClick={handleEdit}>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon color="warning" />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
