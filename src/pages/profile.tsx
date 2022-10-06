import { edgeConfig } from '@ory/integrations/next'
import Link from 'next/link'

import useAuth from '@/lib/hooks/useAuth'

const Profile = () => {
  //get current user info
  const { user } = useAuth()

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <h1 className="text-2xl font-bold text-blue-700">Profile Info</h1>
        <div className="my-10 border-2 p-4 rounded-md">
          <label className="mt-10 font-semibold text-xl">User:</label>
          <p className="text-lg mt-2">{user?.email}</p>
        </div>
        <div className="grid grid-rows-2 justify-center text-center gap-2">
          <Link href={edgeConfig.basePath + '/self-service/settings/browser'}>
            <a className="link-button">Update profile</a>
          </Link>
          <Link href="/">
            <a className="link-button">Go Back</a>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Profile
