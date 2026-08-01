import { authClient } from "./auth-client";

export const getSessiondata = async () => {
  const { data } = await authClient.getSession();

  return data ?? null;
};

export const getSessionUserFromClient = async () => {
  const { data } = await authClient.getSession();

  return data?.user ?? null;
};
