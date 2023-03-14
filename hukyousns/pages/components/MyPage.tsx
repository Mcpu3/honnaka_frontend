// import { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "./header";
// import { Stack } from "@mui/system";

// interface User {
//   user_uuid: string;
//   user_name: string;
//   display_name: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Articles {
//   user_uuid: string;
//   title: string;
// }

// const testData: Articles[] = [
//   {
//     user_uuid: "178b87a3-f21d-42de-963d-9f1a4ae25afb",
//     title: "コザクラインコかわいい",
//   },
//   {
//     user_uuid: "178b87a3-f21d-42de-963d-9f1a4ae25afb",
//     title: " オウムはいいぞ",
//   },
// ];

// const API_ENDPOINT = "https://honnaka-backend.azurewebsites.net/api/v1/me";

// async function getUserInfo(): Promise<User> {
//   const accessToken = localStorage.getItem("access_token");
//   const response = await axios.get(API_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   return response.data;
// }

// const MyPage = () => {
//   const [username, setUsername] = useState<string>("");
//   const [myUser, setMyUser] = useState<User | null>(null);
//   const [articles, setArticles] = useState<Articles[]>([]);

//   useEffect(() => {
//     const fetchMyPageData = async () => {
//       try {
//         const accessToken = localStorage.getItem("access_token");
//         console.log(accessToken);
//         if (!accessToken) {
//           // アクセストークンがない場合は、ログイン画面にリダイレクト
//           window.location.href = "./signin";
//           return;
//         }

//         getUserInfo().then((user) => {
//           setMyUser(user);
//           console.log(myUser); // ユーザー情報をコンソールに出力する
//         });

//         const userInfo = await getUserInfo();
//         console.log(userInfo);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     fetchMyPageData();
//   }, []);

//   if (!myUser) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Stack>
//       <Header />
//       <Stack sx={{ width: 400 }}>
//         <div className="bg-gray-600">
//           My Page
//           <div>UserName : {myUser.user_name}</div>
//         </div>
//         <div>
//           <h2>My Articles</h2>
//           <ul>
//             {testData.map((article) => (
//               <li key={article.user_uuid}>
//                 <h3>{article.title}</h3>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Stack>
//     </Stack>
//   );
// };

// export default MyPage;

//↑テストデータ表示用

//↓本番環境提出用
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "./header";
// import { Stack } from "@mui/system";

// interface User {
//   user_uuid: string;
//   user_name: string;
//   display_name: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Articles {
//   user_uuid: string;
//   title: string;
// }

// const testData: Articles[] = [
//   {
//     user_uuid: "178b87a3-f21d-42de-963d-9f1a4ae25afb",
//     title: "コザクラインコかわいい",
//   },
//   {
//     user_uuid: "178b87a3-f21d-42de-963d-9f1a4ae25afb",
//     title: " オウムはいいぞ",
//   },
// ];

// const API_ENDPOINT =
//   "https://honnaka-backend.azurewebsites.net/api/v1/me/posts";

// async function getUserInfo(): Promise<User> {
//   const accessToken = localStorage.getItem("access_token");
//   const response = await axios.get(API_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   return response.data;
// }

// const MyPage = () => {
//   const [username, setUsername] = useState<string>("");
//   const [myUser, setMyUser] = useState<User | null>(null);
//   const [articles, setArticles] = useState<Articles[]>([]);

//   useEffect(() => {
//     const fetchMyPageData = async () => {
//       try {
//         const accessToken = localStorage.getItem("access_token");

//         if (!accessToken) {
//           // アクセストークンがない場合は、ログイン画面にリダイレクト
//           window.location.href = "./signin";
//           return;
//         }

//         getUserInfo().then((user) => {
//           setMyUser(user);
//           //   console.log(myUser); // ユーザー情報をコンソールに出力する
//         });

//         console.log(myUser?.user_name);

//         const userInfo = await getUserInfo();
//         console.log(userInfo);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     fetchMyPageData();
//   }, []);

