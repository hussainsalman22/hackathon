import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom'
import Button from "react-bootstrap/Button";


// import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {



    if (email == "admin@gmail.com" && password == "admin") {
      navigate("home")


    }
    else {
      alert("password is wrong")
    }

  }

  return (

    <div className="flex items-center justify-center h-screen bg-fit" style={{ backgroundImage: `url('https://covid19.unitedpeople.global/wp-content/uploads/2020/10/Saylani.jpg')` }}>
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            block
            size="lg"
            type="submit"
            disabled={!validateForm()}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

