import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Configuration, V0alpha2Api, Session, Identity } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";

const ory = new V0alpha2Api(new Configuration(edgeConfig));

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username;

const Profile = () => {
  const router = useRouter();

  const [session, setSession] = useState<Session | undefined>();
  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);
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

  //Account settings
  const goToAccountSettings = () =>
    router.push(edgeConfig.basePath + "/self-service/settings/browser");

  //Home
  const goToHome = () => router.back();

  return (
    <main className="w-full p-4">
      <h1 className="text-2xl font-bold text-blue-700">Profile Info</h1>
      <div className="my-10 border-2 p-4 rounded-md">
        <label className="mt-10 font-semibold text-xl">Email:</label>
        <p className="text-lg mt-2">{getUserName(session?.identity)}</p>
      </div>

      <div className="grid grid-rows-2 justify-center text-center">
        <button onClick={goToAccountSettings}>Update Profile</button>
        <button onClick={goToHome}>Go Back</button>
      </div>
    </main>
  );
};

export default Profile;
