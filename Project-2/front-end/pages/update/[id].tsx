import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import UpdateMedia from "../../components/UpdateMedia";
import { mediaGetById } from "../api/api.media";

type Props = {};

const UpdateMediaPage = (props: Props) => {
  const router = useRouter();
  (async () => {
    const result = await mediaGetById({
      mediaId: router.query.id,
    });
  })();

  return (
    <div>
      <Header />
      <UpdateMedia id={router.query.id} />
    </div>
  );
};

export default UpdateMediaPage;
