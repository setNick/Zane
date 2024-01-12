"use client"
import dynamic from 'next/dynamic';
import React, { useReducer, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

interface FormData {
  email: string;
  password: string;
  rePassword: string;
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
    rePassword: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    const { email, password, rePassword } = formData;
    if (!email || !password || !rePassword) {
      setError("Все поля обязательны для заполнения");
      return false;
    }
    if (password !== rePassword) {
      setError("Пароли не совпадают");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!error) {
      try {
        await action(formData);
      } catch (err) {
        setError("Произошла неизвестная ошибка");
      }
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
      <TextField
        margin="normal"
        required
        fullWidth
        name="rePassword"
        label="Re-password"
        type="password"
        id="rePassword"
        autoComplete="current-password"
        value={formData.rePassword}
        onChange={setFormData}
      />
      <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
        Создать аккаунт
      </Button>
    </form>
  );
};

const DynamicForm = dynamic(() => Promise.resolve(Form), { ssr: false });

export default DynamicForm;
