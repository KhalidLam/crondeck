import Head from "next/head";
import Image from "next/image";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";

const HomePage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className="flex flex-col">
        <div>
          <p>
            Welcome, {sessionData.user.name}{" "}
            <span>{sessionData.user.email}</span>
          </p>
          <br />
          <Image
            src={sessionData.user.image!}
            alt="profile picture"
            width={40}
            height={40}
          />
        </div>

        <div>
          <Button className="mt-8" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
