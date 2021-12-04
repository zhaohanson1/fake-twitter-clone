import { Box, CssBaseline, TextField } from "@mui/material";
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../Contexts/UserContext";

export default function EditProfile(props: any) {
  const { user, name, email, userFetched } = useUserContext();

  const defaultValues = {
    name: name || "",
    email: email || "",
  };
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name: key, value: val } = e.target;
    setFormValues({
      ...formValues,
      [key]: val,
    });
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    const reqOpts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    };

    fetch(`/api/user/${user}`, reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data.redirectURI) {
          window.location.href = data.redirectURI;
        }
      });
  }

  useEffect(() => {
    setFormValues({
      ...formValues,
      name: name || "",
      email: email || "",
    });
  }, [userFetched]);

  return (
    <Box component="main">
      {userFetched && typeof user === "undefined" && (
        <Redirect to="/dashboard" />
      )}
      <CssBaseline />
      <Box mx="33vw" mt="10vh">
        <form>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </Box>
    </Box>
  );
}
