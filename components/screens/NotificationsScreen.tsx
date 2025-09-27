import React from 'react';
// FIX: Changed import path to be relative.
import { Screen } from '../../types';
// FIX: Changed import path to be relative.
import { ChevronLeftIcon } from '../icons/Icons';

interface NotificationsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const notifications = [
    { id: 1, user: 'John Doe', avatar: 'https://picsum.photos/id/10/100/100', action: 'curtiu sua foto.', time: 'há 10m', postThumb: 'https://picsum.photos/id/1015/100/100' },
    { id: 2, user: 'Jane Smith', avatar: 'https://picsum.photos/id/11/100/100', action: 'começou a seguir você.', time: 'há 1h', postThumb: null },
    { id: 3, user: 'Mike Johnson', avatar: 'https://picsum.photos/id/12/100/100', action: 'comentou: "Foto incrível! 📸"', time: 'há 3h', postThumb: 'https://picsum.photos/id/1018/100/100' },
];

const NotificationCard: React.FC<{ notification: typeof notifications[0] }> = ({ notification }) => (
    <div className="flex items-center p-4 space-x-4 border-b border-gray-100">
        <img src={notification.avatar} alt={notification.user} className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1">
            <p className="text-gray-800">
                <span className="font-semibold">{notification.user}</span> {notification.action}
            </p>
            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        </div>
        {notification.postThumb && (
            <img src={notification.postThumb} alt="Post thumbnail" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
        )}
    </div>
);


const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-full">
      <header className="p-4 flex items-center border-b border-gray-200 sticky top-0 bg-white z-10">
        <button onClick={() => onNavigate(Screen.Home)} className="text-gray-600">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 mx-auto">Notificações</h1>
      </header>
      
      <div className="p-4">
        <h2 className="text-lg font-bold text-orange-500">Hoje</h2>
      </div>

      <div>
        {notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;