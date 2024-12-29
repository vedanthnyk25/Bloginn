import React, { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import Quill from 'quill';

export default function RTE({ name, control, label, defaultValue = '' }) {
  const quillRef = useRef(null);
  const editorRef = useRef(null); // To store the Quill instance

  useEffect(() => {
    // Initialize Quill editor only once
    if (!editorRef.current && quillRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        placeholder: 'Write something awesome...',
      });
    }
  }, []);

  return (
    <div className="w-full bg-slate-200">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          // Update Quill content when value changes externally
          useEffect(() => {
            if (editorRef.current && value !== editorRef.current.root.innerHTML) {
              editorRef.current.root.innerHTML = value || '';
            }
          }, [value]);

          // Attach Quill change handler
          useEffect(() => {
            if (editorRef.current) {
              const quill = editorRef.current;
              const handleChange = () => {
                onChange(quill.root.innerHTML);
              };
              quill.on('text-change', handleChange);
              return () => quill.off('text-change', handleChange);
            }
          }, [onChange]);

          return <div ref={quillRef} style={{ height: '500px' }} />;
        }}
      />
    </div>
  );
}
