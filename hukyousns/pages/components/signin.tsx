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
import { Url } from "next/dist/shared/lib/router/router";
import Router from "next/router";

interface LoginResponse {
  token: string;
  user: {
    username: string;
    password: string;
  };
}

interface LoginRequest {
  username: string;
  password: string;
}

interface SignupRequest {
  username: string;
  password: string;
}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "https://honnaka-backend.azurewebsites.net/api/v1/signin",
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

const handler = (path: Url) => {
  Router.push(path);
};

const SignupAndLogin = () => {
  const [user_name, setUsername] = useState<string>("");
  const [username, setUserloginname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const endpointUrl = "https://honnaka-backend.azurewebsites.net/api/v1/signin";

  const handleCheck = async () => {
    const requestData = {
      username: username,
      password: password,
    };

    // POSTリクエストを送信
    //

    var params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    try {
      const response = await axios.post(endpointUrl, params);
      console.log("Success:", response);
      console.log(response.data.access_token);

      localStorage.setItem("access_token", response.data.access_token);
      handler("./home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.cardContainer}>
        <Card sx={{ maxWidth: 450 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              PassionPulse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome to PassionPulse! Let&apos;s enjoy this SNS!
            </Typography>
            <Typography className="mt-1">UserName</Typography>
            <input
              value={username}
              onChange={(e) => {
                setUserloginname(e.target.value);
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
              Signin
            </Button>
            <Button size="small">Logout</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default SignupAndLogin;
