import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
interface LoginResponse {
  token: string;
  user: {
    id: string;
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
  const response = await axios.post<LoginResponse>("/api/login", request);
  return response.data;
};

const signup = async (request: SignupRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/api/signup", request);
  return response.data;
};

const SignupAndLogin = () => {
  const [user_name, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);

  const handleSignupAndLogin = async () => {
    const { token, user } = await signup({ user_name, password });
    setToken(token);
    setUser(user);
  };
  const handleLogin = async () => {
    const { token, user } = await login({ user_name, password });
    setToken(token);
    setUser(user);
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hukyousns
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to Hukyousns! Let's enjoy this sns !
        </Typography>
        <Typography className="mt-1">UserName</Typography>
        <TextField
          variant="standard"
          value={user_name}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></TextField>
        <Typography className="mt-1">Password</Typography>
        <TextField
          variant="standard"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>
      </CardContent>
      <CardActions>
        <Button size="small">Signup</Button>
        <Button size="small">Logout</Button>
      </CardActions>
    </Card>
  );
};

// const useLogin = (user_name: string, password: string) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<LoginResponse["user"] | null>(null);

//   useEffect(() => {
//     const doLogin = async () => {
//       const { token, user } = await login({ user_name, password });
//       setToken(token);
//       setUser(user);
//     };

//     doLogin();
//   }, [user_name, password]);

//   return { token, user };
// };

export default SignupAndLogin;
