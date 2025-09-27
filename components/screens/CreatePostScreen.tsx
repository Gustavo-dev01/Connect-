import React, { useState, useRef } from 'react';
// FIX: Changed import path to be relative.
import { Screen, Post } from '../../types';
// FIX: Changed import path to be relative.
import { TagUserIcon, LocationPinIcon, UploadIcon } from '../icons/Icons';

interface CreatePostScreenProps {
  onNavigate: (screen: Screen) => void;
  onAddPost: (post: Omit<Post, 'id' | 'user' | 'avatar' | 'likes' | 'dislikes' | 'comments'>) => void;
}

const MAX_CAPTION_LENGTH = 280;

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ onNavigate, onAddPost }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [taggedPeople, setTaggedPeople] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleTagPeople = () => {
    const name = prompt("Quem você gostaria de marcar?");
    if (name && name.trim() !== '' && !taggedPeople.includes(name.trim())) {
      setTaggedPeople([...taggedPeople, name.trim()]);
    } else if (name && taggedPeople.includes(name.trim())) {
      alert(`'${name}' já foi marcado(a).`);
    }
  };

  const handleRemoveTag = (nameToRemove: string) => {
    setTaggedPeople(taggedPeople.filter(name => name !== nameToRemove));
  };

  const handleAddLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Localização adicionada: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        () => {
          alert('Não foi possível obter sua localização.');
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  };

  const handleShare = () => {
    if (!imagePreview && !caption.trim()) {
      alert('Por favor, adicione uma imagem ou uma legenda para compartilhar.');
      return;
    }
    
    onAddPost({
      caption,
      image: imagePreview,
    });

    onNavigate(Screen.Home);
  };


  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-gray-200 sticky top-0 bg-white z-10">
        <button 
          onClick={() => onNavigate(Screen.Home)} 
          className="text-gray-800 bg-gray-100 hover:bg-gray-200 font-semibold py-2 px-5 rounded-full text-sm transition-colors"
        >
          Cancelar
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Nova Publicação</h1>
        <button 
          onClick={handleShare} 
          className="text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-semibold py-2 px-5 rounded-full text-sm transition-all transform hover:scale-105"
        >
          Compartilhar
        </button>
      </header>

      <div className="flex-1 bg-white">
        {/* Image Preview */}
        {imagePreview && (
          <div className="p-4">
              <img src={imagePreview} alt="New post preview" className="w-full object-cover max-h-80 rounded-[10px]"/>
          </div>
        )}
        
        {/* Form fields */}
        <div className="p-4">
            <textarea
                placeholder="Escreva uma legenda..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={MAX_CAPTION_LENGTH}
                className="w-full h-28 p-4 text-base bg-white border border-gray-200 rounded-[10px] resize-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 placeholder-gray-400 transition-colors duration-300"
            />
            <p className={`text-right text-sm mt-1 ${caption.length >= MAX_CAPTION_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
              {caption.length} / {MAX_CAPTION_LENGTH}
            </p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        <div className="border-y border-gray-200">
            {/* Upload Image */}
            <button onClick={handleImageUploadClick} className="w-full text-left p-4 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <UploadIcon />
                Carregar Imagem
            </button>

            {/* Tag People */}
            <div className="border-t border-gray-200">
                <button onClick={handleTagPeople} className="w-full text-left p-4 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-3">
                    <TagUserIcon />
                    Marcar Pessoas
                </button>
                {taggedPeople.length > 0 && (
                  <div className="px-4 pb-4 flex flex-wrap gap-2 bg-white">
                    {taggedPeople.map((person, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full flex items-center">
                        <span>{person}</span>
                        <button 
                          onClick={() => handleRemoveTag(person)} 
                          className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                          aria-label={`Remover marcação de ${person}`}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
            
            {/* Add Location */}
            <div className="border-t border-gray-200">
                <button onClick={handleAddLocation} className="w-full text-left p-4 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-3">
                    <LocationPinIcon />
                    Adicionar Localização
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostScreen;