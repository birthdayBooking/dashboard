import axios from "../utils/axios-customize";

export const uploadSingle = (fileImage: File) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", fileImage);
  return axios({
    method: "post",
    url: `/api/v1/upload/image`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadMultiple = async (fileImage: File) => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", fileImage);
  return axios({
    method: "post",
    url: `/api/v1/upload/images`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
