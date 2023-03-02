import { Route, Routes } from 'react-router-dom';

import HomePage from 'components/pages/homePage/HomePage';

const App = () => (
  <Routes>
    <Route index element={<HomePage />} />
  </Routes>
);

export default App;
