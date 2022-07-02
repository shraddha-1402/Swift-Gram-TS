import { Dispatch, SetStateAction } from "react";
import { SetImageURLFunction } from "../types/types";

const uploadImage = async ({
  files,
  setImageURL,
  setLoading,
}: {
  files: FileList;
  setImageURL: SetImageURLFunction;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const image = files[0];
  if (Math.round(image.size / 1024000) > 2)
    console.log("File size should be less than 2MB");
  //add toast
  else {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    if (process.env.REACT_APP_CLOUDINARY_API_KEY)
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_API_KEY);
    const requestOptions = {
      method: "POST",
      body: data,
    };
    await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (setImageURL.type === "PostDataFunction")
          setImageURL.func((prev) => ({
            ...prev,
            postImageURL: json.secure_url,
          }));
        else setImageURL.func(json.secure_url);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }
};

export { uploadImage };
