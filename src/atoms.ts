import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { Cart, Product } from "./types";

const productsAsyncAtom = atom<Promise<Product[]>>(async () => {
  await new Promise((res) => setTimeout(res, 1000));
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});

export const productsAtom = loadable(productsAsyncAtom);
const productDataAtom = atom((get) => {
  const res = get(productsAtom);
  return res.state === "hasData" ? res.data : [];
});

export const cartAtom = atom<Cart[]>([]);

export type ProductCart = Product & Omit<Cart, "productId">;

export const getCartAtom = atom<ProductCart[]>((get) => {
  const products = get(productDataAtom);
  return products.reduce((acc, product) => {
    const productInCart = get(cartAtom).find(
      (item) => item.productId === product.id
    );
    if (productInCart) {
      acc.push({ ...product, quantity: productInCart.quantity });
    }
    return acc;
  }, [] as ProductCart[]);
});

export const setCartAtom = atom(null, (get, set, productId: number) => {
  const cart = get(cartAtom);
  const isItemPresent = cart.find((item) => item.productId === productId);
  if (isItemPresent) {
    set(
      cartAtom,
      cart.map((item) => {
        return item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      })
    );
  } else {
    set(cartAtom, [...cart, { productId: productId, quantity: 1 }]);
  }
});

export const cartItemsCountAtom = atom((get) =>
  get(cartAtom).reduce((acc, curr) => acc + curr.quantity, 0)
);

export const orderSummaryAtom = atom<{
  subtotal: number;
  shippingEstimate: number;
  taxEstimate: number;
  orderTotal: number;
}>((get) => {
  const productCart = get(getCartAtom);
  const subtotal = productCart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const shippingEstimate = 40;
  const taxPercentage = 15 / 100;
  const taxEstimate = subtotal * taxPercentage;
  const orderTotal = subtotal + shippingEstimate + taxEstimate;
  return { subtotal, shippingEstimate, taxEstimate, orderTotal };
});
