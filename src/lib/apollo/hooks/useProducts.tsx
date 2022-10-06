import { gql, useQuery, useMutation } from '@apollo/client'
import { client } from '../../sdk/apollo'

export const GET_PRODUCTS = gql`
  query ExampleQuery {
    allProducts {
      id
      name
      price
    }
  }
`

export const useGetProducts = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  return {
    products: data && data.allProducts,
    isLoading: loading,
    isError: error
  }
}

const GET_PRODUCTS_BY_CATEGORY = gql`
  query ExampleQuery($categoryId: Int!) {
    productsByCategory(categoryId: $categoryId) {
      id
      name
      price
    }
  }
`

export const useGetProductsByCategory = (categoryId: number) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId }
  })
  return {
    productsByCategory: data && data.productsByCategory,
    isLoading: loading,
    isError: error
  }
}

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
