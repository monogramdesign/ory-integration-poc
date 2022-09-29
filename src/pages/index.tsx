import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Configuration, V0alpha2Api, Session, Identity } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";

const ory = new V0alpha2Api(new Configuration(edgeConfig));

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username;

const Home = () => {
  const [logoutUrl, setLogoutUrl] = useState<string>();
  const router = useRouter();

  const [session, setSession] = useState<Session | undefined>();
  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);

        return ory
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => {
            setLogoutUrl(data.logout_url);
          });
      })
      .catch(() => {
        // Redirect to login page
        return router.push(edgeConfig.basePath + "/self-service/login/browser");
      });
  });

  if (!session) {
    // Still loading
    return null;
  }

  //Profile
  const goToProfileInfo = () => router.push("/profile");

  //Verification Account
  const goToVerificationAccount = () =>
    router.push(edgeConfig.basePath + "/self-service/verification/browser");

  return (
    <main className="w-full p-4">
      <h1 className="text-2xl font-bold text-blue-700">
        Hi {getUserName(session?.identity)}
      </h1>

      <p className="my-10">
        Welcome to the Ory + Next.js project. This implements login,
        registration, account settings and verification. The purpose of this is
        to help you get started quickly. Here are some helpful documentation:
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

        <button onClick={goToVerificationAccount}>Verification Account</button>

        <a
          className="border-2 p-3 rounded-md bg-pink-500 text-white text-base"
          data-testid="logout"
          href={logoutUrl}
          aria-disabled={!logoutUrl}
        >
          Log out
        </a>
      </div>
    </main>
  );
};

export default Home;
