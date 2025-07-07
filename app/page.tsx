"use client";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { FolderIcon } from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-64 border-r border-slate-200 bg-slate-50">
        <div className="p-2">
          <div className="space-y-0.5">
            <div className="folder-item group">
              <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                <span className="text-sm font-medium group-hover:text-slate-900">
                  Dir 1
                </span>
              </div>
            </div>

            <div className="folder-item group">
              <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                <span className="text-sm font-medium group-hover:text-slate-900">
                  Dir 2
                </span>
              </div>

              <div className="ml-4">
                <div className="folder-item group">
                  <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                    <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                    <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                    <span className="text-sm font-medium group-hover:text-slate-900">
                      Sub Dir 1.1
                    </span>
                  </div>
                </div>

                <div className="folder-item group">
                  <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                    <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                    <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                    <span className="text-sm font-medium group-hover:text-slate-900">
                      Sub Dir 1.2
                    </span>
                  </div>

                  <div className="ml-4">
                    <div className="folder-item group">
                      <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                        <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                        <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                        <span className="text-sm font-medium group-hover:text-slate-900">
                          Sub Dir 1.2.1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="folder-item group">
              <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                <span className="text-sm font-medium group-hover:text-slate-900">
                  Sub Dir 3
                </span>
              </div>
            </div>

            <div className="folder-item group">
              <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                <span className="text-sm font-medium group-hover:text-slate-900">
                  Dir 4
                </span>
              </div>

              <div className="ml-4">
                <div className="folder-item group">
                  <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                    <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                    <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                    <span className="text-sm font-medium group-hover:text-slate-900">
                      Sub Dir 4.1
                    </span>
                  </div>

                  <div className="ml-4">
                    <div className="folder-item group">
                      <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                        <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                        <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                        <span className="text-sm font-medium group-hover:text-slate-900">
                          Sub Dir 4.1.1
                        </span>
                      </div>
                    </div>
                    <div className="folder-item group">
                      <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                        <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                        <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                        <span className="text-sm font-medium group-hover:text-slate-900">
                          Sub Dir 4.1.2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="folder-item group">
              <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                <span className="text-sm font-medium group-hover:text-slate-900">
                  Dir 5
                </span>
              </div>

              <div className="ml-4">
                <div className="folder-item group">
                  <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                    <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                    <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                    <span className="text-sm font-medium group-hover:text-slate-900">
                      Sub Dir 5.1
                    </span>
                  </div>
                </div>
                <div className="folder-item group">
                  <div className="flex items-center py-1 px-2 hover:bg-slate-200/60 rounded cursor-pointer transition-all duration-200 group text-slate-600">
                    <ChevronRightIcon className="w-4 h-4 text-slate-400 transform transition-transform duration-200 group-hover:text-slate-600" />
                    <FolderIcon className="w-5 h-5 text-blue-400 mx-2 group-hover:text-blue-600" />
                    <span className="text-sm font-medium group-hover:text-slate-900">
                      Sub Dir 5.2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white"></div>
    </div>
  );
};

export default Page;
