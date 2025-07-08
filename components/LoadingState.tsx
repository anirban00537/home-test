import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center space-x-2 text-slate-500">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">Loading folders...</span>
    </div>
  </div>
);
