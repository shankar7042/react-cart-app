import { useAtomValue, useSetAtom } from "jotai";
import { productsAtom, setCartAtom } from "../atoms";
import { Product } from "../types";
import { formatCurrency } from "../utils";

interface ProductProps {
  product: Product;
}

const Product = ({ product }: ProductProps) => {
  const setCart = useSetAtom(setCartAtom);

  const handleAddtoCart = () => {
    setCart(product.id);
  };

  return (
    <div className="w-100 bg-zinc-100 flex justify-between items-center flex-col border p-2 rounded-md shadow-md group hover:scale-105 transition">
      <div>
        <div className="overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-100 aspect-square object-contain group-hover:scale-110 transition"
          />
        </div>
        <p className="font-semibold">{product.title}</p>
        <p>
          {product.description.slice(0, 50)}
          {product.description.length > 50 && "..."}
        </p>
        <div className="my-4 flex justify-between items-center">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          <span>{product.rating.rate}⭐/5</span>
        </div>
      </div>
      <div>
        <button
          onClick={handleAddtoCart}
          className="bg-purple-500 rounded-md shadow-md px-4 py-2 text-sm text-white"
        >
          Add to Cart+
        </button>
      </div>
    </div>
  );
};

function ProductPage() {
  const products = useAtomValue(productsAtom);

  if (products.state === "loading") {
    return <div>Loading Products...</div>;
  } else if (products.state === "hasError") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <div>{(products.error as any).message}</div>;
  }
  return (
    <div className="container mx-auto px-10">
      <h1 className="text-center text-purple-600 font-semibold text-3xl mb-4">
        Products
      </h1>
      <div className="grid grid-cols-4 gap-6 mb-10">
        {products.data.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductPage;
