import Link from "next/link";

const links = [
  {
    name: "",
    href: "",
    icon: null,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((item) => {
        return (
          <Link key={item.name} href={item.href}>
            {item.name}
          </Link>
        );
      })}
    </>
  );
}
