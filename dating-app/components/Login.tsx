import React, { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Logo from "../components/Logo";

type Props = {};

const Login = (props: Props) => {
  const [error, setError] = useState();
  const [local, setLocal] = useState();
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.username.value;
    const password = e.target.password.value;
    axios
      .post("http://54.183.182.201:4000/users/login", { email, password })
      .then((res) => {
        if (res.data.success === true) {
          router.push("/main");
          const user = {
            email: res.data.email,
            id: res.data.id,
            name: res.data.name,
            age: res.data.age,
            token: res.data.token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setLocal(res.data.message);
          router.push("/main");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    // bg-gradient-to-r from-[#e46dbe] to-[#c49a63]
    <div className="flex items-center justify-center h-screen">
      <div className="ml-200px">
        <Logo />
      </div>
      <div className="w-full bg-[url('https://media3.giphy.com/media/4N1wOi78ZGzSB6H7vK/giphy.gif?cid=ecf05e47hoedf6xnhy5u599gjvr9a14xn2zl2mrbzvn3pn4k&rid=giphy.gif&ct=g' )]">
        <h2 className="text-center text-dark-400  font-bold text-2xl uppercase mb-10 font-[DynaPuff]">
          Please Login Dating App
        </h2>
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-2/4 xl:w-1/4">
          <form action="form" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="Password"
                className="block mb-2 font-bold text-gray-600"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                placeholder="Password"
                className="border border-red-300 shadow p-3 w-full rounded mb-"
              />
              <p
                className="flex justify-end text-sm text-red-400 mt-2 hover:underline"
                onClick={handleRegister}
              >
                REGISTER
              </p>
              <pre className="text-sm text-red-400 mt-2">
                {JSON.stringify(error)}
              </pre>
              <pre className="text-sm text-red-400 mt-2">
                {JSON.stringify(local)}
              </pre>
            </div>

            <button
              type="submit"
              className="block w-full bg-gradient-to-r from-[#e46dbe] to-[#c49a63] text-white font-bold p-4 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
