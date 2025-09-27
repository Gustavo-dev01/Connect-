import React, { useState } from 'react';
import { Screen, Chat, Message } from '../../types';
import { ChevronLeftIcon, SendIcon } from '../icons/Icons';

interface ChatDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  chat: Chat;
}

const initialMessages: Message[] = [
    { id: 1, text: 'Ei, como vai você?', sender: 'other', timestamp: '10:00' },
    { id: 2, text: 'Tudo bem, obrigado! Apenas trabalhando em um novo projeto. E você?', sender: 'me', timestamp: '10:01' },
    { id: 3, text: 'O mesmo aqui. Um pouco ocupado, mas são coisas empolgantes.', sender: 'other', timestamp: '10:01' },
    { id: 4, text: 'Legal! Devemos colocar o papo em dia alguma hora.', sender: 'me', timestamp: '10:02' },
];

const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ onNavigate, chat }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const message: Message = {
            id: messages.length + 1,
            text: newMessage.trim(),
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="p-4 flex items-center border-b border-gray-200 sticky top-0 bg-white z-10 flex-shrink-0">
                <button onClick={() => onNavigate(Screen.Chat)} className="text-gray-600 mr-4">
                    <ChevronLeftIcon />
                </button>
                <img src={chat.avatar} alt={chat.user} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">{chat.user}</h1>
                    <p className="text-xs text-green-500">Online</p>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 group ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'other' && <img src={chat.avatar} className="w-6 h-6 rounded-full" />}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${msg.sender === 'me' ? 'bg-orange-500 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg'}`}>
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${msg.sender === 'me' ? 'text-orange-100' : 'text-gray-400'} text-right`}>
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
            </main>

            <footer className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
                <input 
                    type="text" 
                    placeholder="Digite uma mensagem..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-gray-100 rounded-full py-3 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button 
                    onClick={handleSendMessage}
                    className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center transform hover:scale-105 transition-transform"
                >
                    <SendIcon />
                </button>
            </footer>
        </div>
    );
};

export default ChatDetailScreen;