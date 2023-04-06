import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./loginStyles.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const logIn = async (formValues) => {
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${apiUrl}/authors/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.newAuthor);
        const handleImageUpload = () => {
          const url = `http://localhost:3001/files/${data.newAuthor._id}/authorSingle`;
          const formData = new FormData();
          formData.append("avatar", image);
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
        handleImageUpload();
      } else {
        console.error("Error logging in:");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(formValues);
    navigate("/login");
    // Handle form submission
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
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
        <Form.Group controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
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
        <Form.Group>
          <Form.Label>Cover</Form.Label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Button className="mt-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
