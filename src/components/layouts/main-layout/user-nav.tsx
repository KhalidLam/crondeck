import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserNavT = {
  imgUrl: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  onSingOut: () => unknown;
};

export default function UserNav({ imgUrl, name, email, onSingOut }: UserNavT) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-slate-50">
          <Avatar className="h-9 w-9">
            <AvatarImage src={imgUrl ?? ""} alt="profile picture" />
            <AvatarFallback>KL</AvatarFallback>
          </Avatar>
          <div className="hidden md:ml-1 md:flex md:flex-col">
            <span className="font-semibold tracking-tight">{name}</span>
            <span className="text-sm text-slate-600">{email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start" forceMount>
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
}
