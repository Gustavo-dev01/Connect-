import React, { useState, useRef } from 'react';
import { Screen, Post, Comment, UserProfile } from './types';

import BottomNav from './components/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import ChatScreen from './components/screens/ChatScreen';
import NotificationsScreen from './components/screens/NotificationsScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import AchievementsScreen from './components/screens/AchievementsScreen';
import PhotoDetailScreen from './components/screens/PhotoDetailScreen';
import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import CreatePostScreen from './components/screens/CreatePostScreen';
import ChatDetailScreen from './components/screens/ChatDetailScreen';
import CommentScreen from './components/screens/CommentScreen';
import EditProfileScreen from './components/screens/EditProfileScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';

const initialPosts: Post[] = [
  { id: 1, user: 'John Doe', avatar: 'https://picsum.photos/id/10/50/50', image: 'https://picsum.photos/seed/picsum/600/800', caption: 'Lindo dia aqui fora! ☀️', likes: 1204, dislikes: 12, comments: 2 },
  { id: 2, user: 'Jane Smith', avatar: 'https://picsum.photos/id/11/50/50', image: 'https://picsum.photos/seed/food/600/700', caption: 'Experimentando uma nova receita. Deliciosa!', likes: 2345, dislikes: 5, comments: 1 },
  { id: 3, user: 'Mike Johnson', avatar: 'https://picsum.photos/id/12/50/50', image: 'https://picsum.photos/seed/city/600/900', caption: 'Luzes da cidade.', likes: 876, dislikes: 50, comments: 42 },
];

const initialComments: Record<number, Comment[]> = {
    1: [
        { id: 1, user: 'Jane Smith', avatar: 'https://picsum.photos/id/11/50/50', text: 'Parece incrível!', timestamp: 'há 2h', likes: 15, dislikes: 1 },
        { id: 2, user: 'Mike Johnson', avatar: 'https://picsum.photos/id/12/50/50', text: 'Onde é isso?', timestamp: 'há 1h', likes: 2, dislikes: 0 },
    ],
    2: [
        { id: 3, user: 'John Doe', avatar: 'https://picsum.photos/id/10/50/50', text: 'Receita, por favor! 🙏', timestamp: 'há 30m', likes: 22, dislikes: 3 },
    ]
};

const newPostData = {
  users: ['Alex Ray', 'Mia Wong', 'Leo Chen', 'Zoe Kim'],
  avatars: ['https://picsum.photos/id/15/50/50', 'https://picsum.photos/id/16/50/50', 'https://picsum.photos/id/17/50/50', 'https://picsum.photos/id/18/50/50'],
  images: ['https://picsum.photos/seed/nature/600/800', 'https://picsum.photos/seed/travel/600/750', 'https://picsum.photos/seed/animals/600/900', 'https://picsum.photos/seed/tech/600/700'],
  captions: ['Explorando a natureza!', 'Outra aventura nos espera.', 'Cantinhos aconchegantes.', 'O futuro é agora.'],
};


