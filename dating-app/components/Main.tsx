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
    <div className="">
      {/* <Logo /> */}

      <div className="flex flex-row">
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-image">
              <img
                src={randomUser?.data[0]?.imgURL}
                alt={randomUser?.data[0]?.imgURL}
              />
            </div>

            <div className="profile-info">
              <h3 className="profile-name">Dev Ed</h3>
              <p className="profile-desc">Developer/Conent Creator</p>
            </div>
          </div>

          <div className="profile-card-body">
            <ul className="status">
              <li>
                <span className="status-value">532</span>
                <span className="status-text">Posts</span>
              </li>

              <li>
                <span className="status-value">1.5m</span>
                <span className="status-text">Followers</span>
              </li>

              <li>
                <span className="status-value">423</span>
                <span className="status-text">Following</span>
              </li>
            </ul>

            <div className="action">
              <button className="btn btn-pink">Follow</button>
              <button className="btn btn-gray-outline">Message</button>
            </div>
          </div>
        </div>

        <div className="flex mx-auto items-center justify-center gap-8">
          <button className="border rounded-full w-[40px] h-[40px] bg-white content-center hover: ">
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
      <div className="slider-thumb"></div>
      <div className="slider-thumb1"></div>
      <div className="slider-thumb2"></div>
    </div>
  );
};

export default Main;
