import { gql, useQuery } from '@apollo/client'

export const GET_PRODUCTS_BY_CATEGORY = gql`
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
