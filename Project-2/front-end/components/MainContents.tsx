import React, { ReactElement, useEffect, useState } from "react";
import { list } from "../pages/api/api.media";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { HiOutlinePlay } from "react-icons/hi";
import Link from "next/link";
type Props = {};
type User = {
  _id: string | Blob;
  firstName: String;
  lastName: String;
  password: String;
  register: String;
};
const MainContents = (props: Props) => {
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
  const handlerFilter = (e: any) => {
    console.log(e.target.innerText);
    const filter = videos
      .filter(
        (video: any) =>
          video.genre.toLowerCase() == e.target.innerText.toLowerCase()
      )
      .map((v) => v);
    setVideos(filter);
  };
  const genre = ["Animation", "Action", "Comedy", "Adventure"];
  return (
    <div className="container mx-auto mt-8">
      <div>
        {genre.map((e: string, i: number) => (
          <button
            key={i}
            onClick={handlerFilter}
            className="border rounded-full p-2 w-48 ml-2 hover:bg-gradient-to-r from-[#9d0825] to-[#6c012e] hover:text-white"
          >
            {e}
          </button>
        ))}
      </div>
      <div className="gap-2 columns-4 mt-4">
        {videos.map((item: any) => (
          <div className="w-full h-full" key={item._id}>
            <div className="w-[200px] h-[250px] text-white absolute mt-12 ml-[125px] opacity-0 hover:opacity-100">
              <Link href={`mediaplay/${item._id}`}>
                <HiOutlinePlay className="w-[50px] h-[50px]" />
              </Link>
            </div>
            <img src={item.thumbImg} className="rounded"></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContents;
