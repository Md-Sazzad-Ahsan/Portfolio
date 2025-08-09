"use client";

import { useState, useEffect, useCallback, useRef, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CheckCircle, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import TextEditor from "@/components/BlogComponent/TextEditor";

type Language = 'en' | 'bn';

interface BlogContent {
  title: string;
  description: string;
  body: string;
}

interface BlogData {
  slug: string;
  category: string;
  author: string;
  thumbnail: string;
  content: {
    en: BlogContent;
    bn: BlogContent;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Extract Cloudinary public_id from a secure_url
// Examples:
// https://res.cloudinary.com/<cloud>/image/upload/v1700000000/blog-thumbnails/abc.jpg -> blog-thumbnails/abc
// https://res.cloudinary.com/<cloud>/image/upload/c_scale,w_800/v1700000000/blog-thumbnails/abc.webp -> blog-thumbnails/abc
const getCloudinaryPublicId = (url: string): string | null => {
  try {
    if (!url || typeof url !== 'string') return null;
    const marker = '/upload/';
    const idx = url.indexOf(marker);
    if (idx === -1) return null;

    // Remove everything up to and including '/upload/'
    let tail = url.slice(idx + marker.length);

    // Strip any transformations e.g. "c_scale,w_800/"
    if (tail.startsWith('c_') || tail.startsWith('f_') || tail.startsWith('q_') || tail.startsWith('w_') || tail.startsWith('h_')) {
      const afterTransform = tail.indexOf('/')
      tail = afterTransform !== -1 ? tail.slice(afterTransform + 1) : tail;
    }

    // Remove version segment like "v1700000000/"
    if (tail.startsWith('v')) {
      const afterVersion = tail.indexOf('/')
      tail = afterVersion !== -1 ? tail.slice(afterVersion + 1) : tail;
    }

    // Now tail should look like: folder/name.ext or name.ext
    const lastDot = tail.lastIndexOf('.')
    const publicId = lastDot !== -1 ? tail.slice(0, lastDot) : tail;
    return publicId || null;
  } catch {
    return null;
  }
};

// Stable, memoized content tab to prevent remounts while typing
const ContentTab = memo(function ContentTab({
  lang,
  content,
  handleChange,
  setFormData,
}: {
  lang: Language;
  content: BlogContent;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<BlogData>>;
}) {
  const fields = useMemo(() => ([
    {
      id: 'title',
      label: `Title (${lang.toUpperCase()}) *`,
      value: content.title,
      type: 'input' as const,
      rows: undefined,
      required: true,
      hint: undefined,
      className: ''
    },
    {
      id: 'description',
      label: `Short Description (${lang.toUpperCase()})`,
      value: content.description,
      type: 'textarea' as const,
      rows: 3,
      required: false,
      hint: undefined,
      className: ''
    },
    {
      id: 'body',
      label: `Content (${lang.toUpperCase()}) *`,
      value: content.body,
      type: 'textarea' as const,
      rows: 10,
      required: true,
      hint: 'Supports Markdown formatting with live preview',
      className: 'font-mono text-sm'
    }
  ]), [content, lang]);

  return (
    <div className="space-y-3">
      {fields.map(field => (
        <div key={field.id}>
          <label
            htmlFor={`content.${lang}.${field.id}`}
            className="block text-sm font-medium text-foreground mb-1"
          >
            {field.label}
          </label>

          {field.type === 'input' ? (
            <input
              type="text"
              id={`content.${lang}.${field.id}`}
              name={`content.${lang}.${field.id}`}
              value={field.value}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors focus:ring-2 focus:ring-primary focus:border-transparent"
              required={field.required}
            />
          ) : field.id === 'body' ? (
            <div className="mt-2">
              <TextEditor
                value={field.value}
                onChange={(value) => {
                  // Update the form data directly since we're using controlled components
                  setFormData(prev => ({
                    ...prev,
                    content: {
                      ...prev.content,
                      [lang]: {
                        ...prev.content[lang],
                        [field.id]: value
                      }
                    }
                  }));
                }}
                height={400}
                className="rounded-lg overflow-hidden border border-border"
              />
            </div>
          ) : (
            <textarea
              id={`content.${lang}.${field.id}`}
              name={`content.${lang}.${field.id}`}
              value={field.value}
              onChange={handleChange}
              rows={field.rows}
              className={`w-full px-4 py-2 border border-border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors focus:ring-2 focus:ring-primary focus:border-transparent ${field.className || ''}`}
              required={field.required}
            />
          )}

          {field.hint && (
            <p className="mt-1 text-xs text-muted-foreground">
              {field.hint}
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

export default function CreateBlogForm() {
  const router = useRouter();

  // UI state
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [slugStatus, setSlugStatus] = useState<'available' | 'unavailable' | 'checking' | 'idle'>('idle');

  // form state
  const [formData, setFormData] = useState<BlogData>({
    slug: '',
    category: '',
    author: '',
    thumbnail: '',
    content: {
      en: { title: '', description: '', body: '' },
      bn: { title: '', description: '', body: '' }
    }
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formDataRef = useRef<BlogData>(formData);
  // Hold a selected image locally to upload on submit
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);

  // memoized categories
  const categories = useMemo(() => [
    'Tech',
    'Education',
    'Programming',
    'LifeStyle',
    'Design',
    'News',
    'Social',
    'Others'
  ], []);

  // Normalize any incoming category (e.g., from API) to one of our dropdown options
  const normalizeCategory = useCallback((incoming: string | undefined | null) => {
    const source = (incoming ?? '').toString();
    if (!source) return '';
    const canon = source.toLowerCase().replace(/\s|-/g, '');
    const found = categories.find(c => c.toLowerCase().replace(/\s|-/g, '') === canon);
    return found ?? '';
  }, [categories]);

  // Abort controller ref for slug checking
  const slugAbortRef = useRef<AbortController | null>(null);
  const slugDebounceRef = useRef<number | null>(null);

  // keep a ref to latest form data for checks inside callbacks
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  /**
   * Checks if a slug exists and loads existing blog data if found
   * @param slug - The slug to check
   */
  const checkSlugAvailability = useCallback(async (slug: string) => {
    if (!slug || slug.trim() === '') {
      setSlugStatus('idle');
      return;
    }

    // Cancel previous fetch if any
    slugAbortRef.current?.abort();
    const controller = new AbortController();
    slugAbortRef.current = controller;

    setIsChecking(true);
    setSlugStatus('checking');

    try {
      const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { signal: controller.signal });
      const result = await response.json();

      if (response.ok && result.success) {
        const blogData = result.data;
        const newFormData: BlogData = {
          slug: blogData.slug,
          category: normalizeCategory(blogData.category),
          author: blogData.author || '',
          thumbnail: blogData.thumbnail || '',
          content: {
            en: {
              title: blogData.content?.en?.title || '',
              description: blogData.content?.en?.description || '',
              body: blogData.content?.en?.body || ''
            },
            bn: {
              title: blogData.content?.bn?.title || '',
              description: blogData.content?.bn?.description || '',
              body: blogData.content?.bn?.body || ''
            }
          },
          createdAt: blogData.createdAt,
          updatedAt: blogData.updatedAt
        };

        // Always load existing blog to overwrite current inputs when slug exists
        setFormData(newFormData);

        // Cloudinary transformation if needed
        if (blogData.thumbnail) {
          let thumbnailUrl = blogData.thumbnail;
          if (thumbnailUrl.includes('res.cloudinary.com') && !thumbnailUrl.includes('upload/')) {
            const parts = thumbnailUrl.split('upload/');
            if (parts.length === 2) {
              thumbnailUrl = `${parts[0]}upload/c_scale,w_800/${parts[1]}`;
            }
          }
          setImagePreview(thumbnailUrl);
        } else {
          setImagePreview('');
        }

        setIsEditing(true);
        setSlugStatus('unavailable');
        toast.success('Existing blog loaded. You can now update it.');
      } else {
        // Not found -> only update status, do not clear user-entered fields
        setIsEditing(false);
        setSlugStatus('available');
      }
    } catch (error) {
      if ((error as any)?.name === 'AbortError') {
        // intentionally aborted — ignore
        return;
      }
      console.error('Error checking slug:', error);
      setSlugStatus('idle');
      toast.error('Failed to check slug availability');
    } finally {
      setIsChecking(false);
    }
  }, []);

  // Removed auto-check on keystroke; slug availability will be checked on blur only

  /**
   * Updates form data based on input changes
   * @param e - The change event from form inputs
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('content.')) {
      const [, lang, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          [lang]: {
            ...prev.content[lang as Language],
            [field]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Special handling for slug field: when changed, reset editing state if needed
    if (name === 'slug') {
      // If user modifies slug while previously in editing mode, clear editing lock
      setIsEditing(prevEditing => {
        if (prevEditing && value !== formData.slug) {
          setSlugStatus('idle');
          return false;
        }
        return prevEditing;
      });
    }
  }, [formData.slug]);

  /**
   * Handles the blur event for the slug input to check availability
   * @param e - The blur event from the slug input
   */
  const handleSlugBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value.trim() !== '') {
      checkSlugAvailability(value);
    } else {
      setSlugStatus('idle');
    }
  }, [checkSlugAvailability]);

  /**
   * Handles image upload to Cloudinary
   * @param e - The change event from the file input
   */
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target?.result as string);
    reader.readAsDataURL(file);

    // Do not upload immediately; stage for submit
    setPendingImageFile(file);
    toast.success('Image selected. It will upload on Save.');
  }, []);

  /**
   * Clears the thumbnail image
   */
  const clearThumbnail = useCallback(() => {
    setFormData(prev => ({ ...prev, thumbnail: '' }));
    setImagePreview('');
    setPendingImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  /**
   * Resets the form to its initial state and redirects to admin page
   * @param successMessage - Message to display on successful operation
   */
  const resetFormAndRedirect = useCallback((successMessage: string) => {
    setFormData({
      slug: '',
      category: '',
      author: '',
      thumbnail: '',
      content: {
        en: { title: '', description: '', body: '' },
        bn: { title: '', description: '', body: '' }
      }
    });
    setIsEditing(false);
    setSlugStatus('idle');
    setImagePreview('');
    setPendingImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success(successMessage);
    router.push('/admin');
  }, [router]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hasEnglishContent = formData.content.en.title.trim() !== '' && formData.content.en.body.trim() !== '';
      const hasBanglaContent = formData.content.bn.title.trim() !== '' && formData.content.bn.body.trim() !== '';

      if (!hasEnglishContent && !hasBanglaContent) {
        throw new Error('Please provide content in at least one language (English or Bangla)');
      }

      const processedFormData: BlogData = { ...formData };

      // If a new file is selected, upload it now
      let uploadedNewImageUrl: string | null = null;
      const previousThumbnailUrl = formData.thumbnail;
      if (pendingImageFile) {
        try {
          setUploadingImage(true);
          const payload = new FormData();
          payload.append('file', pendingImageFile);
          const uploadRes = await fetch('/api/upload-image', { method: 'POST', body: payload });
          const uploadData = await uploadRes.json();
          if (!uploadRes.ok) throw new Error(uploadData.error || 'Failed to upload image');
          uploadedNewImageUrl = uploadData.url;
          if (uploadedNewImageUrl) {
            processedFormData.thumbnail = uploadedNewImageUrl;
          }
        } catch (uploadErr) {
          throw uploadErr instanceof Error ? uploadErr : new Error('Failed to upload selected image');
        } finally {
          setUploadingImage(false);
        }
      }

      if (isEditing) {
        // Preserve existing content for language not updated
        const response = await fetch(`/api/blogs/${formData.slug}`);
        if (response.ok) {
          const existingData = await response.json();
          if (existingData.success) {
            processedFormData.content = {
              en: hasEnglishContent ? processedFormData.content.en : (existingData.data.content.en || { title: '', description: '', body: '' }),
              bn: hasBanglaContent ? processedFormData.content.bn : (existingData.data.content.bn || { title: '', description: '', body: '' }),
            };
          }
        }
      }

      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/blogs/${formData.slug}` : '/api/blogs';
      const successMessage = isEditing ? 'Blog post updated successfully!' : 'Blog post created successfully!';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...processedFormData,
          originalSlug: isEditing ? formData.slug : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'create'} blog post`);
      }

      // After successful save, if we uploaded a new image and there was a previous Cloudinary image, delete the old one
      if (uploadedNewImageUrl && previousThumbnailUrl && previousThumbnailUrl.includes('res.cloudinary.com')) {
        const oldId = getCloudinaryPublicId(previousThumbnailUrl);
        if (oldId) {
          try {
            await fetch('/api/delete-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ public_id: oldId })
            });
          } catch (delErr) {
            console.warn('Failed to delete previous image from Cloudinary:', delErr);
          }
        }
      }

      if (!isEditing && ((hasEnglishContent && !hasBanglaContent) || (!hasEnglishContent && hasBanglaContent))) {
        const language = hasEnglishContent ? 'English' : 'Bangla';
        toast.success(`Blog post created in ${language}. You can add the other language later by using the same slug.`);
      } else {
        toast.success(successMessage);
      }

      if (!isEditing) {
        resetFormAndRedirect(successMessage);
      } else {
        setFormData(prev => ({ ...prev, ...processedFormData }));
        setPendingImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} blog post:`, error);
      toast.error(error instanceof Error ? error.message : `Failed to ${isEditing ? 'update' : 'create'} blog post. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isEditing, resetFormAndRedirect, pendingImageFile]);

/**
 * Handles the delete button click
 */
const handleDelete = useCallback(async () => {
  // ...
    if (!isEditing || !formData.slug) return;

    if (!confirm(`Are you sure you want to delete this blog post? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/blogs/${formData.slug}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete blog post');
      }

      resetFormAndRedirect('Blog post deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }, [formData.slug, isEditing, resetFormAndRedirect]);

  // (removed inline RenderContentTab to keep component identity stable)

  return (
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 md:gap-12">
          {/* First Column: Slug, Author, Thumbnail */}
          <div className="space-y-8 col-span-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Blog Information
              </h3>

              {/* URL Slug */}
              <div className="mb-8">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unique Url *
                </label>
                <div className="flex rounded-lg shadow-sm overflow-hidden border border-gray-300 dark:border-gray-600">
                  <span className="inline-flex items-center px-4 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium">
                    /blog/en/
                  </span>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    onBlur={handleSlugBlur}
                    placeholder="my-awesome-post"
                    className={`flex-1 min-w-0 block w-full px-4 py-2 border-0 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${isChecking ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'} ${isEditing ? 'cursor-not-allowed opacity-50' : ''} text-gray-900 dark:text-gray-100`}
                    required
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    title="Use lowercase letters, numbers, and hyphens only"
                    disabled={isChecking || isEditing}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Lowercase, letters, numbers, and hyphens only.
                  </p>
                  {slugStatus === 'checking' && (
                    <span className="ml-2 text-xs flex items-center text-amber-600 dark:text-amber-400">
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Checking...
                    </span>
                  )}
                  {slugStatus === 'available' && (
                    <span className="ml-2 text-xs flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="w-3 h-3 mr-1" /> Available
                    </span>
                  )}
                  {slugStatus === 'unavailable' && (
                    <span className="ml-2 text-xs flex items-center text-blue-600 dark:text-blue-400">
                      <CheckCircle className="w-3 h-3 mr-1" /> Loaded for editing
                    </span>
                  )}
                </div>
              </div>

              {/* Author */}
              <div className="mb-8">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  placeholder="Enter author name"
                />
              </div>

              {/* Category */}
              <div className="mb-8">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  required
                >
                  <option value="" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail Image
                </label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="thumbnail-upload"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 px-4 py-3 flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload Image</span>
                        </>
                      )}
                    </button>
                    {formData.thumbnail && (
                      <button
                        type="button"
                        onClick={clearThumbnail}
                        className="px-3 py-2 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        disabled={uploadingImage}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Preview */}
                  {(imagePreview || formData.thumbnail) ? (
                    <div className="border border-blue-200 dark:border-gray-600 rounded-xl p-4 bg-white dark:bg-gray-700">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-md">
                        <Image
                          src={imagePreview || formData.thumbnail}
                          alt="Thumbnail preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover' }}
                          className="rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = imagePreview || formData.thumbnail;
                            target.style.objectFit = 'contain';
                            target.style.padding = '1rem';
                          }}
                          unoptimized={process.env.NODE_ENV !== 'production'}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        {formData.thumbnail}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload a thumbnail image for your blog post
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Second Column: Blog Content */}
          <div className="space-y-5 col-span-3 pt-10 sm:pt-0">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Blog Content
              </h3>

              <div className="mb-3">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Note:</span> You can create a blog in either English or Bangla (or both). At least one language must have title and content.
                </p>
              </div>

              {/* Language Tabs */}
              <div className="mb-4">
                <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  {(['en', 'bn'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang)}
                      className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                        activeTab === lang
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{lang.toUpperCase()}</span>
                      {lang === 'en' && formData.content.en.title && formData.content.en.body && 
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-green-500 text-white rounded-full text-xs">✓</span>
                      }
                      {lang === 'bn' && formData.content.bn.title && formData.content.bn.body && 
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-green-500 text-white rounded-full text-xs">✓</span>
                      }
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content Tab */}
              <div>
                {activeTab === 'en' ? (
                  <ContentTab
                    lang="en"
                    content={formData.content.en}
                    handleChange={handleChange}
                    setFormData={setFormData}
                  />
                ) : (
                  <ContentTab
                    lang="bn"
                    content={formData.content.bn}
                    handleChange={handleChange}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between space-x-4 pt-6 border-t border-gray-300 dark:border-gray-600">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center min-w-[120px]"
              disabled={isDeleting || isSubmitting}
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                </span>
              ) : (
                'Delete Post'
              )}
            </button>
          )}
          <div className="flex space-x-4 ml-auto">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm"
              disabled={isSubmitting || isDeleting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm flex items-center justify-center min-w-[140px]"
              disabled={isSubmitting || isDeleting}
            >
              {isSubmitting ?
                (isEditing ?
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...
                  </span> :
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...
                  </span>
                ) :
                (isEditing ? 'Update Post' : 'Publish Post')
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
