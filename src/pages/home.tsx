import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import MainLayout from "@/components/layouts/main-layout";
import AuthLayout from "@/components/layouts/auth-layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const { data: session } = useSession();

  if (!session) {
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
            Welcome, {session.user.name} <span>{session.user.email}</span>
          </p>
          <br />
          <Image
            src={session.user.image!}
            alt="profile picture"
            width={40}
            height={40}
          />
        </div>
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
