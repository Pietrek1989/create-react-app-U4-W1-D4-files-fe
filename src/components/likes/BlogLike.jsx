import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "react-bootstrap";
const yourUserId = "123";
export default function BlogLike({
  defaultLikes,
  onChange,
  numberOfLikes,
  articleId,
}) {
  const [likes, setLikes] = useState(defaultLikes);
  const iLikedThisArticle = likes.includes(yourUserId);
  const toggleLike = () => {
    if (iLikedThisArticle) {
      setLikes(likes.filter((id) => id !== yourUserId));
    } else {
      setLikes([...likes, yourUserId]);
    }
    onChange && onChange(likes);
  };

  // const postLike = async () => {
  //   try {
  //     const like = {
  //       likes: articleId,
  //     };
  //     console.log(like);
  //     const apiUrl = process.env.REACT_APP_BE_URL;
  //     let res = await fetch(`${apiUrl}/articles/${articleId}/likes`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: JSON.stringify(like),
  //     });
  //     if (res.ok) {
  //       console.log(like);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    onChange && onChange(likes);
  }, [iLikedThisArticle]);
  return (
    <div>
      <Button
        onClick={toggleLike}
        variant={iLikedThisArticle ? "dark" : "dark-outline"}
      >
        <AiOutlineLike /> {`${likes.length}  like`}
      </Button>{" "}
    </div>
  );
}
