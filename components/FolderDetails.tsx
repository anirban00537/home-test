import React from "react";
import { FolderItem } from "../types/folder";

interface FolderDetailsProps {
  folder: FolderItem;
}

export const FolderDetails: React.FC<FolderDetailsProps> = ({ folder }) => (
  <div className="space-y-4">
    <div className="border-b border-slate-200 pb-4">
      <h1 className="text-2xl font-semibold text-slate-900">{folder.name}</h1>
      <p className="text-sm text-slate-500 mt-1">Path: {folder.path}</p>
    </div>

    <div className="bg-slate-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-slate-700 mb-2">
        Folder Details
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">ID:</span>
          <span className="font-mono text-slate-900">{folder.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Type:</span>
          <span className="font-mono text-slate-900">{folder.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Children:</span>
          <span className="font-mono text-slate-900">
            {folder.children?.length || 0}
          </span>
        </div>
      </div>
    </div>
  </div>
);
 