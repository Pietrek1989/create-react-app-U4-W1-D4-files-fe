import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./loginStyles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const logIn = async (formValues) => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/authors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        console.log(data.accessToken);
      } else {
        console.error("Error logging in:");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //   const handleLoginGoogle = async () => {
  //     const response = await fetch("http://localhost:3001/authors/googleLogin");
  //     const { url } = await response.json();
  //     setToken(url);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(formValues);
    navigate("/");
    // Handle form submission
  };
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      id="login-form"
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </Form.Group>

        <Button className="my-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <a href={"http://localhost:3001/authors/googleLogin"}>
        <button
          id="google-button"
          //   onClick={handleLoginGoogle}
        >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google logo"
            style={{ marginRight: "10px" }}
          />
          <span>Log in with Google</span>
        </button>
      </a>
    </div>
  );
};

export default LogInPage;
