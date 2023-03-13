import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  username: string;
  password: string;
}

interface MyPageResponse {
  user: User;
  posts: Post[];
}

interface Post {
  title: string;
  content: string;
}

const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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

        const response = await axios.get<MyPageResponse>(
          "https://honnaka-backend.azurewebsites.net/api/v1/mypage",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data.user);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMyPageData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Page</h1>
      <div>
        <h2>{user.username}</h2>
        <p>{user.password}</p>
      </div>
      <div>
        <h2>My Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPage;
