import UploadForm from "./components/UploadForm";
import VideoPreview from "./components/VideoPreview";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
    
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<UploadForm/>}></Route>      
      <Route path="/previewVideo" element={<VideoPreview/>}></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
