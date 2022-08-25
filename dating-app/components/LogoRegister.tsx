import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

type Props = {};

const LogoRegister = (props: Props) => {
  return (
    <div>
      <div className="logo">
        <p className="dating ">Dating</p>
        <AiOutlineHeart className="logoIcon" />
        <p className="web">Web</p>
      </div>
      <div className="logoIconHead"></div>
    </div>
  );
};

export default LogoRegister;
