import React, { useCallback, useEffect, useState } from "react";
import { FcSynchronize } from "react-icons/fc";
import { GiBrokenHeart } from "react-icons/gi";
import { BsFillHeartFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";
import Logo from "./Logo";
import { useRouter } from "next/router";

type Props = {};

const Main = (props: Props) => {
  const router = useRouter();
  const [randomUser, setRandomUser] = useState<any>();
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      const randomUserData = axios
        .get(`http://localhost:4000/users/getUser/${user.email}`)
        .then((res) => setRandomUser(res.data));
    }
  }, []);

  const handleNext = () => {
    if (window.localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      setUser(user);

      const randomUserData = axios
        .get(`http://localhost:4000/users/getUser/${user.email}`)
        .then((res) => setRandomUser(res.data));
    }
  };
  const handleDislike = async () => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      await axios
        .post("http://localhost:4000/users/interest", {
          id: user.id,
          interest: randomUser?.data[0].email,
        })
        .then((res) => console.log(res));
    }
  };
  const handleLike = async () => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "user");
      await axios
        .post("http://localhost:4000/users/liked", {
          id: randomUser?.data[0]._id,
          name: user.name,
          age: user.age,
          email: user.email,
        })
        .then((res) => console.log(res));
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <>
      {" "}
      <Logo />
      <div className="flex items-center justify-center w-[100vw] h-[70vh]">
        <div className="profile-card  ">
          <div className="profile-card-header">
            <div className="profile-image">
              <img
                src={randomUser?.data[0]?.imgURL}
                alt={randomUser?.data[0]?.imgURL}
              />
            </div>
            <div className="profile-info content-center">
              <h3 className="profile-name font-[DynaPuff]">
                {randomUser?.data[0].firstName +
                  " " +
                  randomUser?.data[0].lastName}
              </h3>
              <p className="profile-desc font-[DynaPuff]">
                I like {randomUser?.data[0].hobby}
              </p>
            </div>
          </div>

          <div className="profile-card-body ">
            <ul className="status flex flex-col gap-2 content-center">
              <li className="flex">
                <div className="status-value font-[DynaPuff] text-red-400">
                  Gender :{" "}
                </div>
                <div className="status-text font-[DynaPuff] text-[#212121]">
                  {randomUser?.data[0].sex}
                </div>
              </li>
              <li className="flex">
                <div className="status-value font-[DynaPuff] text-[#c49a63]">
                  i'm seeking for :{" "}
                </div>
                <div className="status-text font-[DynaPuff] ">
                  {randomUser?.data[0].seekingFor}
                </div>
              </li>
              <li className="flex">
                <div className="status-value font-[DynaPuff] text-[#e46dbe]">
                  Age :{" "}
                </div>
                <div className="status-text font-[DynaPuff] text-[#212121]">
                  {randomUser?.data[0].age}
                </div>
              </li>
              <li className="flex">
                <div className="status-value font-[DynaPuff] text-red-600 ">
                  Email :{" "}
                </div>
                <div className="status-text font-[DynaPuff] text-[#212121]">
                  {randomUser?.data[0].email}
                </div>
              </li>
              <li className="flex">
                <div className="status-value font-[DynaPuff] text-red-600">
                  {randomUser?.data[0]?.liked ? "liked you : " : ""}
                </div>
                <div className="status-text font-[DynaPuff] text-[#212121]">
                  {randomUser?.data[0]?.liked
                    ? randomUser?.data[0]?.liked[0].name
                    : ""}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <button
          className="border rounded-full w-[40px] h-[40px] bg-white"
          onClick={handleNext}
        >
          <FcSynchronize className="content-center m-auto" />
        </button>
        <button
          className="border rounded-full w-[40px] h-[40px] bg-white"
          onClick={handleDislike}
        >
          <GiBrokenHeart className="text-red-600 content-center m-auto " />
        </button>
        <button
          className="border rounded-full w-[40px] h-[40px] bg-white"
          onClick={handleLike}
        >
          <BsFillHeartFill className="text-green-600 content-center m-auto" />
        </button>
        <button className="border rounded-full w-[40px] h-[40px] bg-white">
          <HiOutlineLogout
            className="text-red-600 content-center m-auto "
            onClick={handleLogout}
          />
        </button>
      </div>
      <div className="slider-thumb"></div>
      <div className="slider-thumb1"></div>
      <div className="slider-thumb2"></div>
      <div className="slider-thumb3"></div>
      <div className="heart"></div>
    </>
  );
};

export default Main;
