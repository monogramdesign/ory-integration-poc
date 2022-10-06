import { useForm } from "react-hook-form";

type Props<T> = {
  showAddProductsModal: () => void;
  addNewProduct: (values: T) => void;
};

const AddProductsModal = (props: Props<any>) => {
  const { register, handleSubmit } = useForm();

  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ];

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form
                onSubmit={handleSubmit(props.addNewProduct)}
                className="flex flex-col"
              >
                <h1 className="text-2xl font-bold text-blue-700 pb-5">
                  Add Product
                </h1>
                <div className="flex flex-col">
                  <label>Name:</label>
                  <input {...register("name")} type="text" required />
                  <label>Price:</label>
                  <input
                    {...register("price")}
                    type="number"
                    step="0.01"
                    required
                  />
                  <label>Category:</label>
                  <select className="my-3 border-2 p-2 rounded-md" required>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        {...register("categoryId")}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-pink-500 px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={props.showAddProductsModal}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsModal;