//   if (!myUser) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Stack>
//       <Header />
//       <Stack sx={{ width: 400 }}>
//         <div className="bg-gray-600">
//           My Page
//           <div>UserName : {myUser.user_name}</div>
//         </div>
//         <div>
//           <h2>My Articles</h2>
//           {/* <ul>
//             {testData.map((article) => (
//               <li key={article.user_uuid}>
//                 <h3>{article.title}</h3>
//               </li>
//             ))}
//           </ul> */}
//         </div>
//       </Stack>
//     </Stack>
//   );
// };

// export default MyPage;

// ↓エラー回避

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import { Card, CardContent, Typography } from "@mui/material";

interface User {
  user_uuid: "string";
  user_name: "string";
  display_name: "string";
  created_at: "string";
  updated_at: "string";
}
interface Post {
  post_uuid: string;
  user_uuid: string;
  title: string;
  summary: string | undefined;
  tags_uuid: string[];
  website: string | undefined;
  location_uuid: string | undefined;
  since: string | undefined;
  image_uuid: string | undefined;
  body: string;
  created_at: Date;
  updated_at: Date | undefined;
}

interface me {
  user_uuid: string;
  user_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}
const API_ENDPOINT = "https://honnaka-backend.azurewebsites.net/api/v1/me";

async function getUserInfo(): Promise<User> {
  const accessToken = localStorage.getItem("access_token");
  const res = await axios.get(API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}
const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const MyPage = () => {
  const [username, setUsername] = useState<string>("");
  const [myUser, setMyUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [accessToken, setAccesstoken] = useState<string>("");
  useEffect(() => {
    let ignore = false;

    const fetchPost = async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        const response = await axios.get<Post>(
          "https://honnaka-backend.azurewebsites.net/api/v1/me/posts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!ignore) {
          setPost(response.data);
          console.log("post:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };
    if (!accessToken) return;

    fetchPost();

    return () => {
      ignore = true;
    };
  }, [accessToken]);

  useEffect(() => {
    let ignore = false;

    const getPost = async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        const respost = await axios.get<Post>(
          "https://honnaka-backend.azurewebsites.net/api/v1/post/d2b4b071-6930-4162-a5e7-b2296b987ddf",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!ignore) {
          setPost(respost.data);
          console.log("post:", respost.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };
    if (!accessToken) return;

    getPost();

    return () => {
      ignore = true;
    };
  }, [accessToken]);

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(accessToken);
        if (!token) {
          // アクセストークンがない場合は、ログイン画面にリダイレクト
          window.location.href = "./signin";
          return;
        }
        setAccesstoken(token);

        getUserInfo().then((user) => {
          setMyUser(user);
          // console.log(myUser); // ユーザー情報をコンソールに出力する
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMyPageData();
  }, []);

  if (!myUser) {
    return <div>Loading...</div>;
  }

  const summary = post && post.summary;
  const title = post && post.title;
  const body = post && post.body;
  const since = post && post.since;
  const user_name = post && myUser.user_name;

  return (
    // <div>
    //   <Header />
    //   <div>
    //     <h1>My Page</h1>
    //     <div>
    //       <h2>Username :{myUser.user_name}</h2>
    //     </div>
    //     <div>
    //       <h2>My Posts</h2>
    //       <ul>
    //         <li>{title}</li>
    //         <li>{summary}</li>
    //         <li>{body}</li>
    //         <li>{since}</li>
    //         {/* {post.map((post) => ( */}
    //         {/* <li key={post.title}>
    //           <h3>{post.title}</h3>
    //           <p>{post.content}</p>
    //         </li> */}
    //         {/* ))} */}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div>
      <Header />
      <div>
        <h1>My page</h1>
        <h2>username : {user_name}</h2>
        <div>
          <Card sx={{ maxWidth: 768 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {user_name}
              </Typography>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body1">{summary}</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {since}
              </Typography>
            </CardContent>
            {/* <CardActions>
            <IconButton area-label="like" onClick={handle_like}>
              {get_like(reaction?.like)}
              {get_likes(reactions?.like)}
            </IconButton>
            <IconButton area-label="super_like" onClick={handle_super_like}>
              {get_super_like(reaction?.super_like)}
              {get_super_likes(reactions?.super_like)}
            </IconButton>
            <IconButton area-label="next" onClick={handle_next}>
              <ArrowForwardIcon />
            </IconButton>
          </CardActions> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
