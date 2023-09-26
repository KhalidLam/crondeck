import Head from "next/head";
import Image from "next/image";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

import MainLayout from "@/components/layouts/main-layout";
import AuthLayout from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";

const HomePage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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

        <Button className="mt-8" onClick={() => void signOut()}>
          Sign out
        </Button>
      </main>
    </div>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout>
      <MainLayout>{page}</MainLayout>
    </AuthLayout>
  );
};

export default HomePage;
