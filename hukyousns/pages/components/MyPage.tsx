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

const MyPage = () => {
  const [username, setUsername] = useState<string>("");
  const [myUser, setMyUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | undefined>(undefined);
  useEffect(() => {
    let ignore = false;

    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          "https://honnaka-backend.azurewebsites.net/api/v1/me/posts"
        );

        if (!ignore) {
          setPost(response.data);
          console.log("post:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchPost();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        if (!accessToken) {
          // アクセストークンがない場合は、ログイン画面にリダイレクト
          window.location.href = "./signin";
          return;
        }

        getUserInfo().then((user) => {
          setMyUser(user);
          console.log(myUser); // ユーザー情報をコンソールに出力する
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

  return (
    <div>
      <Header />
      <div>
        <h1>My Page</h1>
        <div>
          <h2>Username :{myUser.user_name}</h2>
        </div>
        <div>
          <h2>My Posts</h2>
          <ul>
            <li>{title}</li>
            <li>{summary}</li>
            <li>{body}</li>
            <li>{since}</li>
            {/* {post.map((post) => ( */}
            {/* <li key={post.title}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li> */}
            {/* ))} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
