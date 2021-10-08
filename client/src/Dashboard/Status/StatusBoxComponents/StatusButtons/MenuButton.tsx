import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function MenuButton(props: any) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setEditable, setFetched } = props;
  const statusId = props.statusId;
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
          setFetched(false);
          setEditable(false);
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
          Edit <EditIcon />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete <DeleteIcon color="warning" />
        </MenuItem>
      </Menu>
    </Box>
  );
}
