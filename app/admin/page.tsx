"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
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
    }, 500); // 500ms delay

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
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          {session?.user?.image && (
            <Image 
              src={session.user.image} 
              alt={session.user.name || 'User'} 
              width={40} 
              height={40} 
              className="rounded-full"
            />
          )}
          <span>{session?.user?.name || session?.user?.email || 'User'}</span>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Welcome Card */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            You&apos;re now signed in to your admin dashboard.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
          
            <Link 
              href="/blog/create" 
              className="block p-3 rounded-md hover:bg-accent/50 transition-colors"
            >
              Create Post
            </Link>
          </div>
        </div>

        {/* Projects Card */}
        <Link href="/admin/project" className="block group">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm transition-colors group-hover:bg-accent/50">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <p className="text-muted-foreground">
              Create or manage Project.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
