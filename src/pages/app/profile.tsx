import Head from "next/head";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

import MainLayout from "@/components/layouts/main-layout";

import { useSession } from "next-auth/react";

const ProfilePage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className="mt-8 flex flex-1 flex-col px-4 md:flex-row md:overflow-hidden md:px-6">
        <div className="flex flex-col">
          <p className="text-2xl ">Profile Page</p>
        </div>
      </main>
    </>
  );
};

ProfilePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ProfilePage;
