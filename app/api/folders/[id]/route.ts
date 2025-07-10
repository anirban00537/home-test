import { folderStructure } from "../../../../lib/folderTree";
import { successResponse, errorResponse } from "../../../../lib/apiResponse";
import { findFolderById } from "./services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract folder ID from URL parameters (Next.js 15 async params)
    const { id } = await params;

    // Find the parent folder in the folder structure
    const parentFolder = findFolderById(folderStructure, id);

    // Return 404 if folder doesn't exist
    if (!parentFolder) {
      return errorResponse(`Folder with ID ${id} not found`, 404);
    }

    // Transform children to API response format
    const children =
      parentFolder.children?.map((child) => ({
        id: child.id, // Unique child folder identifier
        name: child.name, // Display name
        type: child.type, // Type (always 'folder')
        path: child.path, // URL path for navigation
        hasChildren: Boolean(child.children?.length), // Flag for expand arrow
        childrenCount: child.children?.length || 0, // Count for badge display
      })) || []; // Default to empty array if no children

    return successResponse(
      children,
      `Children of folder ${id} fetched successfully`
    );
  } catch (error) {
    return errorResponse("Failed to fetch folder children", 500);
  }
}
