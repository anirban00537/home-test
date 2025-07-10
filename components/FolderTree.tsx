import React from "react";
import { FolderItem } from "../types/folder";
import { FolderIcon } from "./FolderIcon";
import { FolderNode } from "./FolderNode";

interface FolderTreeProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = React.memo(
  ({
    folders, // Array of top-level folders to display
    expandedIds, // Set of currently expanded folder IDs
    onExpandedChange, // Callback when folder expansion changes
    onSetNewRoot, // Optional callback for folder navigation
  }) => {
    // Show empty state when no folders are provided
    if (!folders?.length) {
      return (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <div className="text-center">
            {/* Empty state folder icon */}
            <div className="w-12 h-12 mx-auto mb-3 opacity-40">
              <FolderIcon isExpanded={false} className="w-full h-full" />
            </div>
            {/* Empty state message */}
            <span className="text-sm font-medium">No folders found</span>
          </div>
        </div>
      );
    }

    // Render the folder tree with accessibility support
    return (
      <div className="space-y-1" role="tree" aria-label="Folder tree">
        {/* Map each top-level folder to a FolderNode component */}
        {folders.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
            expandedIds={expandedIds}
            onExpandedChange={onExpandedChange}
            onSetNewRoot={onSetNewRoot}
          />
        ))}
      </div>
    );
  }
);

FolderTree.displayName = "FolderTree";
