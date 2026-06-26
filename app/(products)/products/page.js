import { Suspense } from "react";
import Products from "../../../components/ProductCard/Products";

const page = () => {
  return (
    <div className="pt-24">
      <Suspense>
        <Products />
      </Suspense>
    </div>
  );
};

export default page;
