import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Landing, Store } from '@/pages';

export default (): React.JSX.Element => {
  return (
    <Routes>
      <Route path={'/*'} element={<Landing />} />
      <Route path={'/tienda'} element={<Store />} />
    </Routes>
  );
};
