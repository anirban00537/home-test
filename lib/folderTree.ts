import { FolderItem } from "../types/folder";

export const folderStructure: FolderItem[] = [
  {
    id: "dir1",
    name: "Dir 1",
    type: "folder",
    path: "/dir-1",
    children: [
      {
        id: "subdir1.1",
        name: "Sub Dir 1.1",
        type: "folder",
        path: "/dir-1/sub-dir-1-1",
        children: [
          {
            id: "subdir1.1.1",
            name: "Sub Dir 1.1.1",
            type: "folder",
            path: "/dir-1/sub-dir-1-1/sub-dir-1-1-1",
            children: [],
          },
          {
            id: "subdir1.1.2",
            name: "Sub Dir 1.1.2",
            type: "folder",
            path: "/dir-1/sub-dir-1-1/sub-dir-1-1-2",
            children: [],
          },
        ],
      },
      {
        id: "subdir1.2",
        name: "Sub Dir 1.2",
        type: "folder",
        path: "/dir-1/sub-dir-1-2",
        children: [],
      },
    ],
  },
  {
    id: "dir2",
    name: "Dir 2",
    type: "folder",
    path: "/dir-2",
    children: [
      {
        id: "subdir2.1",
        name: "Sub Dir 2.1",
        type: "folder",
        path: "/dir-2/sub-dir-2-1",
        children: [
          {
            id: "subdir2.1.1",
            name: "Documents",
            type: "folder",
            path: "/dir-2/sub-dir-2-1/documents",
            children: [
              {
                id: "subdir2.1.1.1",
                name: "Projects",
                type: "folder",
                path: "/dir-2/sub-dir-2-1/documents/projects",
                children: [
                  {
                    id: "subdir2.1.1.1.1",
                    name: "Web Development",
                    type: "folder",
                    path: "/dir-2/sub-dir-2-1/documents/projects/web-development",
                    children: [],
                  },
                  {
                    id: "subdir2.1.1.1.2",
                    name: "Mobile Apps",
                    type: "folder",
                    path: "/dir-2/sub-dir-2-1/documents/projects/mobile-apps",
                    children: [],
                  },
                ],
              },
              {
                id: "subdir2.1.1.2",
                name: "Reports",
                type: "folder",
                path: "/dir-2/sub-dir-2-1/documents/reports",
                children: [],
              },
            ],
          },
          {
            id: "subdir2.1.2",
            name: "Images",
            type: "folder",
            path: "/dir-2/sub-dir-2-1/images",
            children: [],
          },
        ],
      },
      {
        id: "subdir2.2",
        name: "Sub Dir 2.2",
        type: "folder",
        path: "/dir-2/sub-dir-2-2",
        children: [
          {
            id: "subdir2.2.1",
            name: "Sub Dir 2.2.1",
            type: "folder",
            path: "/dir-2/sub-dir-2-2/sub-dir-2-2-1",
            children: [
              {
                id: "subdir2.2.1.1",
                name: "Configuration",
                type: "folder",
                path: "/dir-2/sub-dir-2-2/sub-dir-2-2-1/configuration",
                children: [
                  {
                    id: "subdir2.2.1.1.1",
                    name: "Environment",
                    type: "folder",
                    path: "/dir-2/sub-dir-2-2/sub-dir-2-2-1/configuration/environment",
                    children: [],
                  },
                  {
                    id: "subdir2.2.1.1.2",
                    name: "Database",
                    type: "folder",
                    path: "/dir-2/sub-dir-2-2/sub-dir-2-2-1/configuration/database",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "subdir2.2.2",
            name: "Backup",
            type: "folder",
            path: "/dir-2/sub-dir-2-2/backup",
            children: [],
          },
        ],
      },
      {
        id: "subdir2.3",
        name: "Media",
        type: "folder",
        path: "/dir-2/media",
        children: [
          {
            id: "subdir2.3.1",
            name: "Videos",
            type: "folder",
            path: "/dir-2/media/videos",
            children: [
              {
                id: "subdir2.3.1.1",
                name: "Tutorials",
                type: "folder",
                path: "/dir-2/media/videos/tutorials",
                children: [],
              },
              {
                id: "subdir2.3.1.2",
                name: "Demos",
                type: "folder",
                path: "/dir-2/media/videos/demos",
                children: [],
              },
            ],
          },
          {
            id: "subdir2.3.2",
            name: "Audio",
            type: "folder",
            path: "/dir-2/media/audio",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "dir3",
    name: "Dir 3",
    type: "folder",
    path: "/dir-3",
    children: [
      {
        id: "subdir3.1",
        name: "Resources",
        type: "folder",
        path: "/dir-3/resources",
        children: [
          {
            id: "subdir3.1.1",
            name: "Templates",
            type: "folder",
            path: "/dir-3/resources/templates",
            children: [
              {
                id: "subdir3.1.1.1",
                name: "Email Templates",
                type: "folder",
                path: "/dir-3/resources/templates/email-templates",
                children: [],
              },
              {
                id: "subdir3.1.1.2",
                name: "UI Components",
                type: "folder",
                path: "/dir-3/resources/templates/ui-components",
                children: [],
              },
            ],
          },
          {
            id: "subdir3.1.2",
            name: "Assets",
            type: "folder",
            path: "/dir-3/resources/assets",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "dir4",
    name: "Dir 4",
    type: "folder",
    path: "/dir-4",
    children: [
      {
        id: "subdir4.1",
        name: "Sub Dir 4.1",
        type: "folder",
        path: "/dir-4/sub-dir-4-1",
        children: [
          {
            id: "subdir4.1.1",
            name: "Sub Dir 4.1.1",
            type: "folder",
            path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1",
            children: [
              {
                id: "subdir4.1.1.1",
                name: "Development",
                type: "folder",
                path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development",
                children: [
                  {
                    id: "subdir4.1.1.1.1",
                    name: "Frontend",
                    type: "folder",
                    path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development/frontend",
                    children: [
                      {
                        id: "subdir4.1.1.1.1.1",
                        name: "React",
                        type: "folder",
                        path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development/frontend/react",
                        children: [],
                      },
                      {
                        id: "subdir4.1.1.1.1.2",
                        name: "Vue",
                        type: "folder",
                        path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development/frontend/vue",
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "subdir4.1.1.1.2",
                    name: "Backend",
                    type: "folder",
                    path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development/backend",
                    children: [
                      {
                        id: "subdir4.1.1.1.2.1",
                        name: "Node.js",
                        type: "folder",
                        path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development/backend/nodejs",
                        children: [],
                      },
                      {
                        id: "subdir4.1.1.1.2.2",
                        name: "Python",
                        type: "folder",
                        path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/development/backend/python",
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "subdir4.1.1.2",
                name: "Testing",
                type: "folder",
                path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/testing",
                children: [
                  {
                    id: "subdir4.1.1.2.1",
                    name: "Unit Tests",
                    type: "folder",
                    path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/testing/unit-tests",
                    children: [],
                  },
                  {
                    id: "subdir4.1.1.2.2",
                    name: "Integration Tests",
                    type: "folder",
                    path: "/dir-4/sub-dir-4-1/sub-dir-4-1-1/testing/integration-tests",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "subdir4.1.2",
            name: "Sub Dir 4.1.2",
            type: "folder",
            path: "/dir-4/sub-dir-4-1/sub-dir-4-1-2",
            children: [
              {
                id: "subdir4.1.2.1",
                name: "Documentation",
                type: "folder",
                path: "/dir-4/sub-dir-4-1/sub-dir-4-1-2/documentation",
                children: [
                  {
                    id: "subdir4.1.2.1.1",
                    name: "API Docs",
                    type: "folder",
                    path: "/dir-4/sub-dir-4-1/sub-dir-4-1-2/documentation/api-docs",
                    children: [],
                  },
                  {
                    id: "subdir4.1.2.1.2",
                    name: "User Guides",
                    type: "folder",
                    path: "/dir-4/sub-dir-4-1/sub-dir-4-1-2/documentation/user-guides",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "subdir4.2",
        name: "Tools",
        type: "folder",
        path: "/dir-4/tools",
        children: [
          {
            id: "subdir4.2.1",
            name: "Scripts",
            type: "folder",
            path: "/dir-4/tools/scripts",
            children: [
              {
                id: "subdir4.2.1.1",
                name: "Build Scripts",
                type: "folder",
                path: "/dir-4/tools/scripts/build-scripts",
                children: [],
              },
              {
                id: "subdir4.2.1.2",
                name: "Deploy Scripts",
                type: "folder",
                path: "/dir-4/tools/scripts/deploy-scripts",
                children: [],
              },
            ],
          },
          {
            id: "subdir4.2.2",
            name: "Utilities",
            type: "folder",
            path: "/dir-4/tools/utilities",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "dir5",
    name: "Dir 5",
    type: "folder",
    path: "/dir-5",
    children: [
      {
        id: "subdir5.1",
        name: "Sub Dir 5.1",
        type: "folder",
        path: "/dir-5/sub-dir-5-1",
        children: [
          {
            id: "subdir5.1.1",
            name: "Archive",
            type: "folder",
            path: "/dir-5/sub-dir-5-1/archive",
            children: [
              {
                id: "subdir5.1.1.1",
                name: "2023",
                type: "folder",
                path: "/dir-5/sub-dir-5-1/archive/2023",
                children: [
                  {
                    id: "subdir5.1.1.1.1",
                    name: "Q1",
                    type: "folder",
                    path: "/dir-5/sub-dir-5-1/archive/2023/q1",
                    children: [],
                  },
                  {
                    id: "subdir5.1.1.1.2",
                    name: "Q2",
                    type: "folder",
                    path: "/dir-5/sub-dir-5-1/archive/2023/q2",
                    children: [],
                  },
                  {
                    id: "subdir5.1.1.1.3",
                    name: "Q3",
                    type: "folder",
                    path: "/dir-5/sub-dir-5-1/archive/2023/q3",
                    children: [],
                  },
                  {
                    id: "subdir5.1.1.1.4",
                    name: "Q4",
                    type: "folder",
                    path: "/dir-5/sub-dir-5-1/archive/2023/q4",
                    children: [],
                  },
                ],
              },
              {
                id: "subdir5.1.1.2",
                name: "2024",
                type: "folder",
                path: "/dir-5/sub-dir-5-1/archive/2024",
                children: [
                  {
                    id: "subdir5.1.1.2.1",
                    name: "Q1",
                    type: "folder",
                    path: "/dir-5/sub-dir-5-1/archive/2024/q1",
                    children: [],
                  },
                  {
                    id: "subdir5.1.1.2.2",
                    name: "Q2",
                    type: "folder",
                    path: "/dir-5/sub-dir-5-1/archive/2024/q2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "subdir5.2",
        name: "Sub Dir 5.2",
        type: "folder",
        path: "/dir-5/sub-dir-5-2",
        children: [
          {
            id: "subdir5.2.1",
            name: "Workspace",
            type: "folder",
            path: "/dir-5/sub-dir-5-2/workspace",
            children: [
              {
                id: "subdir5.2.1.1",
                name: "Personal",
                type: "folder",
                path: "/dir-5/sub-dir-5-2/workspace/personal",
                children: [],
              },
              {
                id: "subdir5.2.1.2",
                name: "Shared",
                type: "folder",
                path: "/dir-5/sub-dir-5-2/workspace/shared",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
