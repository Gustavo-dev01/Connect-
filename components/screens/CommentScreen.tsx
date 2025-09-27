import React, { useState, useRef, useEffect } from 'react';
import { Screen, Post, Comment } from '../../types';
import { ChevronLeftIcon, SendIcon, HeartIcon, ReplyIcon, DislikeIcon } from '../icons/Icons';

interface CommentScreenProps {
  onNavigate: (screen: Screen) => void;
  post: Post;
  comments: Comment[];
  onAddComment: (postId: number, text: string) => void;
  likedComments: Set<number>;
  onLikeCommentToggle: (postId: number, commentId: number) => void;
  dislikedComments: Set<number>;
  onDislikeCommentToggle: (postId: number, commentId: number) => void;
  userAvatar: string;
}

const CommentScreen: React.FC<CommentScreenProps> = ({ 
    onNavigate, 
    post, 
    comments, 
    onAddComment,
    likedComments,
    onLikeCommentToggle,
    dislikedComments,
    onDislikeCommentToggle,
    userAvatar
}) => {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const commentsEndRef = useRef<null | HTMLDivElement>(null);
    const inputRef = useRef<null | HTMLInputElement>(null);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        // A small timeout allows the view to settle before scrolling
        if (comments.length) {
            setTimeout(scrollToBottom, 100);
        }
    }, [comments]);


    const handleSendComment = () => {
        if (newComment.trim() === '') return;
        onAddComment(post.id, newComment.trim());
        setNewComment('');
        setReplyingTo(null);
    };

    const handleReplyClick = (username: string) => {
        setReplyingTo(username);
        setNewComment(`@${username} `);
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="p-4 flex items-center border-b border-gray-200 sticky top-0 bg-white z-10 flex-shrink-0">
                <button onClick={() => onNavigate(Screen.Home)} className="text-gray-600 mr-4">
                    <ChevronLeftIcon />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">Comentários</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Original Post Caption */}
                <div className="flex items-start space-x-3 pb-4 border-b border-gray-200 bg-white p-4 rounded-lg shadow-sm">
                    <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
                    <p className="text-gray-800 mt-2 text-sm">
                        <span className="font-semibold">{post.user}</span> {post.caption}
                    </p>
                </div>
                
                {/* Comments List */}
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-3">
                            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <div className="bg-white p-3 rounded-xl shadow-sm">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="font-semibold text-gray-800 text-sm">{comment.user}</span>
                                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-gray-700 mt-1 text-sm">{comment.text}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-2 pl-2">
                                    <button 
                                        onClick={() => onLikeCommentToggle(post.id, comment.id)}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <HeartIcon filled={likedComments.has(comment.id)} className="w-4 h-4" />
                                        <span>{comment.likes > 0 ? comment.likes : ''}</span>
                                    </button>
                                    <button 
                                        onClick={() => onDislikeCommentToggle(post.id, comment.id)}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500 transition-colors"
                                    >
                                        <DislikeIcon filled={dislikedComments.has(comment.id)} className="w-4 h-4" />
                                        <span>{comment.dislikes > 0 ? comment.dislikes : ''}</span>
                                    </button>
                                    <button 
                                        onClick={() => handleReplyClick(comment.user)}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 transition-colors"
                                    >
                                        <ReplyIcon />
                                        <span>Responder</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 flex flex-col items-center">
                        <div className="text-gray-300 mb-4">
                           <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600">Nenhum comentário ainda.</h3>
                        <p className="text-gray-400 text-sm mt-1">Seja o primeiro a compartilhar suas ideias!</p>
                    </div>
                )}
                 <div ref={commentsEndRef} />
            </main>

            <footer className="p-4 bg-white border-t border-gray-200">
                {replyingTo && (
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-2 px-2">
                        <span>Respondendo a <span className="font-semibold text-gray-700">@{replyingTo}</span></span>
                        <button 
                            onClick={() => {
                                setReplyingTo(null);
                                setNewComment('');
                            }} 
                            className="font-semibold text-red-500 hover:text-red-700 flex items-center gap-1"
                            aria-label="Cancelar resposta"
                        >
                           &times; Cancelar
                        </button>
                    </div>
                )}
                <div className="flex items-center gap-3">
                    <img src={userAvatar} alt="Your avatar" className="w-10 h-10 rounded-full" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Adicione um comentário..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                        className="flex-1 bg-gray-100 rounded-full py-3 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button 
                        onClick={handleSendComment}
                        className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center transform hover:scale-105 transition-transform"
                        aria-label="Enviar comentário"
                    >
                        <SendIcon />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default CommentScreen;