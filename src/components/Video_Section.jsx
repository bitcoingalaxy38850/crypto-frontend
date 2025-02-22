import React from 'react';
import { Play } from 'lucide-react';

const videoData = [
  {
    id: 1,
    title: "How to Buy Machine & earned money from Cryptomyners platform",

    videoUrl: "https://www.youtube.com/watch?v=g_jkmMmSirk",

  },
  {
    id: 2,
    title: "How to withdraw earned money from Cryptomyners platform",
  
    videoUrl: "https://www.youtube.com/watch?v=rkXqZ6JuhXo",

  },
  {
    id: 3,
    title: "How to Referral and earned money from Cryptomyners",

    videoUrl: "https://www.youtube.com/shorts/nbhANveOAd4",

  },
];

// Function to extract the YouTube ID from a given URL (works for regular and Shorts)
const getYouTubeId = (url) => {
  const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  const regularMatch = url.match(/(?:youtube\.com\/(?:.*v=|.*\/(?:embed|v|vi|e)\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  
  if (shortMatch) return shortMatch[1];
  if (regularMatch) return regularMatch[1];
  
  return null; // Return null if no match is found
};

const Video_Section = () => {
  return (
    <section className="bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoData.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform lg:hover:scale-105 duration-300"
            >
              {/* YouTube Embed */}
              <div className="relative">
                {getYouTubeId(video.videoUrl) ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                ) : (
                  <p className="text-white text-center py-4">Invalid video URL</p>
                )}

              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-1">{video.title}</h2>

   
              </div>

              {/* Video Info */}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video_Section;
