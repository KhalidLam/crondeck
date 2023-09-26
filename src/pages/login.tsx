/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const LoginPage = () => {
  // TODO: handle cases user is already login => redirect

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-md bg-white px-6 py-12 shadow-md ring-1 ring-slate-200">
        <Image
          src="/crondeck_logo.svg"
          height={40}
          width={40}
          alt="logo"
          className="block"
        />

        <div className="mx-auto mt-8 flex flex-col justify-center space-y-6 sm:w-[350px]">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h2>

          <SocialMediaLogin />

          <p className="px-8 text-center text-sm font-light text-gray-500">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const SocialMediaLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = (providerId: string) => {
    setIsLoading(true);
    void signIn(providerId, {
      callbackUrl: "/home",
    });
    setIsLoading(false);
  };

  return (
    <div className="grid gap-3">
      <Button
        variant="outline"
        type="button"
        disabled={false}
        onClick={() => {
          login("facebook");
        }}
      >
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
              className="mr-2 h-4 w-4"
              alt="Facebook logo"
            />
            Facebook
          </>
        )}{" "}
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={false}
        onClick={() => {
          login("instagram");
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
          className="mr-2 h-4 w-4"
          alt="Facebook logo"
        />
        Instagram
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={false}
        onClick={() => login("linkedin")}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
          className="mr-2 h-4 w-4"
          alt="Facebook logo"
        />
        LinkedIn
      </Button>
    </div>
  );
};
