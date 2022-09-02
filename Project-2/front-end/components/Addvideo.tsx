import axios from "axios";
import React, { useState } from "react";

type Props = {};

const Addvideo = (props: Props) => {
  const [files, setFiles] = useState<any>();
  const handleSetFile = (e: any) => {
    const files = e.target.files;
    if (files?.length) {
      setFiles(files[0]);
    }
  };
  const handlerSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("media", files);
    console.log(formData);
    try {
      await axios.post("http://localhost:4000/v1/media/upload", formData);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(files);
  return (
    <div className="container mx-auto">
      <form className="flex flex-col items-center" onSubmit={handlerSubmit}>
        <input
          type="file"
          accept=".mp4"
          onChange={handleSetFile}
          name="video"
        />
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Genre" />
        <button
          type="submit"
          className="block bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Addvideo;
