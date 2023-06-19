import React from "react";
import Link from "next/link";
import { Books,GraduationCap,House } from "@phosphor-icons/react";

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
      icon: <House size={32} weight="duotone" />
      // (
      //   <svg
      //     xmlns="http://www.w3.org/2000/svg"
      //     viewBox="0 0 24 24"
      //     stroke="currentColor"
      //     strokeWidth="2"
      //     strokeLinecap="round"
      //     className="w-6 h-6 mb-1 text-gray-900 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500"
      //     fill="currentColor"
      //     strokeLinejoin="round"
        
      //   >
      //     <rect width="7" height="7" x="3" y="3" rx="1"></rect>
      //     <rect width="7" height="7" x="14" y="3" rx="1"></rect>
      //     <rect width="7" height="7" x="14" y="14" rx="1"></rect>
      //     <rect width="7" height="7" x="3" y="14" rx="1"></rect>
      //   </svg>
      // )
      ,
    },
    {
      name: "Campus",
      link: "/campus",
      icon: <GraduationCap size={32} weight="duotone" />,
    },
    {
      name: "Books",
      link: "/books",
      icon: 
        <Books size={32} weight="duotone" />,
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
