export interface FolderItem {
  id: string;
  name: string;
  type: string;
  path: string;
  children?: FolderItem[];
  hasChildren?: boolean;
  childrenCount?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
