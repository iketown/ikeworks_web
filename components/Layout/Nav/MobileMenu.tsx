import React from "react";

const MobileMenu = () => {
  return (
    <div className="hidden border-b border-gray-700 md:hidden">
      <div className="px-2 py-3 space-y-1 sm:px-3">
        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
        <a
          href="#"
          className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Team
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Projects
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Calendar
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Reports
        </a>
      </div>
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              Tom Cook
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              tom@example.com
            </div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          >
            Your Profile
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
