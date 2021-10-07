import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import EditMenu from "./EditMenu";

export default function StatusBox(props: any) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editable, setEditable] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setEditable(true);
    setAnchorEl(null);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    const reqOpt = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      
    };

    fetch(`/api/status/${props.statusId}`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          props.setFetched(false);
          props.setEditable(false);
        } else {
          alert("Fail");
        }
      });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
        {editable ? (
          <EditMenu
            initValue={props.content}
            setEditable={setEditable}
            statusId={props.statusId}
            setFetched={props.setFetched}
          />
        ) : (
          props.content
        )}
      </div>
      <div>{props.date}</div>
      <MenuIcon
        id="menu-button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      ></MenuIcon>
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
    </div>
  );
}
