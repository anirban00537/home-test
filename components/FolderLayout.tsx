import React from "react";
import type { FolderItem } from "../types/folder";
import { FolderTree } from "./FolderTree";
import { AddressBar } from "./AddressBar";

interface FolderLayoutProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  currentUrl: string;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot: (folder: FolderItem) => void;
  onNavigateToParent?: () => void;
}

export const FolderLayout = React.memo<FolderLayoutProps>(
  ({
    folders, // Array of folders to display in the tree
    expandedIds, // Set of currently expanded folder IDs
    currentUrl, // Current path for address bar display
    onExpandedChange, // Callback when folder is expanded/collapsed
    onSetNewRoot, // Callback when navigating to a subfolder
    onNavigateToParent, // Optional callback for parent navigation
  }) => {
    return (
      // Main container with gradient background
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Sticky address bar at the top */}
        <AddressBar
          currentUrl={currentUrl}
          onNavigateToParent={onNavigateToParent}
        />

        {/* Main content area with sidebar and content panel */}
        <main className="flex flex-1 relative">
          {/* Left sidebar with folder navigation */}
          <aside className="w-80 bg-white border-r border-slate-200/60 transition-all duration-300 ease-out">
            <div className="h-full overflow-hidden">
              {/* Scrollable navigation area */}
              <nav
                className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
                aria-label="Folder navigation"
              >
                <FolderTree
                  folders={folders}
                  expandedIds={expandedIds}
                  onExpandedChange={onExpandedChange}
                  onSetNewRoot={onSetNewRoot}
                />
              </nav>
            </div>
          </aside>

          {/* Right content area with placeholder */}
          <div className="flex-1 bg-white/40 backdrop-blur-sm transition-all duration-300">
            <div className="p-8 h-full flex items-center justify-center">
              {/* Placeholder content when no specific folder content is shown */}
              <div className="text-slate-400 text-center">
                <div className="w-16 h-16 mx-auto mb-4 opacity-40">
                  {/* Folder icon placeholder */}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">
                  Browse folders using the sidebar
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
);

FolderLayout.displayName = "FolderLayout";
