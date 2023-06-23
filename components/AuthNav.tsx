import React from "react";
import Link from "next/link";
import { UserNav } from "./user-nav";

const AuthNav: React.FC<AuthNavProps> = ({ user }) => {
  return (
    <>
      <nav className="w-full h-[10vh] px-8 py-2 border-b-[1px] border-gray-100 flex items-center justify-between sticky top-0 bg-white z-40">
        <Link href="/">
          <h2 className="font-bold text-xl">Slideshub</h2>
        </Link>
        <div className="flex items-center space-x-5 capitalize">
          <UserNav user={user} />
        </div>
      </nav>
    </>
  );
};

export default AuthNav;
