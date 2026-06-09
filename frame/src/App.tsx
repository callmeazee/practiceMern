import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import useSWR, { mutate } from "swr";
axios.defaults.baseURL = "http://localhost:8080";

interface ProductInterface {
  title: string;
  price: string;
  description: string;
}

const fetcher = async (url: string) => {
  try {
    const { data  } = await axios.get(url);
    console.log(data);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

const App = () => {
  const { data : products } = useSWR<ProductInterface[]>("/product", fetcher);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const addProduct = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await axios.post("/product", form);
      mutate("/product");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async(id: string) => {
    try {
      await axios.delete(`/product/${id}`)
      mutate("/product")
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <div className="min-h-screen bg-[#f3f4f8] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
          {/* LEFT FORM SECTION */}
          <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 h-fit">
            {/* HEADING */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                Data Fetcher
              </h1>

              <p className="text-sm text-slate-400 font-medium mt-2">
                Create and manage your product collection.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={addProduct} className="space-y-5">
              {/* PRODUCT NAME */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Product Name
                </label>

                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={form.title}
                    required
                    name="title"
                    type="text"
                    placeholder="Macbook Pro"
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 pl-13 text-sm font-semibold text-slate-700 outline-none focus:border-pink-400 focus:bg-white transition-all"
                  />

                  <i className="ri-box-3-line absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Product Price
                </label>

                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={form.price}
                    required
                    name="price"
                    type="number"
                    placeholder="50000"
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 pl-13 text-sm font-semibold text-slate-700 outline-none focus:border-pink-400 focus:bg-white transition-all"
                  />

                  <i className="ri-money-rupee-circle-line absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={handleChange}
                  required
                  name="description"
                  rows={5}
                  placeholder="Write something about your product..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700 outline-none resize-none focus:border-pink-400 focus:bg-white transition-all"></textarea>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 text-white font-black text-sm tracking-wide shadow-lg shadow-pink-200 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2">
                <i className="ri-add-line text-lg"></i>
                Create Now
              </button>
            </form>
          </div>

          {/* RIGHT PRODUCT SECTION */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {products &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              products.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white rounded-[26px] p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* TOP ICON */}
                  <div className="w-15 h-15 rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-200 mb-5">
                    <i className="ri-shopping-bag-3-line text-2xl"></i>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 capitalize leading-tight">
                      {item.title}
                    </h2>

                    <p className="text-sm text-slate-400 font-semibold mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="mt-6">
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Price
                    </p>

                    <h1 className="text-3xl font-black text-slate-800">
                      ₹{item.price}
                    </h1>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-3 mt-7">
                    <button
                      type="button"
                      className="flex-1 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2">
                      <i className="ri-edit-line"></i>
                      Edit
                    </button>

                    <button
                      onClick={()=> deleteProduct(item._id)}
                      type="button"
                      className="w-12 h-12 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white transition-all cursor-pointer">
                      <i className="ri-delete-bin-6-line text-lg"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
