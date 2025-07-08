"use client";
import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { FolderIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

const Page = () => {
  const [url, setUrl] = useState(
    "localhost:3000/dir-2/sub-dir-1-2/sub-dir-1-2-1"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-white sticky top-0 z-10">
        <div className="max-w-full mx-auto p-3 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-medium text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
              <LockClosedIcon className="w-3.5 h-3.5" />
              <span>Address</span>
            </h2>
            <div className="group relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-inner">
                  <span className="text-[10px] font-semibold text-white">
                    URL
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl pl-11 pr-4 py-2.5
                         text-sm font-mono text-slate-600 
                         focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/40 focus:bg-white
                         hover:border-slate-300/80 hover:bg-slate-50
                         transition-all duration-200
                         placeholder-slate-400"
                placeholder="Enter address"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="text-xs px-2.5 py-1 bg-slate-100/80 text-slate-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
                  ⌘L
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
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
    </div>
  );
};

export default Page;
