import { useRouter } from "next/router";
import { edgeConfig } from "@ory/integrations/next";
import useAuth from "../lib/hooks/useAuth";

const Profile = () => {
  //get current user info
  const { user } = useAuth();

  const router = useRouter();

  //Account settings
  const goToAccountSettings = () =>
    router.push(edgeConfig.basePath + "/self-service/settings/browser");

  //Home
  const goToHome = () => router.back();

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <h1 className="text-2xl font-bold text-blue-700">Profile Info</h1>
        <div className="my-10 border-2 p-4 rounded-md">
          <label className="mt-10 font-semibold text-xl">User:</label>
          <p className="text-lg mt-2">{user?.email}</p>
        </div>
        <div className="grid grid-rows-2 justify-center text-center gap-2">
          <button onClick={goToAccountSettings}>Update Profile</button>
          <button onClick={goToHome}>Go Back</button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
