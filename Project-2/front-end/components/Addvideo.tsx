import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import Header from "./Header";
import Layout from "./Layout";
type User = {
  _id: string | Blob;
  firstName: String;
  lastName: String;
  password: String;
  register: String;
};
const Addvideo = () => {
  const [file, setFile] = useState<File>();
  const [uploadPercent, setUploadPercent] = useState(0);
  const [submiting, setSubmit] = useState(false);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);
  console.log(user?._id);
  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    console.log(f);
    if (f?.length) {
      setFile(f[0]);
    }
  };
  const handlerSubmit = async (e: any) => {
    e.preventDefault();
    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent) {
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentComplete);
        setUploadPercent(percentComplete);
      },
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    if (file) {
      formData.append("media", file);
    }
    setSubmit(true);
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("genre", e.target.genre.value);
    formData.append("image", e.target.image.value);
    if (user) {
      formData.append("userId", user._id);
    }

    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/upload`,
          formData,
          config
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("Orj irsen");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
      setUploadPercent(0);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-2/4 xl:w-1/4 mt-20">
        <form
          className="flex flex-col items-center"
          encType="multipart/form-data"
          onSubmit={handlerSubmit}
        >
          <input
            type="file"
            accept=".mp4"
            onChange={handleSetFile}
            name="video"
            className="ml-3"
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-80 h-12 mt-4 rounded-lg shadow-lg p-2"
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="w-80 mt-4 rounded-lg shadow-lg h-12 p-2"
          />
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            className="w-80 mt-4 rounded-lg shadow-lg h-12 p-2"
          />
          <input
            type="text"
            placeholder="Image"
            name="image"
            className="w-80 mt-4 rounded-lg shadow-lg h-12 p-2"
          />
          <div>{submiting && <p>{uploadPercent}%</p>}</div>
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
Addvideo.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Addvideo;
