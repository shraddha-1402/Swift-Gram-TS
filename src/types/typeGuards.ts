import { Auth } from "./types";

export const isJSError = (e: any): e is Error => e instanceof Error;

export const isLoginData = (param: any): param is Auth.LoginData => {
  if (param.token && param.user) return true;
  return false;
};
