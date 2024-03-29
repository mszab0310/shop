import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Alert, AlertColor} from "@mui/material";
import {NavigationRoutes} from "src/routes/ROUTES";
import {EmailDto} from "src/dto/EmailDto";

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

function ForgotPassword() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<AlertColor>("error");
    const [alertMessage, setAllertMessage] = useState<string>("");
    const [showAllert, setShowAlert] = useState<boolean>(false);
    const [resetToken, setResetToken] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const setEmailAddress = (e: any) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Your email " + email);
        const emailDto: EmailDto = {email: email};
        axios({
            method: "post",
            url: "http://localhost:8080/api/auth/resetPassword",
            data: emailDto,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res: any) => {
                setStatus("success");
                setAllertMessage("We've sent you an email to " + email);
                setShowAlert(true);
                setResetToken(res.data);
                console.log(res.data);
            })
            .catch((err: any) => {
                setStatus("error");
                setAllertMessage("Error: " + err.response.data.message);
                setShowAlert(true);
            });
    };

    const verifiyEmail = (event: any) => {
        event.preventDefault();
        axios({
            method: "get",
            url: "http://localhost:8080/api/auth/user/forgot-password/verify",
            params: {
                token: resetToken,
            },
        }).then((res: any) => {
            console.log(res.data);
            if (res.data === true) {
                setStatus("success");
                setAllertMessage("Email verified");
                setShowAlert(true);
                setTimeout(() => {
                    navigate(NavigationRoutes.RESET_PASSWORD);
                }, 3000);
            } else {
                setStatus("error");
                setAllertMessage("Email not verified");
                setShowAlert(true);
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot password
                    </Typography>
                    <Typography component="h4" variant="h5">
                        Please enter your email address
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={setEmailAddress}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Send email
                        </Button>
                        <Button disabled={status !== "success"} onClick={verifiyEmail} fullWidth variant="contained"
                                sx={{mt: 3, mb: 2}}>
                            Verify
                        </Button>
                        <Grid container>
                            <Grid item xs sx={{marginRight: "20px"}}>
                                <Link href="/" variant="body2">
                                    Have an accoun? Sign in
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
                {showAllert ? <Alert severity={status}>{alertMessage}</Alert> : <></>}
            </Container>
        </ThemeProvider>
    );
}

export default ForgotPassword;
