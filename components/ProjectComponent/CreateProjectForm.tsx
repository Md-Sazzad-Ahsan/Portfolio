"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    thumbnail: "",
    title: "",
    subTitle: "",
    description: "",
    gitHub: "",
    web: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to create project");
      }

      setSuccess("Project created successfully");
      // Optionally reset form
      setForm({ thumbnail: "", title: "", subTitle: "", description: "", gitHub: "", web: "" });
      // Navigate back to admin or stay
      // router.push("/admin");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-red-500/10 text-red-600 border border-red-500/30">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2" htmlFor="thumbnail">Thumbnail URL</label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            value={form.thumbnail}
            onChange={onChange}
            required
            placeholder="https://example.com/thumb.jpg"
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            maxLength={100}
            placeholder="Project title"
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-2" htmlFor="subTitle">Sub Title</label>
          <input
            id="subTitle"
            name="subTitle"
            type="text"
            value={form.subTitle}
            onChange={onChange}
            required
            maxLength={200}
            placeholder="Short subtitle"
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-2" htmlFor="gitHub">GitHub URL</label>
          <input
            id="gitHub"
            name="gitHub"
            type="url"
            value={form.gitHub}
            onChange={onChange}
            placeholder="https://github.com/username/repo"
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2" htmlFor="web">Website URL</label>
        <input
          id="web"
          name="web"
          type="url"
          value={form.web}
          onChange={onChange}
          placeholder="https://project.example.com"
          className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>

      <div>
        <label className="block text-sm mb-2" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={onChange}
          required
          rows={6}
          placeholder="Write a detailed description of the project..."
          className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-md border border-border hover:bg-accent/50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
