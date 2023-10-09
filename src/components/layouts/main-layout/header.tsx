import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LayoutHeader() {
  const { data: sessionData } = useSession();
  const userData = sessionData?.user ?? null;

  return (
    <header className="flex max-w-7xl items-center border-b px-4 py-4 md:px-6">
      <Image src="/crondeck_logo.svg" height={24} width={140} alt="logo" />

      <div className="ml-auto flex items-center">
        <UserDropDownMenu
          imgUrl={userData?.image}
          name={userData?.name}
          email={userData?.email}
          onSingOut={() => void signOut()}
        />
      </div>
    </header>
  );
}

type UserDropDownMenuT = {
  imgUrl: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  onSingOut: () => unknown;
};

const UserDropDownMenu = ({
  imgUrl,
  name,
  email,
  onSingOut,
}: UserDropDownMenuT) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={imgUrl ?? ""} alt="profile picture" />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href={"/app/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onSingOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
