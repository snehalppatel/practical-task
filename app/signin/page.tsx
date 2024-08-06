"use client";

import { useRouter } from "next/navigation";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

import { setCookie } from "cookies-next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutate } from "@/lib/hooks/use-mutate";
import { LoginSchema, loginSchema } from "@/lib/validation/login";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const FormCard = styled(Card)({
  boxShadow: "0px 4px 8px rgba(38, 105, 93, 0.1)",
  maxWidth: "300px",
  width: "100%",
});

// sign in api service function, usually this would be in a separate file
async function signin(data: LoginSchema) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to sign in");

  return res.json();
}

function Signin() {
  const router = useRouter();

  const { mutate: signinMutate, isPending, isError, error } = useMutate(signin);

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    // Setting cookie and redirecting to home page on successful sign in
    signinMutate(data, {
      onSuccess: (data) => {
        setCookie("access-token", data.token);
        router.push("/");
      },
    });
  }

  return (
    <Container>
      <FormCard>
        <CardHeader title="Sign in" />
        {isError && <Alert severity="error">{JSON.stringify(error)}</Alert>}
        <CardContent>
          <form role="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <Controller
                name="username"
                control={control}
                render={({ field, formState }) => (
                  <TextField
                    label="Username"
                    variant="filled"
                    fullWidth
                    disabled={isPending}
                    error={!!formState.errors.username?.message}
                    helperText={formState.errors.username?.message}
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Controller
                name="password"
                control={control}
                render={({ field, formState }) => (
                  <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    fullWidth
                    disabled={isPending}
                    error={Boolean(formState.errors.password)}
                    helperText={formState.errors.password?.message}
                    {...field}
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </FormCard>
    </Container>
  );
}

export default Signin;
