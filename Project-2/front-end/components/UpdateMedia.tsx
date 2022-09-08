import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  id: string[] | undefined | string;
};
type Videos = {
  _id: string | any;
  title: string;
  description: string;
  genre: string;
  thumbImg: string;
  views: number;
};
const UpdateMedia = (props: Props) => {
  //   console.log(props);
  const [video, setVideo] = useState<Videos>();
  const handlerSubmit = (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const genre = e.target.genre.value;
    const thumbImg = e.target.image.value;
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/update/${props.id}`,
          {
            title: title,
            description: description,
            genre: genre,
            thumbImg: thumbImg,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      return error;
    }
  };

  //   try {
  //     axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/media/by/${props.id}`
  //       )
  //       .then((res) => {
  //         setVideo(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {}

  //   console.log(video && video);

  const genre = ["Animation", "Action", "Comedy", "Adventure", "Documentary"];
  return (
    <div className="container mx-auto">
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-2/4 xl:w-1/4 mt-20">
        <form
          className="flex flex-col items-center"
          encType="multipart/form-data"
          onSubmit={handlerSubmit}
        >
          <label htmlFor="for">Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="w-80 h-12 mt-4 rounded-lg shadow-lg p-2"
          />
          <label htmlFor="for">Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="w-80 mt-4 rounded-lg shadow-lg h-12 p-2"
          />
          <label htmlFor="for">Genre</label>
          <select
            id="countries"
            name="genre"
            className="w-80 mt-4 rounded-lg shadow-lg h-12 p-2"
          >
            {genre.map((item, i) => {
              {
                return (
                  <option key={i} placeholder="choose genre">
                    {item}
                  </option>
                );
              }
            })}
          </select>
          <label htmlFor="for">Image URL</label>
          <input
            type="text"
            placeholder="Image"
            name="image"
            className="w-80 mt-4 rounded-lg shadow-lg h-12 p-2"
          />

          <button
            type="submit"
            className="block bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedia;
