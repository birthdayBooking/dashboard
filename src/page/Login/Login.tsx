import * as React from "react";
import Box from "@mui/material/Box";
import foodImage from "../../assets/images/cake2.jpg";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${foodImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
          overflow: "auto",
        }}
      >
        <LoginForm />
      </Box>
    </>
  );
};

export default Login;
