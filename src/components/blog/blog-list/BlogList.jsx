import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { useNavigate } from "react-router-dom";

const BlogList = (props) => {
  const [data, setData] = useState([]);
  const [currentAuthor, setAuthor] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getStories();

    handleTokenCheck();
    getAuthor();
  }, []);
  useEffect(() => {
    getStories();
  }, [currentAuthor, localStorage]);
  const getToken = () => {
    return localStorage.getItem("token");
  };
  console.log(localStorage.getItem("token"));
  const getStories = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/authors/me/stories`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
        console.log(data);
      } else {
        console.error("Error getting stories:");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleTokenCheck = () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      navigate("/");
    } else {
      getToken();
      console.log("Access token not found in URL");
    }
  };
  // const getData = async () => {
  //   try {
  //     const apiUrl = process.env.REACT_APP_BE_URL;
  //     let res = await fetch(`${apiUrl}/articles`);
  //     if (res.ok) {
  //       let data = await res.json();
  //       setData(data.articles);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAuthor = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/authors/me/info`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAuthor(data);
        console.log(data);
      } else {
        console.error("Error getting stories:");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>
        {currentAuthor.name
          ? `Nice to see you back ${currentAuthor.name}! Here are all your POSTS`
          : `Log in to see your posts!`}
      </h2>

      <Row>
        {data &&
          data.map((singleData) => (
            <Col
              md={4}
              key={singleData._id}
              style={{
                marginBottom: 50,
              }}
            >
              <BlogItem
                key={singleData.title}
                {...singleData}
                coverImg={singleData.cover}
                wholeObject={singleData}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default BlogList;
