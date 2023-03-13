import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import Router from "next/router";
import React from "react";
import Header from "./header";

const homePage = () => {
  const handler = (path: Url) => {
    Router.push(path);
  };
  return (
    <div>
      <Header />
      <Button variant="contained" component="label" color="inherit">
        Shuffle!!
      </Button>
      <Button
        variant="contained"
        component="label"
        color="inherit"
        onClick={() => handler("./MyPage")}
      >
        Mypage
      </Button>
    </div>
  );
};

export default homePage;

//魚拓
// import { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   TextField,
//   Button,
// } from "@mui/material";

// type Tweet = {
//   id: number;
//   content: string;
//   timestamp: Date;
// };

// const initialTweets: Tweet[] = [];

// export default function Twitter() {
//   const [tweets, setTweets] = useState<Tweet[]>(initialTweets);
//   const [tweetText, setTweetText] = useState("");

//   const handleTweetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const newTweet: Tweet = {
//       id: tweets.length + 1,
//       content: tweetText,
//       timestamp: new Date(),
//     };

//     setTweets([...tweets, newTweet]);
//     setTweetText("");
//   };

//   return (
//     <Card>
//       <CardHeader title="Twitter" />
//       <CardContent>
//         <form onSubmit={handleTweetSubmit}>
//           <TextField
//             label="What's happening?"
//             multiline
//             fullWidth
//             value={tweetText}
//             onChange={(event) => setTweetText(event.target.value)}
//           />
//           <Button variant="contained" color="primary" type="submit">
//             Tweet
//           </Button>
//         </form>

//         {tweets.map((tweet) => (
//           <Card key={tweet.id} sx={{ mt: 2 }}>
//             <CardContent>
//               <div>{tweet.content}</div>
//               <div>{tweet.timestamp.toLocaleString()}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }
