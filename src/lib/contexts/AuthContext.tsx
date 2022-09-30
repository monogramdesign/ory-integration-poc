import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CurrentUser, AuthContextType } from "../types/user";
import { Configuration, V0alpha2Api, Identity } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";

const ory = new V0alpha2Api(new Configuration(edgeConfig));

const getUserName = (identity: Identity) =>
  identity?.traits.email || identity?.traits.username;

const authContextDefaultValues: AuthContextType = {
  user: undefined,
  logoutUrl: undefined,
};

export const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser>();
  const [logoutUrl, setLogoutUrl] = useState<string>();

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        const userName = getUserName(data.identity);
        setUser({ email: userName });

        // Get logout URL
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
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
