import React from "react";
import { FcBusinessman } from "react-icons/Fc";
import { FcBusinesswoman } from "react-icons/Fc";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center">
      <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10 mt-10">
        Please register our dating app
      </h2>
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
        <form action="">
          <div className="mb-5">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 font-bold text-gray-600"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                placeholder="Sumiya"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 font-bold text-gray-600"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                placeholder="Batulzii"
                required
              />
            </div>
            <div className=" mt-1 flex flex-col items-center justify-center">
              <label
                htmlFor="gender"
                className="block mb-2 font-bold text-gray-600"
              >
                Gender
              </label>

              <div className="flex">
                <input type="radio" name="gender" required />
                <label htmlFor="male" className="block font-bold text-gray-600">
                  <FcBusinessman className="w-6 h-6 " />
                </label>
                <input type="radio" name="gender" required />
                <label
                  htmlFor="female"
                  className="block font-bold text-gray-600"
                >
                  <FcBusinesswoman className="w-6 h-6 " />
                </label>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-gray-600">
              Hobbies
            </label>
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="button"
                className="border border-gray-300 shadow p-3 rounded mb-"
                placeholder="Basketball"
                required
              />
              <label htmlFor="">Basketball</label>
              <input
                type="checkbox"
                id="button"
                className="border border-gray-300 shadow p-3 rounded mb-"
                required
              />
              <label htmlFor="">Football</label>
              <input
                type="checkbox"
                id="button"
                className="border border-gray-300 shadow p-3 rounded mb-"
                required
              />
              <label htmlFor="">Vollyball</label>
              <input
                type="checkbox"
                id="button"
                className="border border-gray-300 shadow p-3 rounded mb-"
                required
              />
              <label htmlFor="">Reading book</label>
            </div>
          </div>
          <div className="mt-1 flex flex-col items-center">
            <label htmlFor="gender" className="block font-bold text-gray-600 ">
              Seeking for
            </label>
            <div className="flex justify-between">
              <input type="radio" name="gender" required />
              <label htmlFor="male" className="block font-bold text-gray-600">
                <FcBusinessman className="w-6 h-6 " />
              </label>
              <input type="radio" name="gender" required />
              <label
                htmlFor="female"
                className="block font-bold  text-gray-600"
              >
                <FcBusinesswoman className="w-6 h-6 " />
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-gray-600"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className="block mb-2 font-bold text-gray-600"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              placeholder="•••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
