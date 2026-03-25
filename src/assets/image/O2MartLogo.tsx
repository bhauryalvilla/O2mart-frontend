import React from "react";

interface O2MartLogoProps {
  width?: number | string;
  height?: number | string;
}

const O2MartLogo: React.FC<O2MartLogoProps> = ({
  width = 400,
  height = 400,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="100%" height="100%" fill="#fff" />

      {/* Green Circle */}
      <circle cx="200" cy="200" r="170" fill="#62B565" />

      {/* Text */}
      <text
        x="200"
        y="215"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="60"
        fontWeight="bold"
        fill="white"
      >
        O
        <tspan fontSize="35" baselineShift="sub">
          2
        </tspan>{" "}
        MART
      </text>
    </svg>
  );
};

export default O2MartLogo;
