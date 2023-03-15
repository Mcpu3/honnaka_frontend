// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={styles.main}>
//         <div className={styles.description}>
//           <p>
//             Get started by editing&nbsp;
//             <code className={styles.code}>pages/index.tsx</code>
//           </p>
//           <div>
//             <a
//               href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               By{" "}
//               <Image
//                 src="/vercel.svg"
//                 alt="Vercel Logo"
//                 className={styles.vercelLogo}
//                 width={100}
//                 height={24}
//                 priority
//               />
//             </a>
//           </div>
//         </div>

//         <div className={styles.center}>
//           <Image
//             className={styles.logo}
//             src="/next.svg"
//             alt="Next.js Logo"
//             width={180}
//             height={37}
//             priority
//           />
//           <div className={styles.thirteen}>
//             <Image
//               src="/thirteen.svg"
//               alt="13"
//               width={40}
//               height={31}
//               priority
//             />
//           </div>
//         </div>

//         <div className={styles.grid}>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Docs <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Find in-depth information about Next.js features and&nbsp;API.
//             </p>
//           </a>

//           <a
//             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Learn <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Learn about Next.js in an interactive course with&nbsp;quizzes!
//             </p>
//           </a>

//           <a
//             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={inter.className}>
//               Templates <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Discover and deploy boilerplate example Next.js&nbsp;projects.
//             </p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className="text-red-700">
//               Deploy <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Instantly deploy your Next.js site to a shareable URL
//               with&nbsp;Vercel.
//             </p>
//           </a>
//         </div>
//       </main>
//     </>
//   );
// }
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
import Header from "./components/header";

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
  const styles = {
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
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
          </CardContent>
          <CardActions>
            <Button size="small" href="./components/signup">
              Signup
            </Button>
            <Button size="small" href="./components/signin">
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
