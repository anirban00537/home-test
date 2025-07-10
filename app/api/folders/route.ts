import { folderStructure } from "../../../lib/folderTree";
import { successResponse, errorResponse } from "../../../lib/apiResponse";

export async function GET() {
  try {
    // Transform internal folder structure to API response format
    const rootFolders = folderStructure.map((folder) => ({
      id: folder.id, // Unique folder identifier
      name: folder.name, // Display name
      type: folder.type, // Type (always 'folder' in this case)
      path: folder.path, // URL path for navigation
      hasChildren: Boolean(folder.children?.length), // Flag for UI to show expand arrow
      childrenCount: folder.children?.length || 0, // Number for badge display
    }));

    return successResponse(rootFolders, "Root folders fetched successfully");
  } catch (error) {
    return errorResponse("Failed to fetch folders", 500);
  }
}
