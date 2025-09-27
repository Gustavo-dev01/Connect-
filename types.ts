export enum Screen {
  SignIn,
  SignUp,
  Home,
  Chat,
  ChatDetail,
  CreatePost,
  Notifications,
  Profile,
  Achievements,
  PhotoDetail,
  Comments,
  EditProfile,
  ForgotPassword,
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
}

export interface Post {
  id: number;
  user: string;
  avatar: string;
  image: string | null;
  caption: string;
  likes: number;
  dislikes: number;
  comments: number;
}

export interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
}

export interface Chat {
  id: number;
  user: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}