import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { HiOutlinePlay } from "react-icons/hi";
import { list } from "../pages/api/api.media";
import Header from "./Header";
import Layout from "./Layout";
type User = {
  _id: string | Blob;
  firstName: String;
  lastName: String;
  password: String;
  register: String;
};

type Props = {
  id: string[] | undefined | string;
};
const MyProfile = (props: Props) => {
  const [user, setUser] = useState<User>();

  const [videos, setVideos] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      (async () => {
        const result = await list({ userId: user._id });
        setVideos(result);
      })();
    }
  }, []);

  // const handlerSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     await axios
  //       .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/allvideo`)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status === 200) {
  //           console.log("Orj irsen");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };
  const handleUpdate = () => {};

  const id = videos.map((e:any)=>{
    return e._id
  })
  const handleDelete = () => {axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/delete`,{_id:id}).then((res)=>{
    console.log(res);
    if(res.status===200){
      console.log("Orson");
    }
    
  });

  const genre = ["Animation", "Action", "Comedy", "Adventure", "Documentary"];

  return (
    <div className=" flex mt-4 container content-center mx-auto justify-between flex-wrap">
      {videos.map((item: any, i: any) => (
        <div key={i}>
          <Link href={`mediaplay/${item._id}`}>
            <img
              src={item.thumbImg}
              className="rounded w-[300px] h-[200px]"
            ></img>
          </Link>
          <div className="flex flex-row justify-around mb-4">
            <button
              className="bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProfile;
