import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Register() {
  const router = useRouter();
  const handleRegister = (e: any) => {
    console.log(e);
    e.preventDefault();
    axios
      .post("http://localhost:3001/v1/users", {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        register: e.target.registerNumber.value,
        password: e.target.confirmedPassword.value,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/main");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen  flex flex-col items-center ">
      <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10 mt-10"></h2>
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 xl:w-1/4 mt-10">
        <form action="form" onSubmit={(e) => handleRegister(e)}>
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
                name="firstName"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                placeholder="First name"
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
                name="lastName"
                className="border border-gray-300 shadow p-3 w-full rounded mb-"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="Age" className="block mb-2 font-bold text-gray-600">
              Phone number
            </label>
            <input
              type="number"
              name="phone"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              placeholder="Утасны дугаараа оруулна уу"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Age" className="block mb-2 font-bold text-gray-600">
              Register number
            </label>
            <input
              name="registerNumber"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
              placeholder="Регистерийн дугаараа оруулна уу"
              required
            />
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
              name="email"
              className="border border-gray-300 shadow p-3 w-full rounded"
              placeholder="example@gmail.com"
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
              name="password"
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
              name="confirmedPassword"
              required
            />
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
