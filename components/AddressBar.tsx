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
    <header className="w-full bg-white sticky top-0 z-10 border-b border-slate-200/80">
      <div className="max-w-full mx-auto p-3">
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            <span>Address</span>
          </div>

          <div className="relative flex-1">
            {onNavigateToParent && (
              <button
                onClick={onNavigateToParent}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                aria-label="Navigate to parent directory"
              >
                <ChevronLeft className="w-3 h-3 text-white" />
              </button>
            )}

            <input
              type="text"
              value={displayUrl}
              readOnly
              onClick={handleAddressClick}
              className={`
                w-full bg-slate-50 border border-slate-200 rounded-lg
                text-sm font-mono text-slate-600 
                py-2 transition-all duration-200
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                hover:bg-white
                ${onNavigateToParent ? "pl-10" : "pl-4"}
              `}
              placeholder="Select a folder to see its path"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
