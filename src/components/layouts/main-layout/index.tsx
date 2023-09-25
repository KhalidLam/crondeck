// import LayoutFooter from "./footer";
// import LayoutHeader from "./header";

interface MainLayoutI {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutI) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* <LayoutHeader /> */}
      <main className="flex-1">{children}</main>
      {/* <LayoutFooter /> */}
    </div>
  );
}
