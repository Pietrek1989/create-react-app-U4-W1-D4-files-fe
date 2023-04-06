import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  // const { name, avatar } = props;
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   try {
  //     const apiUrl = process.env.REACT_APP_BE_URL;
  //     let res = await fetch(`${apiUrl}/authors/${props.author}`);
  //     if (res.ok) {
  //       let data = await res.json();
  //       setData(data);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log(props.author);
  return (
    <Row>
      <Col xs={2}>
        <Image
          className="blog-author"
          src={props.author.avatar}
          roundedCircle
          alt="avatar"
        />
      </Col>
      <Col className="">
        <div>by</div>
        <h6>{props.author.name}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
