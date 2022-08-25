import Main from "../components/Main";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
type Props = {};

const main = (props: Props) => {
  return <div>{<Main />}</div>;
};

export default main;
// main.getInitialProps = async (ctx: any) => {
//   const res = await axios.post("http://localhost:4000/users/getUser", {
//     email: user.email,
//     token: user.token,
//   });
//   return { res };
// };
