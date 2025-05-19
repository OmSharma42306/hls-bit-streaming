import { useState, useEffect } from "react";

const UploadForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    if (videoFile) {
      console.log("Selected Video File:", videoFile);
    }
  }, [videoFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setVideoFile(file || null);
  };

  return (
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

      {/* Future UI: Add a button to start conversion */}
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        disabled={!videoFile}
        onClick={() => console.log("Trigger conversion logic here")}
      >
        Convert to HLS
      </button>
    </div>
  );
};

export default UploadForm;
