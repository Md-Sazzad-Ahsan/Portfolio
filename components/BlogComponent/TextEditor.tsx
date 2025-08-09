// components/BlogComponent/TextEditor.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";

const TxtEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export interface TextEditorProps {
  value?: string;
  onChange?: (md: string) => void;
  height?: number;
  className?: string;
  placeholder?: string;
  /** How long to debounce updates to parent (ms). Default 300ms. */
  debounceMs?: number;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  value = "",
  onChange,
  height = 400,
  className,
  placeholder = "Write your post in Markdown...",
  debounceMs = 300,
}) => {
  const [internal, setInternal] = useState<string>(value);
  const isFocusedRef = useRef(false);
  const externalValueRef = useRef(value);
  const [colorMode, setColorMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  // Keep a stable debounced callback for sending value to parent
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedNotify = useRef(
    debounce((next: string) => {
      onChange?.(next);
    }, debounceMs)
  ).current;

  // Update internal when parent value changes BUT only if:
  // - editor is not focused (so we don't overwrite caret while typing), AND
  // - external value actually differs from internal
  useEffect(() => {
    if (!isFocusedRef.current && value !== internal) {
      setInternal(value);
    }
    externalValueRef.current = value;
    // we intentionally don't add `internal` or `onChange` to deps
    // to avoid re-creating the debounced function / frequent effects
  }, [value]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedNotify.cancel();
    };
  }, [debouncedNotify]);

  // Sync editor theme with Tailwind's dark mode class
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const update = () => setColorMode(root.classList.contains('dark') ? 'dark' : 'light');
    update();
    const obs = new MutationObserver(() => update());
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const handleChange = useCallback(
    (v?: string) => {
      const next = v ?? "";
      setInternal(next);

      // notify parent debounced (so parent won't echo every keystroke back immediately)
      debouncedNotify(next);
    },
    [debouncedNotify]
  );

  return (
    <div
      data-color-mode={colorMode}
      className={[
        'bg-white dark:bg-darkBg rounded-md',
        // Base editor areas in dark mode
        'dark:[&_.w-md-editor]:bg-darkBg',
        'dark:[&_.w-md-editor-content]:bg-darkBg',
        'dark:[&_.w-md-editor-preview]:bg-darkBg',
        'dark:[&_.w-md-editor-preview]:text-gray-100',
        // Ensure preview markdown container uses our dark background in normal (non-fullscreen) mode
        'dark:[&_.wmde-markdown]:!bg-darkBg',
        'dark:[&_.wmde-markdown]:text-gray-100',
        // Ensure list styles are visible
        '[&_.wmde-markdown_ul]:list-disc',
        '[&_.wmde-markdown_ol]:list-decimal',
        '[&_.wmde-markdown_ul]:pl-6',
        '[&_.wmde-markdown_ol]:pl-6',
        'dark:[&_.wmde-markdown_ul]:list-disc',
        'dark:[&_.wmde-markdown_ol]:list-decimal',
        // Avoid extra overlays on code blocks
        'dark:[&_.wmde-markdown_pre]:bg-transparent',
        'dark:[&_.wmde-markdown_code]:bg-transparent',
        // Fullscreen overrides
        'dark:[&_.w-md-editor-fullscreen]:bg-darkBg',
        'dark:[&_.w-md-editor-fullscreen_.w-md-editor-content]:bg-darkBg',
        'dark:[&_.w-md-editor-fullscreen_.w-md-editor-preview]:bg-darkBg',
        'dark:[&_.w-md-editor-fullscreen_.wmde-markdown]:!bg-darkBg',
        'dark:[&_.w-md-editor-fullscreen_.wmde-markdown]:text-gray-100',
        className || ''
      ].join(' ').trim()}
    >
      <TxtEditor
        className="bg-transparent dark:bg-gray-700"
        style={{ backgroundColor: colorMode === 'dark' ? 'var(--tw-bg-opacity,1) /* fallback */' as any : undefined }}
        value={internal}
        onChange={handleChange}
        height={height}
        previewOptions={{
          // Override image rendering: skip images with empty src to avoid browser warnings
          components: {
            img: ({ src, alt, ...rest }: any) => {
              if (!src) return null;
              return (
                // use native img; do not use next/image inside the editor preview
                <img src={src} alt={alt ?? ''} style={{ maxWidth: '100%' }} {...rest} />
              );
            },
          },
        }}
        textareaProps={{
          placeholder,
          // capture focus/blur to avoid syncing while user is typing
          onFocus: () => {
            isFocusedRef.current = true;
          },
          onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => {
            isFocusedRef.current = false;
            // When user finishes editing, ensure parent gets the latest immediately
            const latest = (e.target as HTMLTextAreaElement).value ?? internal;
            // cancel any pending debounce and call immediately
            debouncedNotify.cancel();
            onChange?.(latest);
          },
        }}
      />
      {/* Global overrides required for fullscreen because the editor is moved to body */}
      <style jsx global>{`
        /* Normal (non-fullscreen) dark mode: ensure list markers are visible */
        :root.dark .w-md-editor .wmde-markdown ul li::marker,
        :root.dark .w-md-editor .wmde-markdown ol li::marker {
          color: #d1d5db !important; /* text-gray-300 */
        }
        :root.dark .w-md-editor-fullscreen,
        :root.dark .w-md-editor-fullscreen .w-md-editor-content,
        :root.dark .w-md-editor-fullscreen .w-md-editor-preview,
        :root.dark .w-md-editor-fullscreen .wmde-markdown {
          background-color: #374151 !important; /* tailwind gray-700 as fallback for darkBg */
          color: #e5e7eb !important; /* text-gray-200 */
        }
        /* Fullscreen dark mode: ensure list markers are visible */
        :root.dark .w-md-editor-fullscreen .wmde-markdown ul li::marker,
        :root.dark .w-md-editor-fullscreen .wmde-markdown ol li::marker {
          color: #d1d5db !important; /* text-gray-300 */
        }
        :root.dark .w-md-editor-fullscreen .wmde-markdown pre,
        :root.dark .w-md-editor-fullscreen .wmde-markdown code {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;
