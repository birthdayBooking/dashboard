import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useState } from "react";
import LoginSnackbar from "./LoginSnackBar";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

const LoginForm: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace the following with your actual authentication logic
      const response = await fetch("/api/v1/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if(data.status === 'success') {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setLoading(false);
        setAuthUser(data);
        setIsAuthenticated(true)
        navigate("/");
      }
    } catch (error: unknown) {
      console.error("Error during login:", error);
      setText("Login Fail");
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ width: "40%" }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
              autoComplete="true"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="UserName"
                name="userName"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="off"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="off"
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size="0.9rem" /> : null}
              >
                {loading ? "Progress Sign In" : "Sign In"}
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>

      <LoginSnackbar open={open} handleClose={handleClose} text={text} />
    </>
  );
};

export default LoginForm;
