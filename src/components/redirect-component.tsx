import { useRouter } from "next/router";
import { useEffect } from "react";

interface RedirectComponentI {
  to: string;
  children?: React.ReactNode;
}

export default function RedirectComponent({
  to,
  children = null,
}: RedirectComponentI) {
  const { push } = useRouter();

  useEffect(() => {
    return void push(to);
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
}
