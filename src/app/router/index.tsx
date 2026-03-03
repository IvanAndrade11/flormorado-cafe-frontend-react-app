import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Landing,
  Store,
  About,
  Origins,
  Contact,
  Blog,
  Categories,
} from "@/pages";

import { URLS } from "@/utils/constants";

export default (): React.JSX.Element => {
  return (
    <Routes>
      <Route path={URLS.home} element={<Landing />} />
      <Route path={URLS.store} element={<Store />} />
      <Route path={URLS.categories} element={<Categories />} />
      <Route path={URLS.about} element={<About />} />
      <Route path={URLS.origins} element={<Origins />} />
      <Route path={URLS.contact} element={<Contact />} />
      <Route path={URLS.blog} element={<Blog />} />
    </Routes>
  );
};
