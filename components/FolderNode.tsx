import React, { useCallback, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { FolderItem } from "../types/folder";
import { getFolderChildren } from "../service/folders";
import { FolderIcon } from "./FolderIcon";

interface FolderNodeProps {
  folder: FolderItem;
  level?: number;
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}

export const FolderNode: React.FC<FolderNodeProps> = React.memo(
  ({
    folder, // Folder data to display
    level = 0, // Nesting level for indentation (0 = root)
    expandedIds, // Set of currently expanded folder IDs
    onExpandedChange, // Callback when folder expansion state changes
    onSetNewRoot, // Optional callback to navigate to folder
  }) => {
    // Local state for managing folder children and loading
    const [children, setChildren] = useState<FolderItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Computed values for folder state
    const isExpanded = expandedIds.has(folder.id);
    const hasChildren = folder.hasChildren || Boolean(folder.children?.length);

    /**
     * Loads folder children from API when folder is expanded
     * Only loads if folder has children and hasn't been loaded yet
     */
    const loadChildren = useCallback(async () => {
      if (!hasChildren || folder.children || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getFolderChildren(folder.id);
        if (response.success && response.data) {
          setChildren(response.data);
        } else {
          setError(response.message || "Failed to load folder contents");
        }
      } catch (err) {
        setError("Error loading folder contents");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, [folder.id, folder.children, hasChildren, isLoading]);

    /**
     * Handles expand/collapse toggle when chevron is clicked
     * Triggers lazy loading when expanding for the first time
     */
    const handleToggleExpand = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!hasChildren) return;

        const willExpand = !isExpanded;
        if (willExpand) {
          loadChildren();
        }
        onExpandedChange(folder.id, willExpand);
      },
      [folder.id, hasChildren, isExpanded, loadChildren, onExpandedChange]
    );

    /**
     * Handles double-click to navigate to folder as new root
     * Only works for folders with children and when onSetNewRoot is provided
     */
    const handleDoubleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (hasChildren && onSetNewRoot) {
          onSetNewRoot(folder);
        }
      },
      [folder, hasChildren, onSetNewRoot]
    );

    // Get children from props or local state
    const folderChildren = folder.children || children;
    const childCount = folder.childrenCount ?? folderChildren.length;

    return (
      <div className="transition-all duration-200 ease-out">
        {/* Main folder row */}
        <div
          className="group flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ease-out hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 select-none"
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onDoubleClick={handleDoubleClick}
          role="button"
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-label={folder.name}
        >
          {/* Expand/collapse chevron button */}
          <button
            onClick={handleToggleExpand}
            className={`
            w-5 h-5 flex items-center justify-center rounded-md transition-all duration-200 ease-out select-none
            ${
              hasChildren
                ? "hover:bg-slate-200 active:bg-slate-300"
                : "invisible"
            }
            ${isExpanded ? "rotate-90" : ""}
          `}
            disabled={!hasChildren}
          >
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Folder content (icon, name, child count) */}
          <div className="flex items-center ml-2 min-w-0 flex-1">
            {/* Folder icon with hover effects */}
            <div className="transition-all duration-200 ease-out mr-3 flex-shrink-0 select-none">
              <FolderIcon
                isExpanded={isExpanded}
                className={`w-5 h-5 transition-all duration-200 ${
                  isExpanded
                    ? "drop-shadow-sm"
                    : "group-hover:scale-105 group-hover:drop-shadow-sm"
                }`}
              />
            </div>

            {/* Folder name with truncation */}
            <span
              className="text-sm font-medium truncate transition-all duration-200 select-none"
              title={folder.name}
            >
              {folder.name}
            </span>

            {/* Child count badge or loading spinner */}
            {hasChildren && (
              <div className="ml-auto flex items-center select-none">
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                ) : (
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {childCount}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Expanded children section */}
        {isExpanded && (
          <div className="overflow-hidden">
            <div className="border-l-2 border-slate-100 ml-4 transition-all duration-300 ease-out">
              {/* Loading state */}
              {isLoading && (
                <div
                  className="flex items-center py-2 px-3 ml-4 select-none"
                  style={{ paddingLeft: `${level * 16 + 20}px` }}
                >
                  <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin mr-2" />
                  <span className="text-xs text-slate-500">Loading...</span>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div
                  className="flex items-center py-2 px-3 ml-4 select-none"
                  style={{ paddingLeft: `${level * 16 + 20}px` }}
                >
                  <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md">
                    {error}
                  </span>
                </div>
              )}

              {/* Render child folders recursively */}
              {!isLoading &&
                !error &&
                folderChildren?.map((child) => (
                  <FolderNode
                    key={child.id}
                    folder={child}
                    level={level + 1}
                    expandedIds={expandedIds}
                    onExpandedChange={onExpandedChange}
                    onSetNewRoot={onSetNewRoot}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FolderNode.displayName = "FolderNode";
