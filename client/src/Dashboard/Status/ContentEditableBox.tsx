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

  const sendPost = () => {
    const reqOpt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.user, content: value }),
    };
    console.log(props.user);

    fetch(`/api/status`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("pass");
          setValue(initValue);
          props.setFetched(false);
        } else {
          alert("fail");
        }
      });
  };
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    sendPost();
  };

  const handlekeyPress = (event: React.KeyboardEvent) => {
    if (event.key == "Enter") {
      event.preventDefault();
      sendPost();
    }
  };
  return (
    <form>
      <Input
        id="status-field"
        placeholder={"What's happening?"}
        onChange={handleChange}
        onKeyDown={handlekeyPress}
        autoComplete="off"
        value={value}
      />
      <Button size="medium" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}