const App = () => {
  const [activeScreen, setActiveScreen] = useState(Screen.SignIn);
  const [screenParams, setScreenParams] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Jovi Daniel Jr.',
    bio: 'Fotógrafo',
    avatar: 'https://picsum.photos/id/237/200/200',
  });
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [comments, setComments] = useState<Record<number, Comment[]>>(initialComments);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [dislikedPosts, setDislikedPosts] = useState<Set<number>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set([1, 3]));
  const [dislikedComments, setDislikedComments] = useState<Set<number>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullPosition, setPullPosition] = useState(0);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const REFRESH_THRESHOLD = 80;


  const handleNavigate = (screen: Screen, params: any = null) => {
    setActiveScreen(screen);
    setScreenParams(params);
    if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
    }
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
  };
  
  const handleAddPost = (post: Omit<Post, 'id' | 'user' | 'avatar' | 'likes' | 'dislikes' | 'comments'>) => {
    const newPost: Post = {
        id: Date.now(),
        user: userProfile.name,
        avatar: userProfile.avatar,
        likes: 0,
        dislikes: 0,
        comments: 0,
        ...post,
    };
    setPosts([newPost, ...posts]);
  };

  const handleAddComment = (postId: number, text: string) => {
    const newComment: Comment = {
        id: Date.now(),
        user: userProfile.name,
        avatar: userProfile.avatar,
        text: text,
        timestamp: 'Agora mesmo',
        likes: 0,
        dislikes: 0,
    };

    setComments(prevComments => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newComment]
    }));

    setPosts(prevPosts =>
        prevPosts.map(p =>
            p.id === postId ? { ...p, comments: p.comments + 1 } : p
        )
    );
  };

  const handleLikeCommentToggle = (postId: number, commentId: number) => {
    const newLikedComments = new Set(likedComments);
    const newDislikedComments = new Set(dislikedComments);
    let likeChange = 0;
    let dislikeChange = 0;

    if (newLikedComments.has(commentId)) {
        newLikedComments.delete(commentId);
        likeChange = -1;
    } else {
        newLikedComments.add(commentId);
        likeChange = 1;
        if (newDislikedComments.has(commentId)) {
            newDislikedComments.delete(commentId);
            dislikeChange = -1;
        }
    }

    setLikedComments(newLikedComments);
    setDislikedComments(newDislikedComments);
    setComments(prevComments => {
        const postComments = prevComments[postId] || [];
        return {
            ...prevComments,
            [postId]: postComments.map(c =>
                c.id === commentId ? { ...c, likes: c.likes + likeChange, dislikes: c.dislikes + dislikeChange } : c
            )
        };
    });
  };

  const handleDislikeCommentToggle = (postId: number, commentId: number) => {
    const newLikedComments = new Set(likedComments);
    const newDislikedComments = new Set(dislikedComments);
    let likeChange = 0;
    let dislikeChange = 0;

    if (newDislikedComments.has(commentId)) {
        newDislikedComments.delete(commentId);
        dislikeChange = -1;
    } else {
        newDislikedComments.add(commentId);
        dislikeChange = 1;
        if (newLikedComments.has(commentId)) {
            newLikedComments.delete(commentId);
            likeChange = -1;
        }
    }

    setLikedComments(newLikedComments);
    setDislikedComments(newDislikedComments);
    setComments(prevComments => {
        const postComments = prevComments[postId] || [];
        return {
            ...prevComments,
            [postId]: postComments.map(c =>
                c.id === commentId ? { ...c, likes: c.likes + likeChange, dislikes: c.dislikes + dislikeChange } : c
            )
        };
    });
  };

  const handleLikeToggle = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    const newDislikedPosts = new Set(dislikedPosts);
    let likeChange = 0;
    let dislikeChange = 0;

    if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
        likeChange = -1;
    } else {
        newLikedPosts.add(postId);
        likeChange = 1;
        if (newDislikedPosts.has(postId)) {
            newDislikedPosts.delete(postId);
            dislikeChange = -1;
        }
    }

    setLikedPosts(newLikedPosts);
    setDislikedPosts(newDislikedPosts);
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + likeChange, dislikes: p.dislikes + dislikeChange } : p));
  };

  const handleDislikeToggle = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    const newDislikedPosts = new Set(dislikedPosts);
    let likeChange = 0;
    let dislikeChange = 0;

    if (newDislikedPosts.has(postId)) {
        newDislikedPosts.delete(postId);
        dislikeChange = -1;
    } else {
        newDislikedPosts.add(postId);
        dislikeChange = 1;
        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId);
            likeChange = -1;
        }
    }

    setLikedPosts(newLikedPosts);
    setDislikedPosts(newDislikedPosts);
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + likeChange, dislikes: p.dislikes + dislikeChange } : p));
  };
  
  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    const generateNewPost = (): Post => {
      const randomIdx = Math.floor(Math.random() * 4);
      return {
        id: Date.now() + Math.random(),
        user: newPostData.users[randomIdx],
        avatar: newPostData.avatars[randomIdx],
        image: newPostData.images[randomIdx],
        caption: newPostData.captions[randomIdx],
        likes: Math.floor(Math.random() * 1000),
        dislikes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
      };
    };

    setPosts(prevPosts => [generateNewPost(), ...prevPosts]);
    setIsRefreshing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (activeScreen !== Screen.Home) return;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (activeScreen !== Screen.Home || !mainContentRef.current) return;
    if (mainContentRef.current.scrollTop === 0 && !isRefreshing) {
      const touchY = e.targetTouches[0].clientY;
      const pullDistance = Math.max(0, (touchY - touchStartY.current) * 0.5);
      setPullPosition(pullDistance);
    }
  };
  
  const handleTouchEnd = () => {
    if (activeScreen !== Screen.Home) return;
    if (pullPosition > REFRESH_THRESHOLD && !isRefreshing) {
      handleRefresh();
    }
    setPullPosition(0);
    touchStartY.current = 0;
  };


  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.SignIn:
        return <SignInScreen onNavigate={handleNavigate} />;
      case Screen.SignUp:
        return <SignUpScreen onNavigate={handleNavigate} />;
      case Screen.ForgotPassword:
        return <ForgotPasswordScreen onNavigate={handleNavigate} />;
      case Screen.Home:
        return <HomeScreen 
                    onNavigate={handleNavigate} 
                    posts={posts} 
                    userAvatar={userProfile.avatar}
                    onScrollToTopRequest={() => mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                    likedPosts={likedPosts}
                    dislikedPosts={dislikedPosts}
                    onLikeToggle={handleLikeToggle}
                    onDislikeToggle={handleDislikeToggle}
                    isRefreshing={isRefreshing}
                    pullPosition={pullPosition}
                />;
      case Screen.Chat:
        return <ChatScreen onNavigate={handleNavigate} />;
      case Screen.Notifications:
        return <NotificationsScreen onNavigate={handleNavigate} />;
      case Screen.Profile:
        return <ProfileScreen onNavigate={handleNavigate} userProfile={userProfile} />;
      case Screen.Achievements:
        return <AchievementsScreen onNavigate={handleNavigate} />;
      case Screen.PhotoDetail:
        return <PhotoDetailScreen onNavigate={handleNavigate} />;
      case Screen.CreatePost:
        return <CreatePostScreen onNavigate={handleNavigate} onAddPost={handleAddPost} />;
       case Screen.ChatDetail:
        return <ChatDetailScreen onNavigate={handleNavigate} chat={screenParams.chat} />;
       case Screen.Comments:
        return <CommentScreen 
                    onNavigate={handleNavigate} 
                    post={screenParams.post} 
                    comments={comments[screenParams.post.id] || []} 
                    onAddComment={handleAddComment} 
                    likedComments={likedComments}
                    onLikeCommentToggle={handleLikeCommentToggle}
                    dislikedComments={dislikedComments}
                    onDislikeCommentToggle={handleDislikeCommentToggle}
                    userAvatar={userProfile.avatar}
                />;
      case Screen.EditProfile:
        return <EditProfileScreen 
                    onNavigate={handleNavigate}
                    userProfile={userProfile}
                    onUpdateProfile={handleUpdateProfile}
                />;
      default:
        return <HomeScreen 
                    onNavigate={handleNavigate} 
                    posts={posts} 
                    userAvatar={userProfile.avatar}
                    onScrollToTopRequest={() => mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                    likedPosts={likedPosts}
                    dislikedPosts={dislikedPosts}
                    onLikeToggle={handleLikeToggle}
                    onDislikeToggle={handleDislikeToggle}
                    isRefreshing={isRefreshing}
                    pullPosition={pullPosition}
                />;
    }
  };

  const showBottomNav = [
    Screen.Home,
    Screen.Chat,
    Screen.Notifications,
    Screen.Profile,
    Screen.Achievements
  ].includes(activeScreen);

  const isAuthScreen = activeScreen === Screen.SignIn || activeScreen === Screen.SignUp || activeScreen === Screen.ForgotPassword;

  return (
    <div className={
        isAuthScreen
        ? "h-screen bg-gray-100"
        : "max-w-md mx-auto h-screen shadow-2xl flex flex-col relative bg-white overflow-hidden"
    }>
        <main 
            ref={mainContentRef} 
            className={`flex-1 overflow-y-auto ${showBottomNav ? 'pb-20' : ''} ${isAuthScreen ? 'flex items-center justify-center p-4' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            >
            {renderScreen()}
        </main>
        {showBottomNav && <BottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;