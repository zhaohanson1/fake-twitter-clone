import { Button, Input } from "@mui/material";
import React, { useState } from "react";

export default function EditMenu(props: any) {
  const { setEditable, forceUpdate } = props;
  const { content, statusId } = props;
  const [value, setValue] = useState(content);

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

    fetch(`/api/status/${statusId}`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditable(false);
          forceUpdate();
        } else {
          alert("Fail");
        }
      });
  };

  const handleClose = (_e: React.MouseEvent) => {
    setEditable(false);
  };

  return (
    <form>
      <Input
        autoFocus
        id="status-field"
        onChange={handleChange}
        value={value}
      />
      <Button size="small" onClick={handleSubmit}>
        Submit
      </Button>
      <Button size="small" onClick={handleClose}>
        Cancel
      </Button>
    </form>
  );
}
