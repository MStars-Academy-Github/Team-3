import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className=" min-h-screen flex items-center bg-gradient-to-r from-[#e46dbe] to-[#c49a63] ">
      <div className="w-full">
        <h2 className="text-center text-blue-400  font-bold text-2xl uppercase mb-10">
          Please Login
        </h2>
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <form action="">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                id="twitter"
                name="twitter"
                placeholder="Password"
                className="border border-red-300 shadow p-3 w-full rounded mb-"
              />
              <p className="text-sm text-red-400 mt-2">
                Username password is required
              </p>
            </div>

            <button className="block w-full bg-gradient-to-r from-[#e46dbe] to-[#c49a63] text-white font-bold p-4 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
