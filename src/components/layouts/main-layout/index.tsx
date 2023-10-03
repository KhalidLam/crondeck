import LayoutFooter from "./footer";
import LayoutHeader from "./header";

interface MainLayoutI {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutI) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <LayoutHeader />
      <main className="mt-8 max-w-7xl flex-1 px-4 md:px-6">{children}</main>
      <LayoutFooter />
    </div>
  );
}
