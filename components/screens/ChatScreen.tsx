import React from 'react';
import { Screen, Chat } from '../../types';
import { ChevronLeftIcon } from '../icons/Icons';

interface ChatScreenProps {
  onNavigate: (screen: Screen, params?: any) => void;
}

const chats: Chat[] = [
  { id: 1, user: 'John Doe', avatar: 'https://picsum.photos/id/10/100/100', lastMessage: 'Ei, como vai você?', time: 'há 10m', unreadCount: 2 },
  { id: 2, user: 'Jane Smith', avatar: 'https://picsum.photos/id/11/100/100', lastMessage: 'Até amanhã!', time: 'há 1h', unreadCount: 0 },
  { id: 3, user: 'Mike Johnson', avatar: 'https://picsum.photos/id/12/100/100', lastMessage: 'Haha, que engraçado 😂', time: 'há 3h', unreadCount: 0 },
  { id: 4, user: 'Sarah Lee', avatar: 'https://picsum.photos/id/13/100/100', lastMessage: 'Você pode me enviar o arquivo?', time: 'ontem', unreadCount: 1 },
];

const ChatCard: React.FC<{ chat: Chat, onNavigate: (screen: Screen, params?: any) => void }> = ({ chat, onNavigate }) => (
    <div 
      className="flex items-center p-4 space-x-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
      onClick={() => onNavigate(Screen.ChatDetail, { chat })}
    >
        <div className="relative">
            <img src={chat.avatar} alt={chat.user} className="w-14 h-14 rounded-full flex-shrink-0" />
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-white"></span>
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{chat.user}</p>
                <p className="text-xs text-gray-400">{chat.time}</p>
            </div>
            <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500 truncate max-w-xs">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unreadCount}
                    </span>
                )}
            </div>
        </div>
    </div>
);

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-full">
      <header className="p-4 flex items-center border-b border-gray-200 sticky top-0 bg-white z-10">
        <button onClick={() => onNavigate(Screen.Home)} className="text-gray-600">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 mx-auto">Conversas</h1>
      </header>
      
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
          <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar" 
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400" 
              />
              <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-search"></i>
              </div>
          </div>
      </div>

      <div>
        {chats.map(chat => (
            <ChatCard key={chat.id} chat={chat} onNavigate={onNavigate}/>
        ))}
      </div>
    </div>
  );
};

export default ChatScreen;