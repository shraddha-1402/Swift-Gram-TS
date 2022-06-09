import { AxiosError } from "axios";
import { Auth } from "./types";

export const isJSError = (e: any): e is Error => e instanceof Error;

export const isAxiosError = (e: any): e is AxiosError => {
  try {
    if (
      (e as AxiosError).response?.status !== undefined &&
      (e as AxiosError).name === "AxiosError"
    )
      return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isLoginData = (param: any): param is Auth.LoginData => {
  if (param.token && param.user) return true;
  return false;
};
