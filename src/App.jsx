import { useState } from 'react';
import Login from './Login.jsx';
import VendorHubApp from './VendorHub_BuyerUI.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import SellerDashboard from './SellerDashboard.jsx';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Render different dashboards based on user role
  if (user.role === 'admin') {
  return <AdminDashboard user={user} onLogout={handleLogout} />;
}
else if (user.role === 'shopkeeper') {
  return <SellerDashboard user={user} onLogout={handleLogout} />;
}
else {
  return <VendorHubApp user={user} onLogout={handleLogout} />;
}
}
