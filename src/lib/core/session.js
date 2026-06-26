import { headers } from "next/headers";
import { authClient } from "../auth-client";
import { auth } from "../auth";

export const getSessionData = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return session?.data.user || null;
};
export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token;
};
