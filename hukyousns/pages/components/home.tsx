import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import axios from "axios";
import Header from "./header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PostForm from "./modal";

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

interface User {
  user_uuid: string;
  user_name: string;
  display_name: string | undefined;
  created_at: string;
  updated_at: string | undefined;
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

interface Tag {
  tag_uuid: string;
  body: string;
  created_at: string;
  updated_at: string | undefined;
}

interface Location {
  location_uuid: string;
  body: string;
  created_at: string;
  updated_at: string | undefined;
}

interface Image {
  image_uuid: string;
  user_uuid: string;
  body: string;
  created_at: string;
  updated_at: string | undefined;
}

interface Reaction {
  reaction_uuid: string;
  user_uuid: string;
  post_uuid: string;
  like: boolean;
  super_like: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Reactions {
  like: number;
  super_like: number;
}

interface NewReaction {
  like: boolean;
  super_like: boolean;
}

const Home = () => {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [tags, setTags] = useState<Tag[]>([]);
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [reaction, setReaction] = useState<Reaction | undefined>(undefined);
  const [reactions, setReactions] = useState<Reactions | undefined>(undefined);
  const [image, setImage] = useState<Image | undefined>(undefined);

  const handler = (url: Url) => {
    Router.push(url);
  };

  useEffect(() => {
    let ignore = false;

    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          "https://honnaka-backend.azurewebsites.net/api/v1/post"
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
    let ignore = false;

    const fetchUser = async () => {
      if (!post) {
        return;
      }

      try {
        const response = await axios.get<User>(
          `https://honnaka-backend.azurewebsites.net/api/v1/user/${post.user_uuid}`
        );

        if (!ignore) {
          setUser(response.data);
          console.log("user:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchUser();

    return () => {
      ignore = true;
    };
  }, [post]);

  useEffect(() => {
    let ignore = false;

    const fetchTag = async (tag_uuid: string): Promise<Tag> => {
      const response = await axios.get<Tag>(
        `https://honnaka-backend.azurewebsites.net/api/v1/tag/${tag_uuid}`
      );

      return response.data;
    };

    const fetchTags = async () => {
      if (!post) {
        return;
      }

      if (!ignore) {
        const data = await Promise.all(
          post.tags_uuid.map((tag_uuid) => fetchTag(tag_uuid))
        );

        setTags(data);
        console.log("tags:", tags);
      }
    };

    fetchTags();

    return () => {
      ignore = true;
    };
  }, [user]);

  useEffect(() => {
    let ignore = false;

    const fetchLocation = async () => {
      if (!post) {
        return;
      }

      try {
        const response = await axios.get<Location>(
          `https://honnaka-backend.azurewebsites.net/api/v1/location/${post.location_uuid}`
        );

        if (!ignore) {
          setLocation(response.data);
          console.log("location:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchLocation();

    return () => {
      ignore = true;
    };
  }, [tags]);

  useEffect(() => {
    let ignore = false;

    const fetchImage = async () => {
      if (!post) {
        return;
      }
      if (!post.image_uuid) {
        return;
      }

      try {
        const response = await axios.get<Image>(
          `https://honnaka-backend.azurewebsites.net/api/v1/image/${post.image_uuid}`
        );

        if (!ignore) {
          setImage(response.data);
          console.log("location:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchImage();

    return () => {
      ignore = true;
    };
  }, [location]);

  useEffect(() => {
    let ignore = false;

    const fetchReaction = async () => {
      if (!post) {
        return;
      }

      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          window.location.href = "./signin";
          return;
        }

        const response = await axios.get<Reaction>(
          `https://honnaka-backend.azurewebsites.net/api/v1/me/reaction/${post.post_uuid}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!ignore) {
          setReaction(response.data);
          console.log("reaction:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchReaction();

    return () => {
      ignore = true;
    };
  }, [image]);

  useEffect(() => {
    let ignore = false;

    const fetchReactions = async () => {
      if (!post) {
        return;
      }

      try {
        const response = await axios.get<Reactions>(
          `https://honnaka-backend.azurewebsites.net/api/v1/post/${post.post_uuid}/reactions`
        );

        if (!ignore) {
          setReactions(response.data);
          console.log("reaction:", response.data);
        }
      } catch (e) {
        console.log(`Exception: ${e}`);
      }
    };

    fetchReactions();

    return () => {
      ignore = true;
    };
  }, [reaction]);

  const get_user_name = () => {
    let user_name = "";

    if (user) {
      user_name = user.user_name;
      if (user.display_name) {
        user_name = user.display_name;
      }
    }

    return user_name;
  };

  const get_title = () => {
    let title = "";

    if (post) {
      title = post.title;
    }

    return title;
  };

  const get_summary = () => {
    let summary = "";

    if (post) {
      if (post.summary) {
        summary = post.summary;
      }
    }

    return summary;
  };

  const get_tags = () => {
    let body = "";

    if (tags) {
      for (let i = 0; i < tags.length - 1; i++) {
        body += tags[i].body + ", ";
      }
      if (tags.length != 0) {
        body += tags[tags.length - 1].body;
      }
    }

    return body;
  };

  const get_website = () => {
    let website = "";

    if (post) {
      if (post.website) {
        website = post.website;
      }
    }

    return website;
  };

  const get_created_at = () => {
    let created_at = "";

    if (post) {
      if (!post.updated_at) {
        created_at = post.created_at.toLocaleString("ja-JP");
      } else {
        created_at = post.updated_at.toLocaleString("ja-JP");
      }
    }

    return created_at;
  };

  const get_location_and_since = () => {
    let location_and_since = "";

    if (post) {
      if (location && post.since) {
        location_and_since = `これは${location.body}で行うことが多く、${post.since}から継続しています。`;
      } else if (location) {
        location_and_since = `これは${location.body}で行うことが多いです。`;
      } else if (post.since) {
        location_and_since = `${post.since}から継続しています。`;
      }
    }

    return location_and_since;
  };

  const get_body = () => {
    let body = "";

    if (post) {
      body = post.body;
    }

    return body;
  };

  const get_image = () => {
    if (image) {
      if (image.body != "") {
        return <CardMedia sx={{ height: 384 }} image={image.body}></CardMedia>;
      }
    }

    return;
  };

  const get_like = (like: boolean | undefined) => {
    if (like) {
      return <FavoriteIcon color="secondary" />;
    }
    return <FavoriteBorderIcon color="secondary" />;
  };

  const get_super_like = (super_like: boolean | undefined) => {
    if (super_like) {
      return <StarIcon color="warning" />;
    }
    return <StarBorderIcon color="warning" />;
  };

  const get_likes = (likes: number | undefined) => {
    if (likes) {
      return likes;
    }
    return 0;
  };

  const get_super_likes = (super_likes: number | undefined) => {
    if (super_likes) {
      return super_likes;
    }
    return 0;
  };

  const fetchReaction = async () => {
    if (!post) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        window.location.href = "./signin";
        return;
      }

      const response = await axios.get<Reaction>(
        `https://honnaka-backend.azurewebsites.net/api/v1/me/reaction/${post.post_uuid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setReaction(response.data);
      console.log("reaction:", response.data);
    } catch (e) {
      console.log(`Exception: ${e}`);
    }
  };

  const fetchReactions = async () => {
    if (!post) {
      return;
    }

    try {
      const response = await axios.get<Reactions>(
        `https://honnaka-backend.azurewebsites.net/api/v1/post/${post.post_uuid}/reactions`
      );

      setReactions(response.data);
      console.log("reaction:", response.data);
    } catch (e) {
      console.log(`Exception: ${e}`);
    }
  };

  const handle_like = async () => {
    if (!post) {
      return;
    }

    let like = true;
    let super_like = false;
    if (reaction) {
      like = !reaction.like;
      super_like = reaction.super_like;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        window.location.href = "./signin";
        return;
      }

      const response = await axios.post<NewReaction>(
        `https://honnaka-backend.azurewebsites.net/api/v1/post/${post.post_uuid}/reaction`,
        {
          like,
          super_like,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log(`Exception: ${e}`);
    }

    fetchReaction();
    fetchReactions();
  };

  const handle_super_like = async () => {
    if (!post) {
      return;
    }

    let like = false;
    let super_like = true;
    if (reaction) {
      like = reaction.like;
      super_like = !reaction.super_like;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        window.location.href = "./signin";
        return;
      }

      const response = await axios.post(
        `https://honnaka-backend.azurewebsites.net/api/v1/post/${post.post_uuid}/reaction`,
        {
          like,
          super_like,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log(`Exception: ${e}`);
    }

    fetchReaction();
    fetchReactions();
  };

  const handle_next = () => {
    window.location.href = "./home";
  };

  return (
    <div>
      <Header />
      <div style={styles.cardContainer}>
        <Card sx={{ maxWidth: 768, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          {get_image()}
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {get_user_name()}
            </Typography>
            <Typography variant="h5">{get_title()}</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {get_created_at()}
            </Typography>
            <Typography variant="body1">{get_summary()}</Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              <LocalOfferIcon />
              {get_tags()}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              <LanguageIcon />
              <Link href={get_website()}>{get_website()}</Link>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {get_location_and_since()}
            </Typography>
            <Typography variant="body1">{get_body()}</Typography>
          </CardContent>
          <CardActions>
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
          </CardActions>
        </Card>
      </div>
      <PostForm />
    </div>
  );
};

export default Home;
