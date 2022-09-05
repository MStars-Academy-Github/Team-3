import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
type Props = {};

const Addvideo = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [uploadPercent, setUploadPercent] = useState(0);
  const [submiting, setSubmit] = useState(false);
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
    try {
      await axios
        .post("http://localhost:3002/v1/media/upload", formData, config)
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
  console.log(uploadPercent);
  return (
    <div className="container mx-auto">
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-2/4 xl:w-1/4">
        <div>{submiting && <p>{uploadPercent}%</p>}</div>
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
          />
          <input type="text" placeholder="Title" name="title" />
          <input type="text" placeholder="Description" name="description" />
          <input type="text" placeholder="Genre" name="genre" />
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

export default Addvideo;
