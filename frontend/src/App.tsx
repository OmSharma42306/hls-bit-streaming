import UploadForm from "./components/UploadForm";
import VideoPreview from "./components/VideoPreview";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import AuthPages from "./auth/Auth";


function App() {
    
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/auth" element={<AuthPages/>}></Route>
      <Route path="/uploadVideo" element={<UploadForm/>}></Route>   
      <Route path="/previewVideo" element={<VideoPreview/>}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
