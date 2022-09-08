import axios from "axios";
import Link from "next/link";

import React, { useEffect, useState } from "react";

import { list } from "../pages/api/api.media";

type User = {
  _id: string | Blob;
  firstName: String;
  lastName: String;
  password: String;
  register: String;
};
type Videos = {
  _id: string | any;
  title: string;
  description: string;
  genre: string;
  thumbImg: string;
  views: number;
};
type Props = {
  id: string[] | undefined | string;
};
const MyProfile = (props: Props) => {
  const [videos, setVideos] = useState<Videos[]>([]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      (async () => {
        const result = await list();
        setVideos(result);
      })();
    }
  }, []);

  const handleDelete = async (e: string) => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/delete/${e}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("Orj irsen");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div className=" flex mt-4 container content-center mx-auto justify-between flex-wrap">
      {videos &&
        videos?.map((item: Videos, i: any) => (
          <div key={i}>
            <Link href={`mediaplay/${item._id}`}>
              <img
                src={item.thumbImg}
                alt="img"
                className="rounded w-[300px] h-[200px]"
              ></img>
            </Link>
            <div className="flex flex-row justify-around mb-4">
              <Link href={`/update/${item._id}`}>
                <button className="bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4">
                  Update
                </button>
              </Link>
              <button
                className="bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4"
                onClick={() => handleDelete(item._id)}
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
