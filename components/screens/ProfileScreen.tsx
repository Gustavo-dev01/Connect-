import React from 'react';
// FIX: Changed import path to be relative.
import { Screen, UserProfile } from '../../types';
// FIX: Changed import path to be relative.
import { ChevronLeftIcon, PlusIcon, SignOutIcon } from '../icons/Icons';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
}

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const posts = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/${i + 100}/300/300`);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, userProfile }) => {
  return (
    <div className="bg-white min-h-full relative">
      <header className="p-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => onNavigate(Screen.Home)} className="text-gray-600">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{userProfile.name}</h1>
        <div className="w-6"></div>
      </header>

      <div className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-orange-400 to-red-500">
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              className="w-full h-full rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
            <p className="text-md text-gray-500">{userProfile.bio}</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl flex justify-around items-center">
          <StatItem value="52" label="Publicações" />
          <StatItem value="250" label="Seguindo" />
          <StatItem value="4.5k" label="Seguidores" />
        </div>

        <div className="mt-6 space-y-3">
            <button 
                onClick={() => onNavigate(Screen.EditProfile)}
                className="w-full text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
                Editar Perfil
            </button>
            <button 
                onClick={() => onNavigate(Screen.SignIn)}
                className="w-full flex items-center justify-center gap-2 text-center py-2 px-4 border border-red-200 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
                <SignOutIcon />
                Sair
            </button>
        </div>
      </div>
      
      {/* Post Grid */}
      <div className="px-2 mt-4">
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-md overflow-hidden cursor-pointer" onClick={() => onNavigate(Screen.PhotoDetail)}>
              <img src={post} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      
      <button className="fixed bottom-24 right-4 bg-gradient-to-br from-orange-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-orange-300">
          <PlusIcon />
      </button>

    </div>
  );
};

export default ProfileScreen;