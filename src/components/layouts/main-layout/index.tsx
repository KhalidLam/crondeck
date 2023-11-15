import { inter } from "@/components/ui/fonts";
import SideNav from "./sidenav";

interface MainLayoutI {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutI) {
  return (
    <div
      className={`${inter.className} flex h-screen flex-col antialiased md:flex-row md:overflow-hidden`}
    >
      <div className="w-full flex-none border-b md:w-64 md:border-b-0 md:border-r">
        <SideNav />
      </div>
      <div className="flex-grow bg-slate-50">{children}</div>
    </div>
  );
}
