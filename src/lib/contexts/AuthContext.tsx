import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CurrentUser, AuthContextType } from "../types/user";
import { Identity } from "@ory/client";

import { ory } from "../../lib/sdk/ory";

const getUserName = (identity: Identity) =>
  identity.traits.name
    ? identity?.traits.name.first + " " + identity?.traits.name.last
    : identity?.traits.email;

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
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      })
      .catch(() => {
        if (
          !(router.pathname === "/login" || router.pathname === "/registration")
        ) {
          setLoading(false);
          return router.push("/login");
        }
      });
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
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
