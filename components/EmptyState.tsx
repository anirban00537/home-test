import React from "react";

export const EmptyState: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="text-slate-400 mb-2">
        <svg
          className="w-16 h-16 mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">
        Select a folder
      </h3>
      <p className="text-slate-500 text-sm">
        Choose a folder from the sidebar to view its details
      </p>
    </div>
  </div>
);
