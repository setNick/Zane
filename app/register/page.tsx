import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";

import Form from "./form";
import { redirect } from "next/navigation";
import { createUser, getUser } from "../db";

interface FormData {
  email: string;
  password: string;
}

export default function Register() {
  async function register(formData: FormData) {
    'use server';
    const email = formData.email;
    const password = formData.password;
    const user = await getUser(email);

    if (user.length > 0) {
      return "User already exists"; // Module not found: Can't resolve 'net'
    } else {
      await createUser(email, password);
      redirect("/login");
    }
  }

  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={4}>
            <Typography gutterBottom variant="h4">
              Регистрация
            </Typography>
            <Typography gutterBottom>
              Zane использует передовые технологии машинного обучения и анализа
              данных для автоматизации рутинных задач, улучшения принятия
              решений и повышения эффективности работы вашего бизнеса.
            </Typography>
            <Typography gutterBottom>
              Автоматизация рутинных задач: Zane может автоматизировать
              множество рутинных задач, таких как управление данными,
              отчетность, планирование и многое другое. Это позволяет вашему
              персоналу сосредоточиться на более важных и сложных задачах.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom align="center">
              Создать аккаунт
            </Typography>
            <Form action={register} />
            <Box>
              <Link href="/login">{"Уже есть аккаунт? Войдите"}</Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
