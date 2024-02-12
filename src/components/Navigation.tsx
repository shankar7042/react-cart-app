import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { cartItemsCountAtom } from "../atoms";

const Navigation = () => {
  const cartItemsCount = useAtomValue(cartItemsCountAtom);

  return (
    <nav className="bg-zinc-200 p-4 flex justify-between items-center">
      <Link to="/" className="text-3xl font-bold text-green-600 pl-10">
        MyStore
      </Link>
      <ul className="flex gap-4 mr-[100px]">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {cartItemsCount !== 0 && (
              <span className="text-xs w-5 h-5 absolute p-2 text-white flex justify-center items-center text-center rounded-full bg-green-500 -right-1/2 -top-1/2">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
