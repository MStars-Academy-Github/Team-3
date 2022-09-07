import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import UpdateMedia from "../../components/UpdateMedia";
import { mediaGetById } from "../api/api.media";

type Props = {};

const updateMedia = (props: Props) => {
  const [video, setVideo] = useState();
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
    <div>
      <Header />
      <UpdateMedia id={router.query.id} />
    </div>
  );
};

export default updateMedia;
