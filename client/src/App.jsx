import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        logout,
        login,
        userId,
        isAuthenticated,
      }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
