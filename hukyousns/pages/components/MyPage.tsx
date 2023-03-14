import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import { Card, CardContent, Typography } from "@mui/material";
import { ConnectedTvOutlined } from "@mui/icons-material";
import { access } from "fs";

interface User {
  user_uuid: "string";
  user_name: "string";
  display_name: "string";
  created_at: "string";
  updated_at: "string";
}

interface PostsUuid {
  posts_uuid: string[];
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
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [accessToken, setAccesstoken] = useState<string>("");
  const [articles, setArticles] = useState<Post[]>([]);
  const [leng, setLeng] = useState<number>(0);
  const [postsUuid, setPostsUuid] = useState<PostsUuid | undefined>(undefined);
  useEffect(() => {
    let ignore = false;

    const fetchPostsUuid = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        window.location.href = "./signin";
        return;
      }
      try {
        const response = await axios.get<PostsUuid>(
          "https://honnaka-backend.azurewebsites.net/api/v1/me/posts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!ignore) {
          setPostsUuid(response.data);
          console.log(response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchPostsUuid();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchPost = async (post_uuid: string): Promise<Post> => {
      const response = await axios.get<Post>(
        `https://honnaka-backend.azurewebsites.net/api/v1/post/${post_uuid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    };

    const fetchPosts = async () => {
      if (!postsUuid) {
        return;
      }

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        window.location.href = "./signin";
        return;
      }

      if (!ignore) {
        const data = await Promise.all(
          postsUuid.posts_uuid.map((post_uuid) => fetchPost(post_uuid))
        );

        setPosts(data);
        console.log("posts:", posts);
      }
    };

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, [postsUuid]);

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

  return (
    <div>a</div>
    // <div>
    //   <Header />
    //   <div>
    //     <h1>My page</h1>
    //     <h2>username : {user_name}</h2>
    //     <div>
    //       <Card sx={{ maxWidth: 768 }}>
    //         <CardContent>
    //           <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //             {user_name}
    //           </Typography>
    //           <Typography variant="h5">{title}</Typography>
    //           <Typography variant="body1">{summary}</Typography>
    //           <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //             {since}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MyPage;
