import { gql, useQuery } from '@apollo/client'

const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    currentUser {
      login
      avatar_url
    }
  }
`

export const useCurrentUser = () => {
  const { client, loading, data } = useQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  return {
    client: client,
    currentUser: data && data.currentUser,
    isLoading: loading
  }
}
