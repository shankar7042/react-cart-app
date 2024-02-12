import { useAtomValue, useSetAtom } from "jotai";
import { ProductCart, cartAtom, getCartAtom, orderSummaryAtom } from "../atoms";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils";

const CartPage = () => {
  const productsCart = useAtomValue(getCartAtom);
  const setCart = useSetAtom(cartAtom);

  const handleRemoveFromCart = (productId: number) => {
    setCart((cart) => cart.filter((item) => item.productId !== productId));
  };

  if (productsCart.length === 0) {
    return (
      <div className="text-center text-xl mt-4">
        No items in Cart go to{" "}
        <Link to="/" className="underline text-blue-600">
          Products
        </Link>{" "}
        page
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl mt-5">
      <div className="grid grid-cols-[2fr_1fr] gap-2 my-4">
        <ProductCart
          productsCart={productsCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
        <OrderSummary />
      </div>
    </div>
  );
};

const ProductCart = ({
  productsCart,
  handleRemoveFromCart,
}: {
  productsCart: ProductCart[];
  handleRemoveFromCart: (productId: number) => void;
}) => {
  return (
    <div>
      {productsCart.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center gap-4 border py-6 px-4"
        >
          <div className="flex gap-4">
            <div className="w-100 rounded-md shadow-md border-black">
              <img
                className="w-28 aspect-square object-contain"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>{product.title}</span>
              <span>
                {product.description.slice(0, 25)}
                {product.description.length > 25 && "..."}
              </span>
              <span className="font-bold">{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-sm">
              x {product.quantity} ={" "}
              {formatCurrency(product.price * product.quantity)}
            </span>
            <button
              onClick={() => handleRemoveFromCart(product.id)}
              className="text-white px-4 py-2 rounded-md shadow-md bg-purple-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const OrderSummary = () => {
  const { subtotal, shippingEstimate, taxEstimate, orderTotal } =
    useAtomValue(orderSummaryAtom);
  return (
    <div className="bg-slate-200 p-4 self-start rounded-md">
      <h3 className="font-bold text-lg mb-3">Order Summary</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Subtotal</span>
          <span className="text-sm font-semibold">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Shipping Estimate</span>
          <span className="text-sm font-semibold">
            {formatCurrency(shippingEstimate)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Tax estimate</span>
          <span className="text-sm font-semibold">
            {formatCurrency(taxEstimate)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">Order total</span>
          <span className="text-sm font-semibold">
            {formatCurrency(orderTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
