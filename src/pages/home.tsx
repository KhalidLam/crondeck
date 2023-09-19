import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please Sign in</p>;
  }

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
}
