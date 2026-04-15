import React, { Suspense } from "react";
import Router from "./app/router";

import { Navbar, Footer } from "./components/layout";
import { useInit } from "./hooks/useInit";
import { Loader, ToastFmc } from "./components/common";

export const App: React.FC = () => {
  const { loader } = useInit();

  return (
    <div className="fm-container">
      <Loader show={loader} />
      <Suspense fallback={<Loader show={true} />}>
        <Navbar />
        <Router />
        <Footer />
      </Suspense>
      <ToastFmc />
    </div>
  );
};
