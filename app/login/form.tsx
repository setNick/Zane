"use client"
import React, { useReducer, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

interface FormData {
  email: string;
  password: string;
}

interface FormProps {
  action: (data: FormData) => Promise<string>;
}

const formReducer = (
  state: FormData,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Form: React.FC<FormProps> = ({ action }) => {
  const [formData, setFormData] = useReducer(formReducer, {
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await action(formData);
    } catch (err) {
      setError("Произошла неизвестная ошибка");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={setFormData}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={setFormData}
      />
      <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
        Войти
      </Button>
    </form>
  );
};

export default Form;
