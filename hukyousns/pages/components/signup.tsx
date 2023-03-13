// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import axios from "axios";
// interface LoginResponse {
//   token: string;
//   user: {
//     user_name: string;
//     password: string;
//   };
// }

// interface LoginRequest {
//   user_name: string;
//   password: string;
// }

// interface SignupRequest {
//   user_name: string;
//   password: string;
// }
// const login = async (request: LoginRequest): Promise<LoginResponse> => {
//   const response = await axios.post<LoginResponse>(
//     "https://honnaka-backend.azurewebsites.net/api/signin",
//     request
//   );
//   return response.data;
// };

// const signup = async (request: SignupRequest): Promise<LoginResponse> => {
//   const response = await axios.post<LoginResponse>(
//     "https://honnaka-backend.azurewebsites.net/api/signup",
//     request
//   );
//   return response.data;
// };

// const SignupAndLogin = () => {
//   const [user_name, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<LoginResponse["user"] | null>(null);
//   const endpointUrl = "https://honnaka-backend.azurewebsites.net/api/v1/signup";

//   const handleCheck = async () => {
//     const requestData = {
//       username: user_name,
//       password: password,
//     };

//     try {
//       const response = await axios.post(endpointUrl, requestData);
//       console.log("Success:", response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 450 }}>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Hukyousns
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Welcome to Hukyousns! Let's enjoy this sns !
//         </Typography>
//         <Typography className="mt-1">UserName</Typography>
//         <input
//           value={user_name}
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         ></input>
//         <Typography className="mt-1">Password</Typography>
//         <input
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         ></input>
//       </CardContent>
//       <CardActions>
//         <Button size="small" onClick={handleCheck}>
//           Signup
//         </Button>
//         <Button size="small">Logout</Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default SignupAndLogin;

//改善案

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

const signup = async (request: SignupRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "https://honnaka-backend.azurewebsites.net/api/signup",
    request
  );
  return response.data;
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hukyousns
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to Hukyousns! Let&apos;s enjoy this sns !
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
  );
};

export default SignupAndLogin;
