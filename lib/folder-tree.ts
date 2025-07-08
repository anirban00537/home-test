import { FolderItem } from "../types/folder";

export const folderStructure: FolderItem[] = [
  {
    id: "dir1",
    name: "Dir 1",
    type: "folder",
    path: "/dir-1",
    children: [],
  },
  {
    id: "dir2",
    name: "Dir 2",
    type: "folder",
    path: "/dir-2",
    children: [
      {
        id: "subdir1.1",
        name: "Sub Dir 1.1",
        type: "folder",
        path: "/dir-2/sub-dir-1-1",
        children: [],
      },
      {
        id: "subdir1.2",
        name: "Sub Dir 1.2",
        type: "folder",
        path: "/dir-2/sub-dir-1-2",
        children: [
          {
            id: "subdir1.2.1",
            name: "Sub Dir 1.2.1",
            type: "folder",
            path: "/dir-2/sub-dir-1-2/sub-dir-1-2-1",
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
    children: [],
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
            children: [],
          },
          {
            id: "subdir4.1.2",
            name: "Sub Dir 4.1.2",
            type: "folder",
            path: "/dir-4/sub-dir-4-1/sub-dir-4-1-2",
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
        children: [],
      },
      {
        id: "subdir5.2",
        name: "Sub Dir 5.2",
        type: "folder",
        path: "/dir-5/sub-dir-5-2",
        children: [],
      },
    ],
  },
];
