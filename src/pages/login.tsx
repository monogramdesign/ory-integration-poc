import { SelfServiceLoginFlow } from "@ory/client";
import { AxiosError } from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import { ory } from "../lib/sdk/ory";
import { handleGetFlowError, handleFlowError } from "../lib/hooks/errors";

const Login: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceLoginFlow | undefined>(undefined);

  // Get ?flow=... from the URL
  const router = useRouter();
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal,
  } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleGetFlowError(router, "login", setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, "login", setFlow));
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow]);

  if (!flow) {
    return null;
  }

  const onSubmit = (values: any) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceLoginFlow(String(flow?.id), values)
          // We logged in successfully! Let's bring the user home.
          .then((res) => {
            if (flow?.return_to) {
              window.location.href = flow?.return_to;
              return;
            }
            router.push("/");
          })
          .then(() => {})
          .catch()
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              setFlow(err.response?.data);
              return;
            }
            console.log("adsdas", err);

            return Promise.reject(err);
          })
      );

  const goToRegistrationPage = () => router.push("/registration");

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <div className="text-center text-2xl text-pink-500 mb-10">Sign In</div>
        <Form onSubmit={onSubmit} buttonTitle={"Sign In"} flow={flow} />
        <button className="mt-10 w-full" onClick={goToRegistrationPage}>
          Create Account
        </button>
      </div>
    </main>
  );
};

export default Login;
