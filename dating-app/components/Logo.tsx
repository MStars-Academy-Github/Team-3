import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <div className="logo1">
        <p className="dating ">Dating</p>
        <div className="logoIconHead1"></div>
        <div className="logoIconHead2"></div>
        <AiOutlineHeart className="logoIcon" />
        <p className="web">Web</p>
      </div>
      <div className="logoIconHead"></div>
    </div>
  );
};

export default Logo;
