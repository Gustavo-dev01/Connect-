import React from 'react';

const AuthHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div className="relative bg-gradient-to-br from-orange-400 to-red-400 pt-16 pb-24 text-white text-center overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-orange-100">{subtitle}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M1440 120V0C1200 40 960 60 720 60C480 60 240 40 0 0V120H1440Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default AuthHeader;
