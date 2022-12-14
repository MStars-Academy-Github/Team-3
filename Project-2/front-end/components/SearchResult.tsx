import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlinePlay } from "react-icons/hi";
import { list } from "../pages/api/api.media";

type Props = {
  value: string;
};
type Video = {
  _id: string;
  title: string;
  description: string;
  genre: string;
  thumbImg: string;
  views: number;
};
const SearchResult = (props: Props) => {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    (async () => {
      const result = await list();
      setVideos(result);
    })();
  }, []);

  const result = videos.filter((vi) =>
    vi.title.toLowerCase().includes(props.value.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="gap-2 columns-5 mt-4">
        {result.length > 0 ? (
          <div>
            {result.map((item: any) => (
              <div className="pt-4" key={item._id}>
                <div className="text-white absolute mt-12 ml-[125px] opacity-0 hover:opacity-100">
                  <Link href={`mediaplay/${item._id}`}>
                    <HiOutlinePlay className="w-[50px] h-[50px]" />
                  </Link>
                </div>
                <img
                  src={item.thumbImg}
                  alt="image"
                  className="rounded w-[300px] h-[200px]"
                ></img>
              </div>
            ))}
          </div>
        ) : (
          <div>Таны хайсан видео олдсонгүй</div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
