import React from 'react';
// FIX: Changed import path to be relative.
import { Screen, Post } from '../../types';
// FIX: Changed import path to be relative.
import { HeartIcon, DislikeIcon, CommentIcon, SpinnerIcon } from '../icons/Icons';

interface HomeScreenProps {
  onNavigate: (screen: Screen, params?: any) => void;
  posts: Post[];
  userAvatar: string;
  onScrollToTopRequest: () => void;
  likedPosts: Set<number>;
  dislikedPosts: Set<number>;
  onLikeToggle: (postId: number) => void;
  onDislikeToggle: (postId: number) => void;
  isRefreshing: boolean;
  pullPosition: number;
}

const stories = [
  { id: 1, name: 'Você', img: 'https://picsum.photos/id/237/100/100' },
  { id: 2, name: 'John', img: 'https://picsum.photos/id/10/100/100' },
  { id: 3, name: 'Jane', img: 'https://picsum.photos/id/11/100/100' },
  { id: 4, name: 'Mike', img: 'https://picsum.photos/id/12/100/100' },
  { id: 5, name: 'Sarah', img: 'https://picsum.photos/id/13/100/100' },
  { id: 6, name: 'Chris', img: 'https://picsum.photos/id/14/100/100' },
];

interface PostCardProps {
    post: Post;
    onNavigate: (screen: Screen, params?: any) => void;
    isLiked: boolean;
    isDisliked: boolean;
    onLikeToggle: (postId: number) => void;
    onDislikeToggle: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onNavigate, isLiked, isDisliked, onLikeToggle, onDislikeToggle }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 flex items-center gap-3">
            <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
            <span className="font-semibold text-gray-800">{post.user}</span>
        </div>
        {post.image && <img src={post.image} alt="Post" className="w-full h-auto cursor-pointer" onClick={() => onNavigate(Screen.PhotoDetail)}/>}
        <div className="p-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => onLikeToggle(post.id)}><HeartIcon filled={isLiked} /></button>
                    <span className="font-semibold text-gray-800 text-sm">{post.likes > 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <button onClick={() => onDislikeToggle(post.id)}><DislikeIcon filled={isDisliked} /></button>
                    <span className="font-semibold text-gray-800 text-sm">{post.dislikes > 1000 ? `${(post.dislikes / 1000).toFixed(1)}k` : post.dislikes}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onNavigate(Screen.Comments, { post })}><CommentIcon /></button>
                    <span className="font-semibold text-gray-800 text-sm">{post.comments > 1000 ? `${(post.comments / 1000).toFixed(1)}k` : post.comments}</span>
                </div>
            </div>
            <p className="text-gray-600 mt-2">
                <span className="font-semibold text-gray-800">{post.user}</span> {post.caption}
            </p>
        </div>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onNavigate, 
  posts, 
  userAvatar,
  onScrollToTopRequest, 
  likedPosts, 
  dislikedPosts, 
  onLikeToggle, 
  onDislikeToggle,
  isRefreshing,
  pullPosition
}) => {
  const REFRESH_THRESHOLD = 80;
  
  const pullRotation = Math.min(pullPosition / REFRESH_THRESHOLD * 180, 180);

  return (
    <div className="bg-gray-50 min-h-full">
      <div 
        className="absolute top-0 left-0 right-0 flex justify-center items-center transition-transform duration-200"
        style={{ 
          height: `${REFRESH_THRESHOLD}px`,
          transform: `translateY(${isRefreshing ? 0 : pullPosition - REFRESH_THRESHOLD}px)`
        }}
      >
        <div 
          className="p-2 bg-white rounded-full shadow-md"
          style={{ 
            opacity: isRefreshing ? 1 : Math.min(1, pullPosition / REFRESH_THRESHOLD),
            transform: isRefreshing ? 'scale(1)' : 'scale(0.8)'
          }}
        >
          {isRefreshing ? (
            <SpinnerIcon />
          ) : (
            <i 
              className="fa-solid fa-arrow-down text-orange-500 text-xl transition-transform duration-100"
              style={{ transform: `rotate(${pullRotation}deg)` }}
            ></i>
          )}
        </div>
      </div>
      <div 
        className="transition-transform duration-300 bg-gray-50" 
        style={{ transform: `translateY(${isRefreshing ? REFRESH_THRESHOLD : 0}px)` }}
      >
        <header className="p-4 flex justify-between items-center bg-white border-b border-gray-200 sticky top-0 z-10">
          <h1 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer"
            onClick={onScrollToTopRequest}
          >
            Connect+
          </h1>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate(Screen.Notifications)} className="text-gray-600 hover:text-orange-500 relative">
              <i className="fa-regular fa-bell text-2xl"></i>
            </button>
            <button onClick={() => onNavigate(Screen.Chat)} className="text-gray-600 hover:text-orange-500">
              <i className="fa-regular fa-paper-plane text-2xl"></i>
            </button>
          </div>
        </header>
        
        {/* Stories */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {stories.map(story => (
              <div key={story.id} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-orange-400 to-red-500">
                  <img src={story.img} alt={story.name} className="w-full h-full rounded-full border-2 border-white" />
                </div>
                <span className="text-xs text-gray-600 mt-1 block">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Prompt */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={userAvatar} alt="Your avatar" className="w-10 h-10 rounded-full" />
            <button 
              onClick={() => onNavigate(Screen.CreatePost)}
              className="flex-1 text-left bg-gray-100 rounded-full py-2 px-4 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              O que você está pensando?
            </button>
            <button onClick={() => onNavigate(Screen.CreatePost)} className="text-gray-500 hover:text-orange-500">
              <i className="fa-regular fa-image text-2xl"></i>
            </button>
          </div>
        </div>
        
        {/* Feed */}
        <div className="p-4">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onNavigate={onNavigate}
              isLiked={likedPosts.has(post.id)}
              isDisliked={dislikedPosts.has(post.id)}
              onLikeToggle={onLikeToggle}
              onDislikeToggle={onDislikeToggle}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;