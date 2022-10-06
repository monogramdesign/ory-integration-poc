import {
  useGetProducts,
  useGetProductsByCategory,
  useAddProduct,
  GET_PRODUCTS,
} from "../lib/apollo/hooks/useProducts";
import { useRouter } from "next/router";
import { useState } from "react";
import AddProductsModal from "../components/AddProductModal";
import toast, { Toaster } from "react-hot-toast";

const ProductsList = ({ products }: any) => {
  return products ? (
    products.map(({ id, name, price }: any) => (
      <div key={id} className="grid grid-cols-2">
        <p>{name}</p>
        <p>$ {price}</p>
      </div>
    ))
  ) : (
    <p>No Products</p>
  );
};

const Products = () => {
  //TODO Add New Product
  const router = useRouter();

  //Get Products
  const { products, isLoading, isError } = useGetProducts();
  const { productsByCategory } = useGetProductsByCategory(3);
  const { addProduct } = useAddProduct();

  const [showModal, setShowModal] = useState<boolean>(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  //Home
  const goToHome = () => router.push("/");

  //Add Products Modal
  const showAddProductsModal = () => setShowModal(!showModal);

  //Add Product
  const addNewProduct = async (values: any) => {
    const randomId = Math.floor(Math.random() * 3);

    try {
      await addProduct({
        variables: {
          name: values.name,
          price: parseFloat(values.price),
          category: {
            id: parseInt(values.categoryId),
          },
        },
      });
      toast.success("New product created!");
      setShowModal(false);
    } catch (e) {
      toast.error("An error has occurred! Please try again.");
    }
  };

  return (
    <main className=" p-2 lg:px-80 lg:py-10">
      <div className="border-2 rounded-md p-10 lg:p-20 bg-white">
        <div className="lg:grid lg:grid-cols-2">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-700 pb-5">Products</h1>
            <ProductsList products={products} />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-700 pb-5">
              Products Category 3
            </h1>
            <ProductsList products={productsByCategory} />
          </div>
        </div>
        <div className="justify-center text-center grid grid-rows-2 gap-2 my-10">
          <button onClick={showAddProductsModal}>Add Product</button>
          <button onClick={goToHome}>Go Back</button>
        </div>
      </div>
      {showModal && (
        <AddProductsModal
          showAddProductsModal={showAddProductsModal}
          addNewProduct={addNewProduct}
        />
      )}
      <Toaster />
    </main>
  );
};

export default Products;
