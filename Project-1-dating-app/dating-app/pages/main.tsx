import Main from "../components/Main";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
type Props = {};

const main = (props: Props) => {
  return <div>{<Main />}</div>;
};

export default main;
