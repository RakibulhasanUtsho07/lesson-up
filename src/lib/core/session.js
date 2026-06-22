import { headers } from "next/headers";
import { authClient } from "../auth-client";


export const getSessionData = async()=>{
    const session = await authClient.getSession({
        fetchOptions: {
          headers: await headers()
        }
      });
      return session?.data.user || null
}