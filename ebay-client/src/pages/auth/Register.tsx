import * as React from "react";
import {useState} from "react";
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
import {NavigationRoutes} from "../../routes/ROUTES";
import Alert, {AlertColor} from "@mui/material/Alert";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const [requestStatusMessage, setRequestStatusMessage] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<AlertColor>("success");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [userType, setUserType] = useState<string>("student")


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const username = data.get("username");
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const password = data.get("password");
        const companyName = data.get("companyName");
        const cui = data.get("companyNumber");

        var requestUrl;
        var requestData;

        if (userType == "student") {
            requestUrl = "http://localhost:8080/api/auth/register";
            requestData = {
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
            };
        } else if (userType == "recruiter") {
            requestUrl = "http://localhost:8080/api/auth/register/recruiter";
            requestData = {
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                companyName: companyName,
                cui: cui
            };
        }

        await axios
            .post(
                requestUrl,
                requestData,
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            )
            .then(() => {
                setRequestStatusMessage("Account created successfully!");
                setStatus("success");
                setShowAlert(true);
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((err: any) => {
                setRequestStatusMessage(err.response.data.message);
                setShowAlert(true);
                setStatus("error");
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
                        Sign up
                    </Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={userType}
                        exclusive
                        onChange={(e, value) => setUserType(value)}
                        aria-label="Platform"
                    >
                        <ToggleButton value="student">Student</ToggleButton>
                        <ToggleButton value="recruiter">Recruiter</ToggleButton>
                    </ToggleButtonGroup>
                    {showAlert ? <Alert severity={status}>{requestStatusMessage}</Alert> : <></>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            {userType === "recruiter" ? <>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="companyName" required fullWidth id="firstName" label="Company Name"
                                               autoFocus/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField datatype={"number"} name="companyNumber" required fullWidth
                                               id="companyNumber" label="cui" autoFocus/>
                                </Grid>
                            </> : <></>}
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName"
                                           label="First Name" autoFocus/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="lastName" label="Last Name" name="lastName"
                                           autoComplete="family-name"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="username" label="Username" name="username"
                                           autoComplete="username"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email Address" name="email"
                                           autoComplete="email"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Password" type="password"
                                           id="password" autoComplete="new-password"/>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={NavigationRoutes.LOGIN} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}
