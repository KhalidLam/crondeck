import { useSession } from "next-auth/react";
import RedirectComponent from "@/components/redirect-component";
import LoadingComponent from "@/components/loading-component";

interface AuthLayoutI {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutI) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-center">
        <LoadingComponent />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <RedirectComponent to="/login" />;
  }

  return <>{children}</>;
};

export default AuthLayout;
