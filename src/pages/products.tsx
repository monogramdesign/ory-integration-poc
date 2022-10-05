import {
  useGetProducts,
  useGetProductsByCategory,
  useAddProduct,
} from "../lib/apollo/hooks/useProducts";
import { useRouter } from "next/router";

const Products = () => {
  //TODO Add New Product
  const router = useRouter();

  //Get Products
  const { products, isLoading, isError } = useGetProducts();
  const { productsByCategory } = useGetProductsByCategory(3);
  const { addProduct } = useAddProduct();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  //Home
  const goToHome = () => router.push("/");

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <div className="grid grid-cols-2">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-700 pb-5">Products</h1>
            {products ? (
              products.map(({ id, name, price }: any) => (
                <div key={id} className="grid grid-cols-2">
                  <p>{name}</p>
                  <p>$ {price}</p>
                </div>
              ))
            ) : (
              <p>No Products</p>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-700 pb-5">
              Products by Category
            </h1>
            {productsByCategory ? (
              productsByCategory.map(({ id, name, price }: any) => (
                <div key={id} className="grid grid-cols-2">
                  <p>{name}</p>
                  <p>$ {price}</p>
                </div>
              ))
            ) : (
              <p>No Products</p>
            )}
          </div>
        </div>
        <div className="justify-center text-center grid grid-rows-2 gap-2 my-10">
          <button>Add Product</button>
          <button onClick={goToHome}>Go Back</button>
        </div>
      </div>
    </main>
  );
};

export default Products;
