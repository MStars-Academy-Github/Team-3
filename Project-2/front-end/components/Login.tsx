import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
const Login = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.username.value);
    console.log(e.target.password.value);
    axios
      .post("http://localhost:3000/v1/auth/login", {
        email: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full">
        <h2 className="text-center text-dark-400  font-bold text-2xl uppercase mb-10 font-[DynaPuff]">
          Please Login Video Streaming app
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
                type="password"
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
            </div>

            <button
              type="submit"
              className="block w-full bg-gradient-to-r from-[#e46dbe] to-[#c49a63] text-white font-bold p-4 rounded-lg"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
