import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const duration = 120000; // 2 minutes
      const intervalMs = 1000;
      const steps = duration / intervalMs;
      const increment = 100 / steps;

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(interval);
            navigate('/previewVideo');
          }
          return next;
        });
      }, intervalMs);

      return () => clearInterval(interval);
    }
  }, [loading, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setVideoFile(file || null);
  };

  async function handleFileUpload() {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await axios.post("http://localhost:3000/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Upload successful!");
      console.log(response.data);

      setLoading(true); // start progress
    } catch (err) {
      console.error("Upload failed", err);
    }
  }

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <label className="block mb-4 text-sm font-medium text-gray-700">
          Select a video file:
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {videoFile && (
          <div className="mt-4 text-sm text-gray-700">
            <strong>File Name:</strong> {videoFile.name}
          </div>
        )}

        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          disabled={!videoFile}
          onClick={handleFileUpload}
        >
          Convert to HLS
        </button>

        {loading && (
          <div className="mt-6">
            <p className="mb-2 text-gray-600">
              Transcoding... This may take 2–3 minutes. Please wait.
            </p>
            <ProgressBar value={progress} showLabel />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
