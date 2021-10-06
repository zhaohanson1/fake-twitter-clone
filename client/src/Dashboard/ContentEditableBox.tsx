import { Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ContentEditableBox(props: any) {
  const initValue = "";
  const [value, setValue] = useState(initValue);
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const reqOpt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: value }),
    };

    fetch(`/api/user/${props.user}/status`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("pass");
          setValue(initValue);
        } else {
          alert("fail");
        }
      });
  };
  return (
    <form>
      <Input
        id="status-field"
        placeholder={"What's happening?"}
        onChange={(e) => handleChange(e)}
      />
      <Button
        size="medium"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </Button>
    </form>
  );
}
