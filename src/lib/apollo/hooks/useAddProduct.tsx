import { gql, useMutation } from '@apollo/client'

import { client } from '@/lib/sdk/apollo'
import { GET_PRODUCTS } from './useProducts'
import { GET_PRODUCTS_BY_CATEGORY } from './useGetProductsByCategory'

const ADD_PRODUCTS = gql`
  mutation Mutation($name: String!, $price: Float!, $category: CategoryUniqueInput!) {
    addProduct(name: $name, price: $price, category: $category) {
      name
      price
      category {
        name
      }
    }
  }
`

export const useAddProduct = () => {
  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCTS)
  client.refetchQueries({
    include: [GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY]
  })

  return {
    addProduct: addProduct,
    isLoading: loading,
    isError: error
  }
}
