import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Repository from '../pages/Repository';

export default function RoutesApp() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/:author/:name" element={<Repository />} />
    </Routes>
  );
}
