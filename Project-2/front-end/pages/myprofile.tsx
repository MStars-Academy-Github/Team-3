import MyProfile from "../components/MyProfile";
import React from "react";
import Header from "../components/Header";
type Props = {};

const myprofile = (props: Props) => {
  return (
    <>
      <Header />
      <MyProfile />
    </>
  );
};

export default myprofile;
