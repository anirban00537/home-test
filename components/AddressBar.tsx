import React from "react";
import { Lock, ChevronLeft } from "lucide-react";

interface AddressBarProps {
  currentUrl: string;
  onNavigateToParent?: () => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  currentUrl,
  onNavigateToParent,
}) => {
  const handleAddressClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const displayUrl = currentUrl.includes("://")
    ? new URL(currentUrl).pathname
    : currentUrl;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/50">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="text-xs font-semibold text-slate-600 flex items-center gap-2 min-w-fit">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
              <Lock className="w-3 h-3 text-slate-500" />
            </div>
            <span>Address</span>
          </div>

          <div className="relative flex-1 group">
            {onNavigateToParent && (
              <button
                onClick={onNavigateToParent}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Navigate to parent directory"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
            )}

            <input
              type="text"
              value={displayUrl}
              readOnly
              onClick={handleAddressClick}
              className={`
                w-full bg-slate-50/80 border border-slate-200/80 rounded-xl
                text-sm font-mono text-slate-700 
                py-3 px-4 transition-all duration-300 ease-out
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/60 focus:bg-white
                hover:bg-white/80 hover:border-slate-300/60
                group-hover:border-slate-300/60
                ${onNavigateToParent ? "pl-12" : "pl-4"}
              `}
              placeholder="Select a folder to see its path"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="px-2 py-1 bg-slate-100/80 text-slate-500 text-xs rounded-md">
                Click to select
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
