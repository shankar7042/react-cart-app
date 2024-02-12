import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ProductPage = lazy(() => import("./components/ProductPage"));
const CartPage = lazy(() => import("./components/CartPage"));

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Suspense fallback={<div>Application Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
