import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const SideNav = () => {
  const seesion = useSession();
  const user = seesion.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user != null && <Link href={`/profiles/${user.id}`}>Profile</Link>}
        {user == null ? (
          <li>
            <button
              onClick={() => void signIn()}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Login
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={() => void signOut()}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
