
import { createAuthClient } from "better-auth/react"
const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
        return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
    }
    // Code jodi local pc-te chole, tobe window location dynamic nibe
    if (typeof window !== "undefined") {
        return window.location.origin; 
    }
    return "http://localhost:3000"; // Fallback
};
export const authClient = createAuthClient({
   
    baseURL: "https://lesson-up.vercel.app"
    
})
export const { signIn, signUp,signOut, useSession } = authClient;