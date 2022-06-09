import { useLocation } from "react-router-dom";
import { LocalRoutes } from "../constants";

const useDynamicTitle = () => {
  const { pathname } = useLocation();
  const currPath = pathname.split("/")[1];
  if (currPath !== LocalRoutes.SIGNIN) {
    document.title = `SG | ${currPath.split("-").join(" ").toUpperCase()}`;
  } else document.title = "SG | SIGNIN";
  return { pathname };
};

export { useDynamicTitle };
