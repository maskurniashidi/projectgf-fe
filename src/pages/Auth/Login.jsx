import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);
    var data = JSON.stringify({
      username: username,
      password: password,
    });

    var config = {
      method: "post",
      url: "https://maskurtesting.site/public/api/login",
      // url: "http://127.0.0.1:8000/api/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast("Login Berhasil", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        localStorage.setItem("TOKEN", response.data.token);
        localStorage.setItem("USER", JSON.stringify(response.data.user));
        history.push("/app");
      })
      .catch(function (error) {
        // validation
        setLoading(false);
        if (error.response.status === 401) {
          toast.warn("login gagal, periksa username dan password anda", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          alert("error tidak diketahui");
        }
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src={ImageLight} alt="Office" />
            <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src={ImageLight} alt="Office" />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Username</span>
                <Input className="mt-1" type="email" placeholder="Your username" onChange={(e) => setUsername(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="***************" />
              </Label>

              <Button className="mt-4" block onClick={handleLogin}>
                {!loading ? "Log in" : "Loading..."}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
