import { folderStructure } from "../../../lib/folderTree";
import { successResponse, errorResponse } from "../../../lib/apiResponse";

export async function GET() {
  try {
    const rootFolders = folderStructure.map((folder) => ({
      id: folder.id,
      name: folder.name,
      type: folder.type,
      path: folder.path,
      hasChildren: Boolean(folder.children?.length),
      childrenCount: folder.children?.length || 0,
    }));

    return successResponse(rootFolders, "Root folders fetched successfully");
  } catch (error) {
    return errorResponse("Failed to fetch folders", 500);
  }
}
