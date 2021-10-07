import { Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function EditMenu(props: any) {
  const initValue = props.initValue;
  const [value, setValue] = useState(initValue);
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const reqOpt = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: value }),
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
  };

  const handleClose = (e: React.MouseEvent) => {
    props.setEditable(false);
  };
  return (
    <form>
      <Input
        autoFocus
        id="status-field"
        onChange={(e) => handleChange(e)}
        value={value}
      />
      <Button
        size="small"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </Button>
      <Button
        size="small"
        onClick={(e) => {
          handleClose(e);
        }}
      >
        Cancel
      </Button>
    </form>
  );
}
