"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      setError("This email is invalid");
      return;
    }
    if (!password || password.length < 8) {
      setError("The password must be at least 8 characters");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid Email or Password");
    } else {
      setError("");
      if (res?.url) router.replace("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-darkBg">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-50 dark:bg-darkBg rounded md:shadow-lg">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-200 dark:border-gray-500 rounded focus:outline-none focus:ring-1 bg-gray-50 dark:bg-gray-700 focus:ring-blue-100 shadow-inner"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-200 dark:border-gray-500 rounded focus:outline-none focus:ring-1 bg-gray-50 dark:bg-gray-700 focus:ring-blue-100 shadow-inner"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-400"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-teal-500"
              >
                Remember me
              </label>
            </div>
            <div>
              <Link
                href="/forgot-password"
                className="text-sm text-teal-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded hover:bg-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
          >
            Log In
          </button>
          <p className="text-red-500 text-sm mt-2">{error && error}</p>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-300">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-50 focus:outline-none">
            <FcGoogle className="mr-2" /> Google
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-50 focus:outline-none">
            <FaGithub className="mr-2" /> GitHub
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Dont have an account?{" "}
          <Link href="/register" className="text-teal-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
