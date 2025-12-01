import React from 'react';

export const MonkeyAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <g transform="translate(50, 50)">
      {/* Body */}
      <circle cx="0" cy="10" r="25" fill="#8B4513" />
      <circle cx="0" cy="10" r="15" fill="#A0522D" />
      
      {/* Face */}
      <circle cx="0" cy="-15" r="22" fill="#8B4513" />
      <ellipse cx="0" cy="-12" rx="18" ry="14" fill="#F4A460" />
      
      {/* Ears */}
      <circle cx="-22" cy="-15" r="8" fill="#8B4513" />
      <circle cx="-22" cy="-15" r="4" fill="#F4A460" />
      <circle cx="22" cy="-15" r="8" fill="#8B4513" />
      <circle cx="22" cy="-15" r="4" fill="#F4A460" />
      
      {/* Eyes */}
      <circle cx="-8" cy="-18" r="3" fill="black" />
      <circle cx="8" cy="-18" r="3" fill="black" />
      <circle cx="-9" cy="-19" r="1" fill="white" />
      <circle cx="7" cy="-19" r="1" fill="white" />
      
      {/* Mouth */}
      <path d="M-8 -5 Q0 2 8 -5" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Cap (Code Monkey style) */}
      <path d="M-22 -25 Q0 -40 22 -25" stroke="#3B82F6" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="-10" y="-32" width="20" height="10" rx="2" fill="#3B82F6" />
    </g>
  </svg>
);

export const BananaAsset = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
    <path 
      d="M30 80 Q10 50 30 20 Q50 10 80 15 Q60 40 50 80 Q40 90 30 80" 
      fill="#FFD700" 
      stroke="#DAA520" 
      strokeWidth="2"
    />
    <path d="M30 20 Q50 10 80 15" fill="none" stroke="#DAA520" strokeWidth="2" opacity="0.5" />
  </svg>
);

export const TreeAsset = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    {/* Trunk */}
    <path d="M40 90 L45 50 L55 50 L60 90 Z" fill="#5D4037" />
    
    {/* Leaves Layer 1 */}
    <circle cx="50" cy="45" r="25" fill="#2E7D32" />
    <circle cx="35" cy="55" r="20" fill="#2E7D32" />
    <circle cx="65" cy="55" r="20" fill="#2E7D32" />
    
    {/* Leaves Layer 2 (Highlight) */}
    <circle cx="50" cy="40" r="20" fill="#4CAF50" />
    <circle cx="40" cy="50" r="15" fill="#4CAF50" />
    <circle cx="60" cy="50" r="15" fill="#4CAF50" />
  </svg>
);

export const GrassTile = ({ variant = 0 }: { variant?: number }) => {
  const opacity = 0.05 + (variant % 3) * 0.02;
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#4ADE80] border-2 border-[#22C55E]/50 rounded-lg shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/5" style={{ opacity }} />
      {/* Grass blades pattern */}
      <svg width="100%" height="100%" className="absolute bottom-0 opacity-30">
        <path d="M10 60 Q12 50 15 60" stroke="#15803D" fill="none" />
        <path d="M30 60 Q35 45 40 60" stroke="#15803D" fill="none" />
        <path d="M50 60 Q52 55 55 60" stroke="#15803D" fill="none" />
      </svg>
    </div>
  );
};

export const WaterTile = () => (
  <div className="w-full h-full relative bg-[#60A5FA] rounded-lg border-2 border-[#3B82F6]/50 overflow-hidden animate-pulse-slow">
    <div className="absolute inset-0 opacity-20">
      <svg width="100%" height="100%">
        <path d="M0 20 Q25 10 50 20 T100 20" stroke="white" fill="none" strokeWidth="2" />
        <path d="M0 40 Q25 30 50 40 T100 40" stroke="white" fill="none" strokeWidth="2" />
      </svg>
    </div>
  </div>
);

