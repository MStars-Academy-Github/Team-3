import dynamic from "next/dynamic";
import React from "react";

type Props = {
  id: string[] | undefined | string;
};

const Viewvideo = (props: Props) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  return (
    <div className="flex justify-center content-center mt-8">
      <ReactPlayer
        url={`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/video/${props.id}`}
        width="50%"
        height={"inherit"}
        controls={true}
      />
    </div>
  );
};

export default Viewvideo;
