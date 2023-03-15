import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import Header from "./header";
import Router from "next/router";
import { Url } from "next/dist/shared/lib/router/router";

interface LoginResponse {
  token: string;
  user: {
    user_name: string;
    password: string;
  };
}

interface LoginRequest {
  user_name: string;
  password: string;
}

interface SignupRequest {
  user_name: string;
  password: string;
}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "https://honnaka-backend.azurewebsites.net/api/signin",
    request
  );
  return response.data;
};

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const signup = async (request: SignupRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "https://honnaka-backend.azurewebsites.net/api/signup",
    request
  );
  return response.data;
};
const handler = (path: Url) => {
  Router.push(path);
};

const SignupAndLogin = () => {
  const [user_name, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const endpointUrl = "https://honnaka-backend.azurewebsites.net/api/v1/signup";

  const handleCheck = async () => {
    const requestData = {
      user_name: user_name,
      password: password,
    };

    try {
      const response = await axios.post(endpointUrl, requestData);
      console.log("Success:", response);
      handler("./signin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.cardContainer}>
        <Card sx={{ maxWidth: 450, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              PassionPulse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome to PassionPulse! Let&apos;s enjoy this SNS!
            </Typography>
            <Typography className="mt-1">UserName</Typography>
            <input
              value={user_name}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <Typography className="mt-1">Password</Typography>
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleCheck}>
              Signup
            </Button>
            <Button size="small">Logout</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default SignupAndLogin;
