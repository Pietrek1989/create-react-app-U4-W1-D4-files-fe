import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import axios from "axios";

const NewBlogPost = (props) => {
  // function handleFile(event) {
  //   setFile(event.target.files[0]);
  //   console.log(event.target.files[0]);
  // }
  // const [file, setFile] = useState();

  // const inputRef = useRef(null);
  // const handleClick = () => {
  //   inputRef.current.click();
  // };
  const [image, setImage] = useState(null);
  const [currentAuthor, setAuthor] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const postArticle = async (article) => {
    try {
      console.log(article);
      let res = await fetch("http://localhost:3001/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);

        handleImageUpload(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePost = (e) => {
    e.preventDefault();
    postArticle(article);
  };
  const [article, setArticle] = useState({
    category: "",
    title: "",
    readTime: {
      value: 1,
      unit: "minutes",
    },
    author: "",
    content: "",
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
    setArticle({
      ...article,
      content: html,
    });
  }, [editorState]);
  useEffect(() => {
    getAuthor();
  }, []);
  const getToken = () => {
    return localStorage.getItem("token");
  };

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
  const handleImageUpload = (data) => {
    const url = `http://localhost:3001/files/${data}/articleSingle`;
    const formData = new FormData();
    formData.append("postPic", image);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            onChange={(e) => {
              setArticle({
                ...article,
                title: e.target.value,
                author: currentAuthor._id,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            onChange={(e) => {
              setArticle({
                ...article,
                category: e.target.value,
              });
            }}
          >
            <option>Funny Things</option>
            <option>Interesting Things</option>
            <option>Scary things</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Form.Label className="mb-0 mt-3">Reading Time</Form.Label>
        <div className="d-flex">
          <Form.Group controlId="blog-form" className="mt-3 w-100">
            <Form.Control
              size="lg"
              placeholder="Read Time"
              onChange={(e) => {
                setArticle({
                  ...article,
                  readTime: {
                    ...article.readTime,
                    value: e.target.value,
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3 w-100">
            <Form.Control
              size="lg"
              as="select"
              onChange={(e) => {
                setArticle({
                  ...article,
                  readTime: {
                    ...article.readTime,
                    unit: e.target.value,
                  },
                });
              }}
            >
              <option>seconds</option>
              <option>minutes</option>
              <option>hours</option>
            </Form.Control>
          </Form.Group>
        </div>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            onClick={handlePost}
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
