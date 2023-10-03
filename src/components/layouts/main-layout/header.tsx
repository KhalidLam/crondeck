import Image from "next/image";

export default function LayoutHeader() {
  return (
    <header className="flex max-w-7xl items-center border-b px-4 py-4 md:px-6">
      <Image src="/crondeck_logo.svg" height={24} width={140} alt="logo" />

      <div className="ml-auto">
        <p className="text-sm text-slate-700">Khalid Lam</p>
      </div>
    </header>
  );
}
