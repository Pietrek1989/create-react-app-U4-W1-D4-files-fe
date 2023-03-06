import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      let res = await fetch(`${apiUrl}/articles`);
      if (res.ok) {
        let data = await res.json();
        setData(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row>
      {data.map((singleData) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem
            key={singleData.title}
            {...singleData}
            coverImg={singleData.cover}
          />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
