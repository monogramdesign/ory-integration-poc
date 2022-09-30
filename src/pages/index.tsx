import { useRouter } from "next/router";
import { edgeConfig } from "@ory/integrations/next";
import useAuth from "../lib/hooks/useAuth";

const Home = () => {
  //get current user info
  const { user, logoutUrl } = useAuth();

  const router = useRouter();

  //Profile
  const goToProfileInfo = () => router.push("/profile");

  //Verification Account
  const goToVerificationAccount = () =>
    router.push(edgeConfig.basePath + "/self-service/verification/browser");

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <h1 className="text-2xl font-bold text-blue-700">Hi {user?.email}</h1>

        <p className="my-10">
          Welcome to the Ory + Next.js project. This implements login,
          registration, account settings and verification. The purpose of this
          is to help you get started quickly. Here are some helpful
          documentation:
        </p>

        <div className="flex flex-col my-10 font-semibold text-blue-700">
          <a href="https://www.ory.sh/docs/get-started">
            <li>Get Started</li>
          </a>
          <a href="https://www.ory.sh/docs/concepts/identity">
            <li>Identities</li>
          </a>
          <a href="https://www.ory.sh/docs/concepts/session">
            <li>Sessions</li>
          </a>
          <a href="https://www.ory.sh/docs/getting-started/integrate-auth/nextjs">
            <li>Integrate authentication into Next.js</li>
          </a>
        </div>

        <div className="grid grid-rows-2 justify-center text-center">
          <button onClick={goToProfileInfo}>Profile info</button>

          <button onClick={goToVerificationAccount}>
            Verification Account
          </button>

          <a
            className="border-2 p-3 rounded-md bg-pink-500 text-white text-base"
            data-testid="logout"
            href={logoutUrl}
            aria-disabled={!logoutUrl}
          >
            Log out
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
