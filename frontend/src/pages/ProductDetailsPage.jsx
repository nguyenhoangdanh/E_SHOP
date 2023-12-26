import React, { useState } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  // useEffect(() => {
  //   if (eventData !== null) {
  //     const data = allEvents && allEvents.find((i) => i._id === id);
  //     setData(data);
  //   }
  //   if (eventData === null) {
  //     const data1 = allProducts && allProducts.find((i) => i.id === id);
  //     console.log("ok 1", data1);
  //     setData(data);
  //   }
  // }, [allProducts, allEvents]);

  useEffect(() => {
    if (eventData !== null) {
      const resultEvent = allEvents && allEvents.find((i) => i._id === id);
      setData(resultEvent);
    } else {
      const resultProduct =
        allProducts && allProducts.find((i) => i._id === id);
      setData(resultProduct);
    }
    }, [allProducts, allEvents]);
  // }, []);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
