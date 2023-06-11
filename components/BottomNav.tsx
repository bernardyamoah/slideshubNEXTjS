import React from "react";
import Link from "next/link";

interface LinkItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const BottomNav: React.FC = () => {
  let Links: LinkItem[] = [
    {
      name: "Home",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="w-6 h-6 mb-1 text-gray-900 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500"
          fill="currentColor"
          strokeLinejoin="round"
        
        >
          <rect width="7" height="7" x="3" y="3" rx="1"></rect>
          <rect width="7" height="7" x="14" y="3" rx="1"></rect>
          <rect width="7" height="7" x="14" y="14" rx="1"></rect>
          <rect width="7" height="7" x="3" y="14" rx="1"></rect>
        </svg>
      ),
    },
    {
      name: "Campus",
      link: "/campus",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mb-1 text-gray-900 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
          <path d="M2 10h20"></path>
        </svg>
      ),
    },
    {
      name: "Books",
      link: "/books",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mb-1 text-gray-900 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
  
  
  ];

  return (
    <>
      <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-600">
        <div className="grid h-full max-w-xl grid-cols-3 mx-auto">
          {Links.map((link, index) => (
            <Link href={link.link} key={index} className="inline-flex flex-col items-center justify-center font-medium px-1 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              {link.icon}
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
