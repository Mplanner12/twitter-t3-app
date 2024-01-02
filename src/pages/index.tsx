import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
          Welcome, This is the Planner
        </span>
      </h1>
    </>
  );
}
