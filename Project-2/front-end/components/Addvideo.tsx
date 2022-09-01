import React from "react";

type Props = {};

const Addvideo = (props: Props) => {
  const handleSetFile = () => {};
  return (
    <div className="container mx-auto">
      <form className="flex flex-col items-center ">
        <input type="file" accept=".mp4" onChange={handleSetFile} />
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Genre" />
        <button className="block bg-gradient-to-r from-[#9d0825] to-[#6c012e] text-white font-bold p-2 rounded-lg mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addvideo;
