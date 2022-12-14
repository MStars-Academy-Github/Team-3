import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Viewvideo from "../../components/Viewvideo";
import { mediaGetById } from "../../pages/api/api.media";
type Props = {};

const Mediaplay = (props: Props) => {
  const [video, setVideo] = useState();
  const router = useRouter();
  (async () => {
    const result = await mediaGetById({
      mediaId: router.query.id,
    });
  })();

  return (
    <>
      <Header />
      <Viewvideo id={router.query.id} />
    </>
  );
};

export default Mediaplay;
