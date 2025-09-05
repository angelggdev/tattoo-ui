import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Home from './main/Home.tsx';
import "./styles/index.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='auth/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='*' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
