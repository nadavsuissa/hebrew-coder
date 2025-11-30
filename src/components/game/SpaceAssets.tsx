import React from 'react';

export const RoverAsset = ({ color = "#3B82F6" }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <g transform="translate(50, 50)">
       {/* Wheels */}
       <rect x="-35" y="-35" width="15" height="25" rx="4" fill="#1F2937" />
       <rect x="20" y="-35" width="15" height="25" rx="4" fill="#1F2937" />
       <rect x="-35" y="10" width="15" height="25" rx="4" fill="#1F2937" />
       <rect x="20" y="10" width="15" height="25" rx="4" fill="#1F2937" />
       
       {/* Body */}
       <rect x="-25" y="-25" width="50" height="50" rx="8" fill="#E5E7EB" stroke={color} strokeWidth="2" />
       
       {/* Solar Panel / Detail */}
       <rect x="-15" y="-15" width="30" height="20" fill="#1E3A8A" opacity="0.8" />
       
       {/* Head/Camera */}
       <circle cx="0" cy="15" r="8" fill={color} />
       <circle cx="0" cy="15" r="3" fill="#FFFFFF" className="animate-pulse" />
    </g>
  </svg>
);

export const CrystalAsset = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
    <path d="M50 10 L80 40 L50 90 L20 40 Z" fill="url(#crystalGradient)" stroke="#60A5FA" strokeWidth="1" />
    <path d="M50 10 L50 90" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
    <path d="M20 40 L80 40" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
    
    <defs>
        <linearGradient id="crystalGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
    </defs>
  </svg>
);

export const RockAsset = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <path d="M20 80 L30 40 L60 20 L80 50 L90 80 L20 80 Z" fill="#4B5563" />
    <path d="M30 40 L50 50 L60 20" fill="none" stroke="#374151" strokeWidth="2" />
    <path d="M60 20 L70 60 L90 80" fill="none" stroke="#374151" strokeWidth="2" />
  </svg>
);

export const MarsTile = ({ variant = 0 }: { variant?: number }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#7C2D12] border-2 border-[#9A3412] rounded-md shadow-sm">
      {/* Use CSS-based noise effect instead of missing image */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 34%, transparent 35%, transparent),
                           radial-gradient(circle at 60% 50%, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 34%, transparent 35%, transparent),
                           radial-gradient(circle at 40% 80%, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 34%, transparent 35%, transparent)`,
          backgroundSize: '50% 50%, 50% 50%, 50% 50%',
          backgroundPosition: '0% 0%, 100% 0%, 50% 100%'
        }}
      />
      {variant % 3 === 0 && (
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#9A3412] rounded-full opacity-50" />
      )}
      {variant % 5 === 0 && (
          <div className="absolute bottom-3 right-4 w-3 h-3 bg-[#551809] rounded-full opacity-30" />
      )}
    </div>
  );
};

export const TerminalAsset = () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-lg border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
        <div className="text-[8px] text-blue-400 font-mono p-1 text-center leading-tight">
            &gt;_ SYSTEM<br/>READY
        </div>
    </div>
);

