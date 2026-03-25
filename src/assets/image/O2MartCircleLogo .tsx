import React, { type SVGProps } from "react";

interface O2MartCircleLogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const O2MartCircleLogo = ({
  className = "",
  ...props
}: O2MartCircleLogoProps) => (
  <svg
    viewBox="0 0 300 300"
    className={`w-24 h-24 md:w-32 md:h-32 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Green Circle Background */}
    <circle cx="150" cy="150" r="140" fill="#00A651" />

    {/* Filters for crisp white text */}
    <defs>
      <filter id="white-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="1"
          stdDeviation="1.5"
          floodColor="#000000"
          floodOpacity="0.3"
        />
        <feDropShadow
          dx="0"
          dy="-1"
          stdDeviation="1.5"
          floodColor="#FFFFFF"
          floodOpacity="0.4"
        />
      </filter>

      <radialGradient id="glow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#00D16A" />
        <stop offset="70%" stopColor="#00A651" />
        <stop offset="100%" stopColor="#008C43" />
      </radialGradient>
    </defs>

    {/* O2 MART Text - Upper */}
    <text
      x="150"
      y="128"
      fontFamily="Arial Black, Impact, sans-serif"
      fontSize="42"
      fontWeight="500"
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      paintOrder="stroke fill"
      textAnchor="middle"
      letterSpacing="2"
      filter="url(#white-glow)"
    >
      O₂
    </text>

    {/* MART Text - Lower */}
    <text
      x="150"
      y="195"
      fontFamily="Arial Black, Impact, sans-serif"
      fontSize="52"
      fontWeight="900"
      fill="#FFFFFF"
      textAnchor="middle"
      letterSpacing="3"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    >
      MART
    </text>

    {/* Subtle Inner Glow/Shadow Effect */}
    <circle cx="150" cy="150" r="135" fill="url(#glow)" opacity="0.3" />
  </svg>
);
