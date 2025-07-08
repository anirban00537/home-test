import axios from "axios";
import { ApiResponse, FolderItem } from "../types/folder";

export const getFolders = async (): Promise<ApiResponse<FolderItem[]>> => {
  const response = await axios.get("/api/folders");
  return response.data;
};
