import React, { useCallback, useState, useEffect } from "react";
import { ChevronRight, FolderClosed, FolderOpen, Loader2 } from "lucide-react";
import { FolderItem } from "../types/folder";
import { getFolderChildren } from "../service/folders";

interface FolderTreeProps {
  folders: FolderItem[];
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}

interface FolderNodeProps {
  folder: FolderItem;
  level?: number;
  expandedIds: Set<string>;
  onExpandedChange: (id: string, expanded: boolean) => void;
  onSetNewRoot?: (folder: FolderItem) => void;
}

const FolderNode: React.FC<FolderNodeProps> = ({
  folder,
  level = 0,
  expandedIds,
  onExpandedChange,
  onSetNewRoot,
}) => {
  const [children, setChildren] = useState<FolderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const isExpanded = expandedIds.has(folder.id);
  const hasChildren = folder.hasChildren || Boolean(folder.children?.length);

  // Load children when expanded
  useEffect(() => {
    if (isExpanded && hasChildren && !hasLoaded && !folder.children) {
      setIsLoading(true);
      setError(null);

      getFolderChildren(folder.id)
        .then((response) => {
          if (response.success && response.data) {
            setChildren(response.data);
          } else {
            setError(response.message || "Failed to load folder contents");
          }
          setHasLoaded(true);
        })
        .catch((err) => {
          setError("Error loading folder contents");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isExpanded, hasChildren, hasLoaded, folder.children, folder.id]);

  const handleToggleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        onExpandedChange(folder.id, !isExpanded);
      }
    },
    [hasChildren, isExpanded, folder.id, onExpandedChange]
  );

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

  const folderChildren = folder.children || (hasLoaded ? children : []);

  const childCount =
    folder.childrenCount !== undefined
      ? folder.childrenCount
      : folderChildren?.length || 0;

  return (
    <div>
      <div
        className={`
          flex items-center py-1.5 px-2 rounded-md cursor-pointer 
          transition-all duration-150 ease-in-out hover:bg-slate-100
          text-slate-700
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onDoubleClick={handleDoubleClick}
        role="button"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={folder.name}
      >
        <div
          className={`
          w-4 h-4 flex items-center justify-center
          transition-transform duration-150
          ${hasChildren ? "" : "invisible"}
          ${isExpanded ? "rotate-90" : ""}
        `}
          onClick={handleToggleExpand}
        >
          <ChevronRight className="w-3 h-3" />
        </div>

        <div className="flex items-center ml-1 min-w-0 flex-1">
          {isExpanded ? (
            <FolderOpen className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
          ) : (
            <FolderClosed className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
          )}

          <span className="text-sm font-medium truncate" title={folder.name}>
            {folder.name}
          </span>

          {hasChildren && (
            <span className="ml-auto text-xs text-slate-400">
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                childCount || ""
              )}
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-l border-slate-200 ml-2">
          {isLoading && (
            <div
              className="flex items-center py-1 px-2"
              style={{ paddingLeft: `${level * 12 + 20}px` }}
            >
              <Loader2 className="w-3 h-3 text-slate-400 animate-spin mr-2" />
              <span className="text-xs text-slate-500">Loading...</span>
            </div>
          )}

          {error && (
            <div
              className="flex items-center py-1 px-2"
              style={{ paddingLeft: `${level * 12 + 20}px` }}
            >
              <span className="text-xs text-red-500">{error}</span>
            </div>
          )}

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
      )}
    </div>
  );
};

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  expandedIds,
  onExpandedChange,
  onSetNewRoot,
}) => {
  if (!folders?.length) {
    return (
      <div className="flex items-center justify-center py-8 text-slate-500">
        <span className="text-sm">No folders found</span>
      </div>
    );
  }

  return (
    <div className="space-y-0.5" role="tree" aria-label="Folder tree">
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
};
