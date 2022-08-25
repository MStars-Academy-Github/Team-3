import React, { useCallback, useEffect, useState } from "react";
import { FcSynchronize } from "react-icons/fc";
import { GiBrokenHeart } from "react-icons/gi";
import { BsFillHeartFill } from "react-icons/bs";
import { FcFlashOn } from "react-icons/fc";
import axios from "axios";
import Logo from "./Logo";
type Props = {};

const Main = (props: Props) => {
  const [randomUser, setRandomUser] = useState<any>();
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      console.log(user.email);
      const randomUserData = axios
        .get(`http://localhost:4000/users/getUser/${user.email}`)
        .then((res) => setRandomUser(res.data));
    }
  }, []);
  console.log(randomUser);

  const handleNext = () => {
    if (window.localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      setUser(user);
      console.log(user.e);
      const randomUserData = axios
        .get(`http://localhost:4000/users/getUser/${user.email}`)
        .then((res) => setRandomUser(res.data));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e46dbe] to-[#c49a63]">
      <div>
        <div>
          <Logo />
        </div>
        <p className="absolute left-[970px] top-[265px] text-orange-400 rounded-lg  bg-[#000] opacity-0 hover:opacity-75 w-[300px] h-[300px] hover:text-[#fff] hover:bg-text-[#fff]">
          {randomUser?.data[0].firstName}
        </p>
        <div className="w-[350px] h-[350px]  rounded-lg  flex flex-col h-screen mx-auto items-center justify-center">
          <img
            src={randomUser?.data[0].imgURL}
            className="w-[300px] h-[300px] rounded-lg shadow-xl hover:white"
            alt="product image"
          />
        </div>
        <div className="flex flex-row mx-auto items-center justify-center gap-8">
          <button className="border rounded-full w-[40px] h-[40px] bg-white content-center ">
            <FcSynchronize className="content-center m-auto" />
          </button>
          <button className="border rounded-full w-[40px] h-[40px] bg-white ">
            <GiBrokenHeart className="text-red-600 content-center m-auto " />
          </button>
          <button className="border rounded-full w-[40px] h-[40px] bg-white ">
            <BsFillHeartFill className="text-green-600 content-center m-auto " />
          </button>
          <button className="border rounded-full w-[40px] h-[40px] bg-white ">
            <FcFlashOn className="text-red-600 content-center m-auto " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
