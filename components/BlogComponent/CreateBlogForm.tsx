"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CheckCircle, AlertCircle, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

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

export default function CreateBlogForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [slugStatus, setSlugStatus] = useState<'available' | 'unavailable' | 'checking' | 'idle'>('idle');
  
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

  const categories = [
    'Tech',
    'Education',
    'Programming',
    'LifeStyle',
    'Design',
    'News',
    'Social',
    'Others'
  ];

  // Check if slug exists and load blog data if it does
  /**
   * Checks if a slug is available and loads existing blog data if found
   * @param slug - The slug to check
   */
  const checkSlugAvailability = useCallback(async (slug: string) => {
    // Skip check for empty slugs
    if (!slug || slug.trim() === '') {
      setSlugStatus('idle');
      return;
    }
    
    setIsChecking(true);
    setSlugStatus('checking');
    
    try {
      const response = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Blog exists, load its data
        const blogData = result.data;
        setFormData({
          slug: blogData.slug,
          category: blogData.category || '',
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
        });
        
        // Set image preview if thumbnail exists
        if (blogData.thumbnail) {
          setImagePreview(blogData.thumbnail);
        }
        
        setIsEditing(true);
        setSlugStatus('unavailable');
        toast.success('Existing blog loaded. You can now update it.');
      } else {
        // Blog doesn't exist, reset form data except the slug
        setFormData(prev => ({
          ...prev,
          slug: slug,
          category: '',
          author: '',
          thumbnail: '',
          content: {
            en: { title: '', description: '', body: '' },
            bn: { title: '', description: '', body: '' }
          }
        }));
        setImagePreview('');
        setIsEditing(false);
        setSlugStatus('available');
      }
    } catch (error) {
      console.error('Error checking slug:', error);
      setSlugStatus('idle');
      toast.error('Failed to check slug availability');
    } finally {
      setIsChecking(false);
    }
  }, []);

  /**
   * Updates form data based on input changes
   * @param e - The change event from form inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Update form data first for all field types
    if (name.startsWith('content.')) {
      // Handle nested content fields (en/bn language content)
      const [lang, field] = name.split('.').slice(1);
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
      // Handle top-level fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Special handling for slug field
    if (name === 'slug') {
      // Reset editing state if slug changes while in editing mode
      if (isEditing && value !== formData.slug) {
        setIsEditing(false);
        setSlugStatus('idle');
      }
    }
  };
  
  /**
   * Handles the blur event for the slug input to check availability
   * @param e - The blur event from the slug input
   */
  const handleSlugBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value && value.trim() !== '') {
      checkSlugAvailability(value);
    } else {
      setSlugStatus('idle');
    }
  };

  /**
   * Converts a Google Drive sharing link to a direct link
   * @param url - The Google Drive URL to convert
   * @returns The direct link or the original URL if it's not a Google Drive link
   */
    /**
   * Handles image upload to Cloudinary
   * @param e - The change event from the file input
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload to Cloudinary
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }
      
      // Save the Cloudinary URL to the form data
      setFormData(prev => ({
        ...prev,
        thumbnail: data.url
      }));
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
      // Clear the preview on error
      setImagePreview('');
    } finally {
      setUploadingImage(false);
    }
  };
  
  /**
   * Clears the thumbnail image
   */
  const clearThumbnail = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: ''
    }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Resets the form to its initial state and redirects to admin page
   * @param successMessage - Message to display on successful operation
   */
  const resetFormAndRedirect = (successMessage: string) => {
    // Reset form data
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
    
    // Reset form state
    setIsEditing(false);
    setSlugStatus('idle');
    setImagePreview('');
    
    // Show success message and redirect
    toast.success(successMessage);
    router.push('/admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate at least one language has content
      const hasEnglishContent = formData.content.en.title.trim() !== '' && formData.content.en.body.trim() !== '';
      const hasBanglaContent = formData.content.bn.title.trim() !== '' && formData.content.bn.body.trim() !== '';
      
      if (!hasEnglishContent && !hasBanglaContent) {
        throw new Error('Please provide content in at least one language (English or Bangla)');
      }
      
      // Create a copy of the form data to modify
      const processedFormData = { ...formData };
      
      // If we're updating, preserve existing content for the language we're not updating
      if (isEditing) {
        const response = await fetch(`/api/blogs/${formData.slug}`);
        if (response.ok) {
          const existingData = await response.json();
          if (existingData.success) {
            processedFormData.content = {
              en: hasEnglishContent ? processedFormData.content.en : existingData.data.content.en || { title: '', description: '', body: '' },
              bn: hasBanglaContent ? processedFormData.content.bn : existingData.data.content.bn || { title: '', description: '', body: '' },
            };
          }
        }
      }
      
      // Determine if we're creating a new blog or updating an existing one
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/blogs/${formData.slug}` : '/api/blogs';
      const successMessage = isEditing ? 'Blog post updated successfully!' : 'Blog post created successfully!';
      
      // Send the processed data to the API
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...processedFormData,
          originalSlug: isEditing ? formData.slug : undefined
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'create'} blog post`);
      }

      // If we just created a blog and only filled one language, show a message
      if (!isEditing && ((hasEnglishContent && !hasBanglaContent) || (!hasEnglishContent && hasBanglaContent))) {
        const language = hasEnglishContent ? 'English' : 'Bangla';
        toast.success(`Blog post created in ${language}. You can add the other language later by using the same slug.`);
      } else {
        toast.success(successMessage);
      }
      
      // Only reset the form if we're not in editing mode
      if (!isEditing) {
        resetFormAndRedirect(successMessage);
      } else {
        // If we're editing, just update the form data and show success
        setFormData(prev => ({
          ...prev,
          ...processedFormData
        }));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} blog post:`, error);
      toast.error(error instanceof Error ? error.message : `Failed to ${isEditing ? 'update' : 'create'} blog post. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Handles the delete button click
   */
  const handleDelete = async () => {
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
  };

  /**
   * Renders the content tab for a specific language
   * @param lang - The language to render content for (en/bn)
   */
  const renderContentTab = (lang: Language) => {
    const content = formData.content[lang];
    const fieldConfig = [
      {
        id: 'title',
        label: `Title (${lang.toUpperCase()}) *`,
        value: content.title,
        type: 'input',
        rows: undefined,
        required: true,
        hint: undefined
      },
      {
        id: 'description',
        label: `Short Description (${lang.toUpperCase()})`,
        value: content.description,
        type: 'textarea',
        rows: 3,
        required: false,
        hint: undefined
      },
      {
        id: 'body',
        label: `Content (${lang.toUpperCase()}) *`,
        value: content.body,
        type: 'textarea',
        rows: 10,
        required: true,
        hint: 'Supports Markdown formatting',
        className: 'font-mono text-sm'
      }
    ];
    
    return (
      <div className="space-y-6">
        {fieldConfig.map(field => (
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-foreground mb-1">
            URL Slug *
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
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
              className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors${isChecking ? 'bg-gray-200 dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-700'} ${isEditing ? 'cursor-not-allowed opacity-50' : ''}`}
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title="Use lowercase letters, numbers, and hyphens only"
              disabled={isChecking || isEditing}
            />
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Used in the URL. Lowercase, letters, numbers, and hyphens only.
            </p>
            {slugStatus === 'checking' && (
              <span className="ml-2 text-xs flex items-center text-amber-500 dark:text-amber-400">
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

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            required
          >
            <option value="" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-foreground mb-1">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-foreground mb-1">
            Blog Thumbnail Image
          </label>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
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
                className="px-4 py-2 flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors w-full"
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
                    <span>Upload Image</span>
                  </>
                )}
              </button>
              {formData.thumbnail && (
                <button
                  type="button"
                  onClick={clearThumbnail}
                  className="px-3 py-2 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  disabled={uploadingImage}
                >
                  Remove
                </button>
              )}
            </div>

            {/* Preview area for the uploaded image */}
            {(imagePreview || formData.thumbnail) && (
              <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-md p-2">
                <div className="relative h-60 w-full overflow-hidden rounded-md">
                  <Image
                    src={imagePreview || formData.thumbnail}
                    alt="Thumbnail preview"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                  {formData.thumbnail}
                </p>
              </div>
            )}
            
            {!formData.thumbnail && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" />
                Upload a thumbnail image for your blog post
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300 dark:border-gray-600">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Note:</span> You can create a blog in either English or Bangla (or both). At least one language must have title and content.
          </p>
        </div>
        <nav className="-mb-px flex space-x-8">
          {(['en', 'bn'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveTab(lang)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === lang
                  ? 'border-primary text-primary dark:text-primary-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {lang.toUpperCase()}
              {lang === 'en' && formData.content.en.title && formData.content.en.body && 
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300">✓</span>
              }
              {lang === 'bn' && formData.content.bn.title && formData.content.bn.body && 
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300">✓</span>
              }
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-2">
        {activeTab === 'en' ? renderContentTab('en') : renderContentTab('bn')}
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
  );
}
