import { useLocation } from "react-router-dom";

const useDynamicTitle = () => {
  const { pathname } = useLocation();
  const currPath = pathname.split("/")[1];

  if (pathname !== "/") {
    document.title = `SG | ${currPath.split("-").join(" ").toUpperCase()}`;
  } else document.title = "SG | SIGNIN";
  return { pathname };
};

export { useDynamicTitle };
