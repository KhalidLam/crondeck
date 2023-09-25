import { type NextPage } from "next";
import { type Session } from "next-auth";
// import { type AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout =
  // AppProps &
  {
    Component: NextPageWithLayout;
    pageProps: { session: Session | null };
  };

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>,
  );
};

export default api.withTRPC(MyApp);
