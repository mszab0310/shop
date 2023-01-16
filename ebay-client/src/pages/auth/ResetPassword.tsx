import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertColor } from "@mui/material";
import { NavigationRoutes } from "src/routes/ROUTES";
import { ResetPasswordDTO } from "src/dto/ResetPassword";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/mszab0310">
        Mali Attila Szabolcs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function ResetPassword() {
  const [requestStatusMessage, setRequestStatusMessage] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<AlertColor>("success");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setRequestStatusMessage("Passwords don't match");
      setStatus("warning");
      setShowAlert(true);
    } else {
      const resetPasswordDto: ResetPasswordDTO = { email: email, newPassword: newPassword, confirmPassword: confirmPassword };
      axios({
        method: "post",
        url: "http://localhost:8080/api/auth/user/reset-password",
        data: resetPasswordDto,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setRequestStatusMessage("Password reset successfully");
          setStatus("success");
          setShowAlert(true);
          setTimeout(() => {
            navigate(NavigationRoutes.LOGIN);
          }, 3000);
        })
        .catch((err: any) => {
          setStatus("error");
          setRequestStatusMessage("Error: " + err.response.data.message);
          setShowAlert(true);
        });
    }
  };

  const getEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const getNewPassword = (event: any) => {
    setNewPassword(event.target.value);
  };
  const getConfirmPassword = (event: any) => {
    setConfirmPassword(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          {showAlert ? <Alert severity={status}>{requestStatusMessage}</Alert> : <></>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus onChange={getEmail} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="New Password"
              type="password"
              name="newPassword"
              autoComplete="new-password"
              autoFocus
              onChange={getNewPassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              onChange={getConfirmPassword}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Change password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
