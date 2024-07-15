"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserAuth } from "@/app/ui/Context/Authcontext";

const Page = () => {
  const { signInUsingEmailAndPassword, googleSignIn, user } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard or desired page
    }
  }, [user]);
  const [userDetails, setUserDetails] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInUsingEmailAndPassword(
        userDetails.email,
        userDetails.password
      );
      router.push("/dashboard"); // Redirect to dashboard or desired page
    } catch (error) {
      setError(error.message);
      // Handle error, e.g., show error message to user
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/dashboard"); // Redirect to dashboard or desired page
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      setError(error.message);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div
      className="flex w-full items-center justify-center mt-9"
      style={{ backgroundColor: "#151c2c", color: "white" }}
    >
      <div
        className="sm:w-[400px] w-full rounded-lg shadow-lg p-10 flex flex-col"
        style={{ backgroundColor: "#182237" }}
      >
        <h1 className="text-xl font-medium mb-4">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <label htmlFor="email" className="mb-2 text-gray-500">
            Email
          </label>
          <input
            autoComplete="off"
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="email@gmail.com"
            className="p-2 border-gray-300 border-[1px] rounded-lg focus:outline-none focus:border-green-500 text-black"
          />
          <label htmlFor="password" className="mb-2 text-gray-500">
            Password
          </label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            placeholder="password"
            className="p-2 border-gray-300 border-[1px] rounded-lg focus:outline-none focus:border-green-500 text-black mb-4"
          />
          <button
            type="submit"
            className="bg-green-500 hover:opacity-70 outline-none border-none p-2 rounded-sm text-lg text-center font-semibold text-white mt- mb-4"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-blue-400 hover:opacity-70 outline-none border-none p-2 rounded-sm text-lg text-center font-semibold text-white mt-2"
          >
            Login with Google
          </button>
        </form>
        <Link href="/signup" className="text-sm text-white text-center">
          Don&apos;t have an account? Sign up here
        </Link>
      </div>
    </div>
  );
};

export default Page;
