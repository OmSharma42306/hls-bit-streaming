import axios from "axios";

const host = import.meta.env.VITE_HOST

export async function uploadVideoToS3(formData:any){
    const response = await axios.post(`http://${host}/upload-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
}