import { Dispatch } from "react";

const uploadImage = async ({
  files,
  setURL,
}: {
  files: FileList;
  setURL: Dispatch<React.SetStateAction<string>>;
}) => {
  const image = files[0];
  if (Math.round(image.size / 1024000) > 2)
    console.log("File size should be less than 2MB");
  //add toast
  else {
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
        setURL(json.secure_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export { uploadImage };
