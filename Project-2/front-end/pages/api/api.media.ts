import axios from "axios";
export const list = async (): Promise<any> => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/allvideo`
    );
    return result.data.data;
  } catch (error) {
    return error;
  }
};
export const mediaGetById = async (params: any): Promise<any> => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/media/video/${params.mediaId}`
    );
    return result.data;
  } catch (err) {
    return err;
  }
};
