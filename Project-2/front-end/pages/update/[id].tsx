import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import MyProfile from "../../components/MyProfile";
import { mediaGetById } from "../../pages/api/api.media";
type Props = {};

const myprofile = (props: Props) => {
  const router = useRouter();
  console.log(router.query.id);
  useEffect(() => {
    (async () => {
      const result = await mediaGetById({
        mediaId: router.query.id,
      });
    })();
  }, []);
  return (
    <>
      <Header />
      <MyProfile id={router.query.id} />
    </>
  );
};

export default myprofile;
