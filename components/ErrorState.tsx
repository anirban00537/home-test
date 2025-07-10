import React from "react";
import { AlertCircle } from "lucide-react";

export const ErrorState: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center space-x-2 text-red-500">
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm">Failed to load folders</span>
    </div>
  </div>
);
