import React from 'react';
// FIX: Changed import path to be relative.
import { Screen } from '../../types';
// FIX: Changed import path to be relative.
import { ChevronLeftIcon } from '../icons/Icons';

interface AchievementsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const achievements = [
  { id: 1, title: 'Primeira Publicação', description: 'Você compartilhou sua primeira publicação!', achieved: true, icon: 'fa-solid fa-camera-retro' },
  { id: 2, title: 'Super Curtidor', description: 'Curtiu 100 publicações.', achieved: true, icon: 'fa-solid fa-heart' },
  { id: 3, title: 'Borboleta Social', description: 'Seguiu 50 pessoas.', achieved: false, icon: 'fa-solid fa-users' },
  { id: 4, title: 'Marco de Seguidor', description: 'Alcançou 1k de seguidores.', achieved: false, icon: 'fa-solid fa-star' },
  { id: 5, title: 'Explorador', description: 'Adicionou localização a 10 publicações.', achieved: true, icon: 'fa-solid fa-map-pin' },
  { id: 6, title: 'Criador', description: 'Publicou 25 vezes.', achieved: false, icon: 'fa-solid fa-pen-nib' },
];

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-full">
      <header className="p-4 flex items-center border-b border-gray-200 sticky top-0 bg-white z-10">
        <button onClick={() => onNavigate(Screen.Home)} className="text-gray-600">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 mx-auto">Conquistas</h1>
      </header>

      <div className="p-4">
         <ul className="space-y-4">
          {achievements.map(ach => (
            <li key={ach.id} className={`p-4 rounded-lg flex items-center space-x-4 transition-all duration-300 ${ach.achieved ? 'bg-orange-50 border-l-4 border-orange-400' : 'bg-gray-100 border-l-4 border-gray-300'}`}>
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${ach.achieved ? 'bg-orange-100 text-orange-500' : 'bg-gray-200 text-gray-400'}`}>
                <i className={`${ach.icon} text-2xl`}></i>
              </div>
              <div>
                <h3 className={`font-bold ${ach.achieved ? 'text-gray-800' : 'text-gray-500'}`}>{ach.title}</h3>
                <p className={`text-sm ${ach.achieved ? 'text-gray-600' : 'text-gray-400'}`}>{ach.description}</p>
              </div>
            </li>
          ))}
         </ul>
      </div>
    </div>
  );
};

export default AchievementsScreen;