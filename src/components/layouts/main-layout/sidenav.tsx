import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import AppLogo from "@/components/ui/app-logo";
import NavLinks from "./nav-links";
import UserNav from "./user-nav";

export default function SideNav() {
  const { data: sessionData } = useSession();
  const userData = sessionData?.user ?? null;

  return (
    <div className="flex h-full flex-row items-center justify-between px-2 py-3 md:flex-col md:px-4 md:py-4">
      <Link className="" href={"/app"}>
        <div className="w-32 md:w-40">
          <AppLogo />
        </div>
      </Link>

      <div className="flex grow flex-col justify-between space-y-2">
        <NavLinks />
      </div>

      <div className="ml-auto md:ml-0">
        <UserNav
          imgUrl={userData?.image}
          name={userData?.name}
          email={userData?.email}
          onSingOut={() => void signOut()}
        />
      </div>
    </div>
  );
}
