import React from "react";
import { Lock, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddressBarProps {
  currentUrl: string;
  onNavigateToParent?: () => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  currentUrl,
  onNavigateToParent,
}) => {
  const router = useRouter();

  const displayUrl = currentUrl.includes("://")
    ? new URL(currentUrl).pathname
    : currentUrl.split("/").slice(1).join("/");

  const handleAddressClick = () => {
    // Select the entire URL when clicked
    const input = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (input) {
      input.select();
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-10 border-b border-slate-200/80">
      <div className="max-w-full mx-auto p-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-medium text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
            <Lock className="w-3 h-3" />
            <span>Address</span>
          </h2>
          <div className="group relative flex-1">
            {onNavigateToParent && (
              <button
                onClick={onNavigateToParent}
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
                aria-label="Navigate to parent directory"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-inner hover:from-blue-500 hover:to-blue-600 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-white" />
                </div>
              </button>
            )}
            {!onNavigateToParent && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-inner">
                  <span className="text-[10px] font-semibold text-white">
                    URL
                  </span>
                </div>
              </div>
            )}
            <input
              type="text"
              value={currentUrl}
              readOnly
              onClick={handleAddressClick}
              className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl pl-11 pr-4 py-2.5
                     text-sm font-mono text-slate-600 
                     focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/40 focus:bg-white
                     hover:border-slate-300/80 hover:bg-slate-50
                     transition-all duration-200
                     placeholder-slate-400"
              placeholder="Select a folder to see its path"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="text-xs px-2.5 py-1 bg-slate-100/80 text-slate-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
                ⌘L
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
