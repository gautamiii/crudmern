import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") && navigate("/");
  }, []);

  const [inpval, setINP] = useState({
    email: "",
    password: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const loggedinpdata = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    console.log("inpval", inpval.email, inpval.password);
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    console.log(data);
    if (data.result === true) {
			localStorage.setItem('token', data.token)
      navigate("/");
    } else {
      Swal.fire("wrong username and password");
    }
  };

  return (
    <div className="container">
      <form className="mt-4" onSubmit={loggedinpdata}>
        <div className="row">
          <div className="mb-3 col-12">
            <label htmlFor="name" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={inpval.email}
              onChange={setdata}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3  col-12">
            <label htmlFor="name" className="form-label">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={inpval.password}
              onChange={setdata}
              className="form-control"
              id="password"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
