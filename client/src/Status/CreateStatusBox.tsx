import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useUserContext } from "../Contexts/UserContext";

export default function CreateStatusBox(props: any) {
  const { user } = useUserContext();
  const { forceUpdate } = props;
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
      body: JSON.stringify({ userId: user, content: value }),
    };
    console.log(user);

    fetch(`/api/status`, reqOpt)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setValue(initValue);
          forceUpdate();
          alert("pass");
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
