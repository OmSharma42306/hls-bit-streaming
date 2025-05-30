import VideoPlayer from './Videojs';

export default function VideoPreview(){
    
    return  <div
      style={{
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '1rem',
          maxWidth: 600,
          width: '100%',
        }}
      >
        
        <VideoPlayer />
      </div>
    </div>
};



