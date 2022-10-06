import { useEffect, useState } from 'react'
import { SelfServiceLoginFlow } from '@ory/client'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

import { ory } from '@/lib/sdk/ory'
import { handleGetFlowError, handleFlowError } from '@/lib/hooks/errors'
import LoginForm from '@/components/LoginForm'

const Login = () => {
  const [flow, setFlow] = useState<SelfServiceLoginFlow | undefined>(undefined)

  // Get ?flow=... from the URL
  const router = useRouter()
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    authorization_assurance_level
  } = router.query

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleGetFlowError(router, 'login', setFlow))
      return
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        authorization_assurance_level ? String(authorization_assurance_level) : undefined,
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, 'login', setFlow))
  }, [flowId, router, authorization_assurance_level, refresh, returnTo, flow])

  if (!flow) {
    return null
  }

  const onSubmit = (values: any) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceLoginFlow(String(flow?.id), values)
          // We  in successfully! Let's bring the user home.
          .then((res) => {
            if (flow?.return_to) {
              window.location.href = flow?.return_to
              return
            }
            router.push('/')
          })
          .catch((err: any) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              setFlow(err.response?.data)
              toast.error('Invalid credentials, please try again')
              return
            }
          })
      )

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <div className="text-center text-2xl text-pink-500 mb-10">Sign In</div>
        <LoginForm onSubmit={onSubmit} buttonTitle={'Sign In'} flow={flow} />
        <div className="link-button w-full text-center">
          <Link href="/registration">
            <a>Create Account</a>
          </Link>
        </div>
      </div>
      <Toaster />
    </main>
  )
}

export default Login
