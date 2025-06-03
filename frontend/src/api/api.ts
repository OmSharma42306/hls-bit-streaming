import axios from "axios";
import type { formDataTypeForSignIn,formDataTypeForSignUp } from "../types/types";

const host = import.meta.env.VITE_HOST
const token = localStorage.getItem('token');

export async function signUp(formData:formDataTypeForSignUp){
  console.log(formData);
  const response = await axios.post(`http://${host}/api/v1/user/signup`,formData);
  console.log("FINAL RESPONSE ",response.data);
  
  return response.data;
}

export async function signIn(formData:formDataTypeForSignIn){
    const response = await axios.post(`http://${host}/api/v1/user/signin`,formData);
    console.log(response);
    return response.data;
}

export async function uploadVideoToS3(formData:any){
  console.log("KEERTHI",token)  ;
  const response = await axios.post(`http://${host}/api/v1/aws/upload-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
}