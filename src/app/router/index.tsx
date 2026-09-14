import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { URLS } from "@/utils/constants";
import { ScrollToTop } from "@/components/common";

const Landing = lazy(() =>
  import("@/pages/Landing/Landing").then((m) => ({ default: m.Landing })),
);
const Categories = lazy(() =>
  import("@/pages/Store/Categories/Categories").then((m) => ({
    default: m.Categories,
  })),
);
const Store = lazy(() =>
  import("@/pages/Store/Store").then((m) => ({ default: m.Store })),
);
const ProductDetail = lazy(() =>
  import("@/pages/Store/ProductDetail/ProductDetail").then((m) => ({
    default: m.ProductDetail,
  })),
);
const About = lazy(() =>
  import("@/pages/About/About").then((m) => ({ default: m.About })),
);
const Origins = lazy(() =>
  import("@/pages/Origins/Origins").then((m) => ({ default: m.Origins })),
);
const Contact = lazy(() =>
  import("@/pages/Contact/Contact").then((m) => ({ default: m.Contact })),
);
const Blog = lazy(() =>
  import("@/pages/Blog/Blog").then((m) => ({ default: m.Blog })),
);
const BlogPost = lazy(() =>
  import("@/pages/Blog/BlogPost/BlogPost").then((m) => ({
    default: m.BlogPost,
  })),
);
const Checkout = lazy(() =>
  import("@/pages/Checkout/Checkout").then((m) => ({ default: m.Checkout })),
);
const Terms = lazy(() =>
  import("@/pages/Terms/Terms").then((m) => ({ default: m.Terms })),
);

const Router = (): React.JSX.Element => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={URLS.all} element={<Landing />} />
        <Route path={URLS.home} element={<Landing />} />
        <Route path={URLS.categories} element={<Categories />} />
        <Route path={URLS.store} element={<Store />} />
        <Route path={`${URLS.store}/:productId`} element={<ProductDetail />} />
        <Route path={URLS.about} element={<About />} />
        <Route path={URLS.origins} element={<Origins />} />
        <Route path={URLS.contact} element={<Contact />} />
        <Route path={URLS.blog} element={<Blog />} />
        <Route path={`${URLS.blog}/:slug`} element={<BlogPost />} />
        <Route path={URLS.checkout} element={<Checkout />} />
        <Route path={URLS.terms} element={<Terms />} />
      </Routes>
    </>
  );
};

export default Router;
