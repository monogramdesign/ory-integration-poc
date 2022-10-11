import { gql, useQuery } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query ProductsQuery {
    allProducts {
      id
      name
      price
    }
  }
`

export const useProducts = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  return {
    products: data && data.allProducts,
    isLoading: loading,
    isError: error
  }
}
