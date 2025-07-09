import React from "react";

interface FolderIconProps {
  isExpanded: boolean;
  className?: string;
}

export const FolderIcon: React.FC<FolderIconProps> = ({
  isExpanded,
  className = "",
}) => {
  if (isExpanded) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
          fill="url(#openGradient)"
          stroke="none"
        />
        <defs>
          <linearGradient id="openGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#60A5FA", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#3B82F6", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
        fill="url(#closedGradient)"
        stroke="none"
      />
      <defs>
        <linearGradient id="closedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#9CA3AF", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#6B7280", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
