import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const UploadForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading,setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoFile) {
      console.log("Selected Video File:", videoFile);
    }
  }, [videoFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setVideoFile(file || null);
  };
  async function handleFileUpload(){
    if(!videoFile) return;
    const formData = new FormData();
    formData.append('file',videoFile);
    const response = await axios.post('http://localhost:3000/upload-video',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });

    console.log("upload successful!");
    console.log(response.data);
    setLoading(true);
    setTimeout(() => {
      navigate('/previewVideo')
    }, 200000);

  }

  return (
    <div>
    <Header/>
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
        onClick={handleFileUpload}
      >
        Convert to HLS
      </button>
      {loading ?
      <div>
        Transcoding Takes Time....So Wait....At least 2-3 min...after video will be played...
      </div> : ""}
    </div>
    </div>
  );
};

export default UploadForm;
