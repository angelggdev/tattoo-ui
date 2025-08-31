import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login.tsx';
import Transactions from './main/transactions/Transactions.tsx';
import ProtectedRoute from './shared/components/ProtectedRoute/ProtectedRoute.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='home' element={<Transactions />} />
        <Route path='auth/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='*' element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
