import React, { Suspense } from 'react';
import Router from './app/router';
import { Navbar, Footer } from './components/layout';

export const App: React.FC = () => {
  return (
    <div className="fm-container">
      {/* <OverlayLoader show={loader} /> */}
      {/* <Suspense fallback={<OverlayLoader show={true} />}> */}

      <Suspense fallback={'Cargandoooooo...'}>
        <Navbar />

        <Router />

        <Footer />
      </Suspense>
    </div>
  );
};
