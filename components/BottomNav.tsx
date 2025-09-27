import React from 'react';
// FIX: Changed import path to be relative.
import { Screen } from '../types';
// FIX: Changed import path to be relative.
import { HomeIcon, ChatIcon, NotificationIcon, UserIcon, TrophyIcon } from './icons/Icons';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const NavItem: React.FC<{
  screen: Screen;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  children: React.ReactNode;
}> = ({ screen, activeScreen, onNavigate, children }) => {
  const isActive = activeScreen === screen;
  return (
    <button
      onClick={() => onNavigate(screen)}
      className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
        isActive ? 'text-orange-500' : 'text-gray-400'
      }`}
    >
      {children}
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 px-4">
        <NavItem screen={Screen.Home} activeScreen={activeScreen} onNavigate={onNavigate}>
          <HomeIcon />
        </NavItem>
        <NavItem screen={Screen.Chat} activeScreen={activeScreen} onNavigate={onNavigate}>
          <ChatIcon />
        </NavItem>
        
        <button 
          onClick={() => onNavigate(Screen.Achievements)}
          className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center -mt-8 shadow-lg shadow-orange-300 transform hover:scale-105 transition-transform duration-200"
        >
          <TrophyIcon />
        </button>

        <NavItem screen={Screen.Notifications} activeScreen={activeScreen} onNavigate={onNavigate}>
          <div className="relative">
            <NotificationIcon />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 text-white text-xs items-center justify-center">3</span>
            </span>
          </div>
        </NavItem>
        <NavItem screen={Screen.Profile} activeScreen={activeScreen} onNavigate={onNavigate}>
          <UserIcon />
        </NavItem>
      </div>
    </footer>
  );
};

export default BottomNav;
