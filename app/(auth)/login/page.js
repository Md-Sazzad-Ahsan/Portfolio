"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
// Google sign-in removed as requested
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to prevent immediate redirects
    const timer = setTimeout(() => {
      if (status === "authenticated") {
        router.replace("/admin");
      } else {
        setIsLoading(false);
      }
    }, 700); // 700ms delay - slightly longer than dashboard

    return () => clearTimeout(timer);
  }, [status, router]);

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
      router.replace("/admin");
    }
  };

  // Google sign-in handler removed as requested

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-darkBg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        {/* Google sign-in button and divider removed as requested */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-teal-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
