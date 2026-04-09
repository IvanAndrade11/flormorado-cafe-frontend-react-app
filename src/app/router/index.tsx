import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Landing,
  Categories,
  Store,
  About,
  Origins,
  Contact,
  Blog,
  BlogPost,
} from "@/pages";

import { URLS } from "@/utils/constants";

export default (): React.JSX.Element => {
  return (
    <>
      <Routes>
        <Route path={URLS.all} element={<Landing />} />
        <Route path={URLS.home} element={<Landing />} />
        <Route path={URLS.categories} element={<Categories />} />
        <Route path={URLS.store} element={<Store />} />
        <Route path={URLS.about} element={<About />} />
        <Route path={URLS.origins} element={<Origins />} />
        <Route path={URLS.contact} element={<Contact />} />
        <Route path={URLS.blog} element={<Blog />} />
        <Route path={`${URLS.blog}/:slug`} element={<BlogPost />} />
      </Routes>
    </>
  );
};
