import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const getToken = () => {
    return localStorage.getItem("token");
  };
  console.log(localStorage.getItem("token"));
  const getStories = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/me/stories`, {
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
  console.log(data.author);
  // const getData = async () => {
  //   try {
  //     const apiUrl = process.env.REACT_APP_BE_URL;
  //     let res = await fetch(`${apiUrl}/articles/${id}`);
  //     if (res.ok) {
  //       let data = await res.json();
  //       setData(data);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    getStories();
    setLoading(false);

    // if (blog) {
    //   setBlog(blog);
    //   setLoading(false);
    // } else {
    //   navigate("/404");
    // }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else if (data) {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={data.cover} fluid />
          <h1 className="blog-details-title">{data.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor author={data.author} />
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></div>

          <div className="blog-details-info align-items-end">
            <div>{data.createdAt}</div>
            <div>
              {`${data.readTime.value && data.readTime.value} ${
                data.readTime.unit && data.readTime.unit
              } read`}
            </div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <BlogLike
                defaultLikes={["123"]}
                articleId={data._id}
                numberOfLikes={data.likes.length}
                onChange={console.log}
              />
            </div>
          </div>
          <div>
            <h3>Comment Section:</h3>
            {data &&
              data.comments.map((comment) => {
                return (
                  <div className="border border-primary">
                    <h6>Title: {comment.title}</h6>
                    <p>Comment: {comment.text}</p>
                  </div>
                );
              })}
          </div>
        </Container>
      </div>
    );
  }
};

export default Blog;
