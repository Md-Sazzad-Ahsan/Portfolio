"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
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
  const [featuresInput, setFeaturesInput] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to create a URL-safe slug from title
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Feature helpers
  const addFeature = (value: string) => {
    const v = value.trim();
    if (!v) return;
    // avoid duplicates
    if (features.some(f => f.toLowerCase() === v.toLowerCase())) return;
    setFeatures(prev => [...prev, v]);
    setFeaturesInput("");
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleFeaturesKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addFeature(featuresInput);
    } else if (e.key === 'Backspace' && !featuresInput && features.length > 0) {
      // Remove last feature when input is empty
      e.preventDefault();
      setFeatures(prev => prev.slice(0, -1));
    }
  };

  const handleFeaturesPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    if (!text) return;
    e.preventDefault();
    const parts = text.split(/\r?\n|,|;|\|/).map(s => s.trim()).filter(Boolean);
    if (parts.length) {
      const merged = [...features];
      parts.forEach(p => {
        if (!merged.some(f => f.toLowerCase() === p.toLowerCase())) merged.push(p);
      });
      setFeatures(merged);
      setFeaturesInput("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = { ...form, slug: slugify(form.title), features };
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to create project");
      }

      setSuccess("Project created successfully");
      // Optionally reset form
      setForm({ thumbnail: "", title: "", subTitle: "", description: "", gitHub: "", web: "" });
      setFeaturesInput("");
      setFeatures([]);
      setImageFile(null);
      setImagePublicId(null);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
        <div>
          <label className="block text-sm mb-2">Thumbnail</label>
          {/* Uploader */}
          {!form.thumbnail ? (
            <div className="space-y-3">
              <input
                id="thumbnailFile"
                name="thumbnailFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setImageFile(f);
                }}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              />
              <button
                type="button"
                onClick={async () => {
                  if (!imageFile) {
                    setError("Please choose an image file first.");
                    return;
                  }
                  try {
                    setImageUploading(true);
                    setError(null);
                    const fd = new FormData();
                    fd.append('file', imageFile);
                    const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
                    const data = await res.json();
                    if (!res.ok || !data?.success) {
                      throw new Error(data?.error || 'Upload failed');
                    }
                    setForm(prev => ({ ...prev, thumbnail: data.url }));
                    setImagePublicId(data.public_id || null);
                  } catch (err: any) {
                    setError(err?.message || 'Failed to upload image');
                  } finally {
                    setImageUploading(false);
                  }
                }}
                disabled={imageUploading}
                className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-60"
              >
                {imageUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative w-full max-w-xs overflow-hidden rounded-md border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.thumbnail} alt="Thumbnail preview" className="w-full h-40 object-cover" />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    // Delete from cloud if we have a public id
                    try {
                      setImageUploading(true);
                      if (imagePublicId) {
                        await fetch('/api/delete-image', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ public_id: imagePublicId })
                        });
                      }
                    } finally {
                      setImageUploading(false);
                      setForm(prev => ({ ...prev, thumbnail: '' }));
                      setImagePublicId(null);
                      setImageFile(null);
                    }
                  }}
                  className="px-4 py-2 rounded-md border border-border hover:bg-accent/50"
                >
                  Remove
                </button>
                <label className="inline-flex items-center">
                  <span className="sr-only">Replace</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      try {
                        setImageUploading(true);
                        // Optionally delete older image first
                        if (imagePublicId) {
                          await fetch('/api/delete-image', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ public_id: imagePublicId })
                          });
                        }
                        const fd = new FormData();
                        fd.append('file', f);
                        const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
                        const data = await res.json();
                        if (!res.ok || !data?.success) {
                          throw new Error(data?.error || 'Upload failed');
                        }
                        setForm(prev => ({ ...prev, thumbnail: data.url }));
                        setImagePublicId(data.public_id || null);
                      } catch (err: any) {
                        setError(err?.message || 'Failed to replace image');
                      } finally {
                        setImageUploading(false);
                      }
                    }}
                  />
                  <span className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 ml-0">Replace</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-2" htmlFor="title">Title</label>
          <div className="w-full p-3 rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-cyan-600">
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={onChange}
              required
              maxLength={100}
              placeholder="Project title"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-2" htmlFor="subTitle">Sub Title</label>
          <div className="w-full p-3 rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-cyan-600">
            <textarea
              id="subTitle"
              name="subTitle"
              value={form.subTitle}
              onChange={onChange}
              required
              rows={4}
              maxLength={200}
              placeholder="Write a short project subtitle..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm mb-2" htmlFor="gitHub">GitHub URL</label>
          <div className="w-full p-3 rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-cyan-600">
            <input
              id="gitHub"
              name="gitHub"
              type="url"
              value={form.gitHub}
              onChange={onChange}
              placeholder="https://github.com/username/repo"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

      <div className="md:col-span-1">
        <label className="block text-sm mb-2" htmlFor="web">Website URL</label>
        <div className="w-full p-3 rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-cyan-600">
          <input
            id="web"
            name="web"
            type="url"
            value={form.web}
            onChange={onChange}
            placeholder="https://project.example.com"
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>
      </div>

      <div>
        <label className="block text-sm mb-2" htmlFor="features">Features</label>
        <div className="w-full p-3 rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-cyan-600">
          <div className="flex flex-wrap gap-2 mb-2">
            {features.map((feat, idx) => (
              <span key={`${feat}-${idx}`} className="inline-flex items-center gap-1 bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 border border-cyan-600/30 px-2 py-1 rounded-md text-xs">
                {feat}
                <button
                  type="button"
                  aria-label={`Remove ${feat}`}
                  onClick={() => removeFeature(idx)}
                  className="ml-1 text-cyan-700/80 hover:text-cyan-900 dark:hover:text-cyan-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            id="features"
            name="features"
            type="text"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            onKeyDown={handleFeaturesKeyDown}
            onPaste={handleFeaturesPaste}
            onBlur={() => addFeature(featuresInput)}
            placeholder="Type a feature and press Enter"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Press Enter or comma to add. Use Backspace to remove last. Click × to remove.</p>
      </div>

      <div>
        <label className="block text-sm mb-2" htmlFor="description">Description</label>
        <div className="w-full p-3 rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-cyan-600">
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            required
            rows={6}
            placeholder="Write a detailed description of the project..."
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Add Project"}
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
