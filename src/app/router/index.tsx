import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { URLS } from "@/utils/constants";
import { ScrollToTop } from "@/components/common";

const Landing = lazy(() => import("@/pages/Landing"));
const Categories = lazy(() => import("@/pages/Store/Categories"));
const Store = lazy(() => import("@/pages/Store"));
const ProductDetail = lazy(() => import("@/pages/Store/ProductDetail"));
const About = lazy(() => import("@/pages/About"));
const Origins = lazy(() => import("@/pages/Origins"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/Blog/BlogPost"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Panel = lazy(() => import("@/pages/Panel"));

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
        <Route path={URLS.privacy} element={<Privacy />} />
        <Route path={URLS.panel} element={<Panel />} />
      </Routes>
    </>
  );
};

export default Router;
