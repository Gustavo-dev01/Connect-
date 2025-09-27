import React, { useState, useRef } from 'react';
import { Screen, UserProfile } from '../../types';
import { ChevronLeftIcon, EditIcon } from '../icons/Icons';

interface EditProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onNavigate, userProfile, onUpdateProfile }) => {
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdateProfile({ name, bio, avatar });
    onNavigate(Screen.Profile);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-gray-200 sticky top-0 bg-white z-10">
        <button onClick={() => onNavigate(Screen.Profile)} className="text-gray-600">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Editar Perfil</h1>
        <button 
          onClick={handleSave} 
          className="font-semibold text-orange-500 hover:text-orange-600"
        >
          Salvar
        </button>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28">
            <img src={avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            <button 
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200"
              aria-label="Alterar foto de perfil"
            >
              <EditIcon />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome de usuário</label>
            <input 
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;