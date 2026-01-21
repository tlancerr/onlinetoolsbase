"use client";
import { useState } from "react";

type Props = {
  onUploaded: (file: File) => void;
  accept?: string;
};

export default function FileUploadWithProgress({ onUploaded, accept }: Props) {

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files?.[0];
if (!file) return;


    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    // Simulate upload or replace with your API upload endpoint
    const fakeUpload = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(fakeUpload);
          onUploaded(file);
          setUploading(false);
          return 100;
        }
        return p + 5;
      });
    }, 100);
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept={accept}
        onChange={handleFile}
        className="block w-full text-sm text-slate-300"
      />

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-600">
          <div
            className="bg-blue-500 h-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {uploading && (
        <p className="text-xs text-slate-400">{progress}% Uploading...</p>
      )}
    </div>
  );
}
