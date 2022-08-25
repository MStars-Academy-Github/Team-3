import React, { useCallback, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import axios from "axios";

type Props = {};

const Main = (props: Props) => {
  const [randomUser, setRandomUser] = useState<any>();
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      setUser(user);
      console.log(user.data);
      const randomUserData = axios
        .get(`http://localhost:4000/users/getUser/${user.data}`)
        .then((res) => setRandomUser(res.data));
    }
  }, []);
  console.log(randomUser);

  const handleNext = () => {
    if (window.localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      setUser(user);
      console.log(user.data);
      const randomUserData = axios
        .get(`http://localhost:4000/users/getUser/${user.data}`)
        .then((res) => setRandomUser(res.data));
    }
  };

  return (
    <div className="bg-gradient-to-r grid place-items-center h-screen from-[#e46dbe] to-[#c49a63]  ">
      <div className="place-items-center gap-10 h-screen flex">
        <a
          href="#"
          className="text-black bg-gradient-to-l from-[#db5576] to-[#e2d73a] h-10 hover:bg-gradient-to-r focus:ring-2 focus:outline-none focus:ring-[#db5576] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          BACK
        </a>
        <div className="w-full m-auto justify-center items-center max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src={randomUser?.data[0].imgURL}
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight mb-3 text-gray-900 dark:text-white">
                {randomUser?.data[0].firstName}
              </h5>
            </a>

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {randomUser?.data[0].age}
              </span>
              <a
                href="#"
                className="text-black bg-gradient-to-l from-[#db5576] to-[#e2d73a] h-10 hover:bg-gradient-to-r focus:ring-2 focus:outline-none focus:ring-[#db5576] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Like
              </a>
              <a
                href="#"
                className="text-white bg-gradient-to-l from-[#db5576] to-[#e2d73a] h-10 hover:bg-gradient-to-r focus:ring-2 focus:outline-none focus:ring-[#db5576] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                <FcLike className="w-10 h-5" />
              </a>
              <a
                href="#"
                className="text-white bg-gradient-to-l from-[#db5576] to-[#e2d73a] h-10 hover:bg-gradient-to-r focus:ring-2 focus:outline-none focus:ring-[#db5576] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                <FcDislike className="w-10 h-5" />
              </a>
            </div>
          </div>
        </div>
        <a
          href="#"
          onClick={handleNext}
          className="text-black bg-gradient-to-l from-[#db5576] to-[#e2d73a] h-10 hover:bg-gradient-to-r focus:ring-2 focus:outline-none focus:ring-[#db5576] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          NEXT
        </a>
      </div>
    </div>
  );
};

export default Main;
