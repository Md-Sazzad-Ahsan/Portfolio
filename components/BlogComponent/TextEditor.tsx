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
  debounceMs?: number;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  value = "",
  onChange,
  height = 400,
  className = "",
  placeholder = "Write your post in Markdown...",
  debounceMs = 300,
}) => {
  const [internal, setInternal] = useState(value);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const isFocusedRef = useRef(false);

  const debouncedNotify = useRef(
    debounce((next: string) => onChange?.(next), debounceMs)
  ).current;

  useEffect(() => {
    if (!isFocusedRef.current && value !== internal) {
      setInternal(value);
    }
  }, [value, internal]);

  useEffect(() => () => debouncedNotify.cancel(), [debouncedNotify]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const updateTheme = () =>
      setColorMode(root.classList.contains("dark") ? "dark" : "light");
    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const handleChange = useCallback(
    (v?: string) => {
      const next = v ?? "";
      setInternal(next);
      debouncedNotify(next);
    },
    [debouncedNotify]
  );

  return (
    <div data-color-mode={colorMode} className={`text-editor ${className}`}>
      <TxtEditor
        className="bg-transparent"
        value={internal}
        onChange={handleChange}
        height={height}
        previewOptions={{
          components: {
            img: ({ src, alt, ...rest }: any) =>
              src ? <img src={src} alt={alt ?? ""} style={{ maxWidth: "100%" }} {...rest} /> : null,
          },
        }}
        textareaProps={{
          placeholder,
          onFocus: () => (isFocusedRef.current = true),
          onBlur: (e) => {
            isFocusedRef.current = false;
            debouncedNotify.cancel();
            onChange?.(e.target.value);
          },
        }}
      />
      <style jsx global>{`
        .wmde-markdown ul {
          list-style-type: disc !important;
          padding-left: 1.5rem;
        }
        .wmde-markdown ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem;
        }
        .wmde-markdown ul li,
        .wmde-markdown ol li {
          display: list-item !important;
        }
        .wmde-markdown ul li::marker,
        .wmde-markdown ol li::marker {
          color: #333a3f !important;
        }
        :root.dark .wmde-markdown ul li::marker,
        :root.dark .wmde-markdown ol li::marker {
          color: #50B498 !important;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;
