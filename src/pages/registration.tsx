import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/client";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import Form from "../components/Form";
import { ory } from "../lib/sdk/ory";
import { handleFlowError } from "../lib/hooks/errors";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query;

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data);
        })
        .catch(handleFlowError(router, "registration", setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, "registration", setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: SubmitSelfServiceRegistrationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceRegistrationFlow(String(flow?.id), values)
          .then(({ data }) => {
            // If we ended up here, it means we are successfully signed up!
            //
            // You can do cool stuff here, like having access to the identity which just signed up:
            console.log("This is the user session: ", data, data.identity);

            // For now however we just want to redirect home!
            return router.push(flow?.return_to || "/").then(() => {});
          })
          .catch(handleFlowError(router, "registration", setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              setFlow(err.response?.data);
              toast.error("This email has already been registered");
              return;
            }

            return Promise.reject(err);
          })
      );

  if (!flow) {
    return null;
  }

  const goToLoginPage = () => router.push("/login");

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <div className="text-center text-2xl text-pink-500 mb-10">
          Create Account
        </div>
        <Form onSubmit={onSubmit} buttonTitle={"Create Account"} flow={flow} />
        <button className="mt-10 w-full" onClick={goToLoginPage}>
          Sign In
        </button>
      </div>
      <Toaster />
    </main>
  );
};

export default Registration;
