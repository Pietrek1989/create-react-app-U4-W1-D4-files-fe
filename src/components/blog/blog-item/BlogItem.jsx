import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const stoping = (e) => {
    e.stopPropagation();
  };
  const { title, author, _id } = props;
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={props.coverImg} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor {...author} />
          <a
            onClick={stoping}
            href={`${process.env.REACT_APP_BE_URL}/files/${props.wholeObject.id}/pdf`}
          >
            Get more info here
          </a>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
