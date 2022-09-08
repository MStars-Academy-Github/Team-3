import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiHome2Fill } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
const Header = () => {
  const [user, setUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);
  const handlerOut = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  const handleClick = () => {
    router.push(`/myprofile`);
  };
  const handlerSearch = (e: any) => {
    e.preventDefault();
    console.log(e.target.search.value);
    router.push(`/search/${e.target.search.value}`);
  };
  return (
    <div className="container mx-auto flex justify-between bg-gradient-to-r from-[#9d0825] to-[#6c012e] h-14 items-center text-slate-50 font-medium">
      <div className="ml-4 flex items-center">
        <Link href={"/main"}>MEDIA STREAM</Link>
        <div>
          <RiHome2Fill className="ml-2" />
        </div>
      </div>
      <div>
        <form className="flex items-center" onSubmit={handlerSearch}>
          <input
            type="text"
            name="search"
            className="text-black w-80 rounded"
          />
          <button className="absolute ml-[300px]" type="submit">
            <BsSearch className="text-black" />
          </button>
        </form>
      </div>
      <div className="flex mr-4">
        <div className="mr-5 flex items-center">
          <div>
            <TiPlus />
          </div>
          <button
            onClick={() => {
              router.push("/addvideo");
            }}
          >
            ADD MEDIA
          </button>
        </div>
        <div className="mr-5">
          <button onClick={handleClick}>EDIT VIDEO</button>
        </div>
        {user ? (
          <div className="mr-2">
            <button onClick={handlerOut}>SIGN OUT</button>
          </div>
        ) : (
          <div className="mr-2">
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              SIGN IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
