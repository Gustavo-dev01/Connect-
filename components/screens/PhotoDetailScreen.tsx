import React from 'react';
// FIX: Changed import path to be relative.
import { Screen } from '../../types';
// FIX: Changed import path to be relative.
import { ChevronLeftIcon, HeartIcon } from '../icons/Icons';

interface PhotoDetailScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PhotoDetailScreen: React.FC<PhotoDetailScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-full min-h-screen bg-black flex items-center justify-center">
      <img 
        src="https://picsum.photos/seed/temple/600/1000" 
        alt="Temple view" 
        className="max-h-screen w-auto object-contain"
      />
      
      <button 
        onClick={() => onNavigate(Screen.Home)}
        className="absolute top-5 left-5 bg-black bg-opacity-50 text-white rounded-full p-2"
      >
        <ChevronLeftIcon />
      </button>

      <div className="absolute bottom-5 right-5 flex flex-col items-center gap-2 text-white">
        <button className="bg-black bg-opacity-30 rounded-full p-3 transform hover:scale-110 transition-transform">
            <HeartIcon filled={true} />
        </button>
        <span className="font-bold text-shadow">450k</span>
      </div>
    </div>
  );
};

export default PhotoDetailScreen;
