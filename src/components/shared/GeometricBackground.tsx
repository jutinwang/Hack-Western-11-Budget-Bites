import React from "react";

export const GeometricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#45bed4]" />

      {/* Large geometric shapes */}
      <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] bg-[#2a9b75] rotate-12 transform-gpu rounded-[100px] opacity-70 blur-3xl" />
      <div className="absolute w-[120%] h-[120%] -bottom-[10%] -right-[10%] bg-[#df591f] -rotate-12 transform-gpu rounded-[100px] opacity-60 blur-3xl" />

      {/* Triangular patterns */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L50,90 L100,0 Z"
            fill="rgba(69, 190, 212, 0.1)"
            className="animate-float-slow transform-gpu"
          />
          <path
            d="M20,0 L50,70 L80,0 Z"
            fill="rgba(42, 155, 117, 0.1)"
            className="animate-float-medium transform-gpu"
          />
          <path
            d="M40,0 L50,50 L60,0 Z"
            fill="rgba(223, 89, 31, 0.1)"
            className="animate-float-fast transform-gpu"
          />
        </svg>
      </div>

      {/* Curvy lines */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q25,40 50,20 T100,20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            className="animate-float-slow transform-gpu"
          />
          <path
            d="M0,40 Q25,60 50,40 T100,40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            className="animate-float-medium transform-gpu"
          />
          <path
            d="M0,60 Q25,80 50,60 T100,60"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            className="animate-float-fast transform-gpu"
          />
        </svg>
      </div>

      {/* Floating circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-float-slow transform-gpu" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/10 rounded-full animate-float-medium transform-gpu" />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-white/10 rounded-full animate-float-fast transform-gpu" />

      {/* Additional decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div
            className="absolute w-48 h-48 bg-white/20 rotate-45 transform-gpu"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
          <div
            className="absolute w-48 h-48 bg-white/20 rotate-45 transform-gpu left-48"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </div>
      </div>

      {/* Depth layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
    </div>
  );
};
