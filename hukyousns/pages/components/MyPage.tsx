import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  user_uuid: "string";
  user_name: "string";
  display_name: "string";
  created_at: "string";
  updated_at: "string";
}
const API_ENDPOINT = "https://honnaka-backend.azurewebsites.net/api/v1/me";

async function getUserInfo(): Promise<User> {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.get(API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

const MyPage = () => {
  const [username, setUsername] = useState<string>("");
  const [myUser, setMyUser] = useState<User | null>(null);
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

  return (
    <div>
      <h1>My Page</h1>
      <div>
        <h2>{myUser.user_name}</h2>
      </div>
      {/* <div>
        <h2>My Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default MyPage;
