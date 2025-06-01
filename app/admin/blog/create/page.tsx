"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateBlogForm from "../../../../components/BlogComponent/CreateBlogForm";

export default function CreateBlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to prevent immediate redirects
    const timer = setTimeout(() => {
      if (status === "unauthenticated") {
        router.replace("/login");
      } else {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-20">
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
        <CreateBlogForm />
      </div>
    </div>
  );
}
