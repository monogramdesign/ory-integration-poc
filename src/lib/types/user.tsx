export type CurrentUser = {
  email: string;
};

export type AuthContextType = {
  user: CurrentUser | undefined;
  logoutUrl: string | undefined;
};
