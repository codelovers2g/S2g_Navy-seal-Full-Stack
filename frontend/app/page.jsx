"use client"
import { useRouter } from "next/navigation";
import { UserAuth } from "./ui/Context/Authcontext";
import { useEffect } from "react";

const Homepage = () => {
  const { signInUsingEmailAndPassword, googleSignIn, user } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard or desired page
    }else{
      router.push("/login");
    }
  }, [user]);
  return (
    <div>Homepage</div>
  )
}

export default Homepage