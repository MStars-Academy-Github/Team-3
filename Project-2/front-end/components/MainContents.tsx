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
  const genre = ["All", "Animation", "Action", "Comedy", "Adventure"];
  const [videos, setVideos] = useState([]);
  const [temp, setTempe] = useState<any[]>(videos ? videos : []);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
    }
    (async () => {
      const result = await list();
      setVideos(result);
    })();
  }, []);

  const handlerFilter = (e: any) => {
    let filter = [];
    const sortToGenre = videos.filter(
      (vi: any) => vi.genre.toLowerCase() == e.target.innerText.toLowerCase()
    );
    filter.push(sortToGenre);
    setTempe(filter);
    if (e.target.innerText === "All") {
      setTempe([]);
      setVideos(videos);
    }
  };
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

      {temp.length > 0 ? (
        <div className="gap-2 columns-5 mt-4">
          {temp[0].map(
            (item: {
              _id: React.Key | null | undefined;
              thumbImg: string | undefined;
            }): any => (
              <div className="w-full h-full" key={item._id}>
                <div className="w-[200px] h-[250px] text-white absolute mt-12 ml-[125px] opacity-0 hover:opacity-100">
                  <Link href={`mediaplay/${item._id}`}>
                    <HiOutlinePlay className="w-[50px] h-[50px]" />
                  </Link>
                </div>
                <img src={item.thumbImg} className="rounded"></img>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="gap-2 columns-5 mt-4">
          {videos.map((item: any) => (
            <div className="pt-4" key={item._id}>
              <div className="text-white absolute mt-12 ml-[125px] opacity-0 hover:opacity-100">
                <Link href={`mediaplay/${item._id}`}>
                  <HiOutlinePlay className="w-[50px] h-[50px]" />
                </Link>
              </div>
              <img
                src={item.thumbImg}
                className="rounded w-[300px] h-[200px]"
              ></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContents;
