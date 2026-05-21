import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {

  const [userRole, setUserRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setError('');

    onLogin({
      role: userRole,
      email: email,
      name: email.split('@')[0]
    });
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    setError('');
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <div className="login-header">
          <h1>VendorHub</h1>
          <p>Marketplace Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="role-selector">

            <label>Login As:</label>

            <div className="role-buttons">

              <button
                type="button"
                className={`role-btn ${userRole==='admin' ? 'active' : ''}`}
                onClick={()=>handleRoleChange('admin')}
              >
                👤 Admin
              </button>

              <button
                type="button"
                className={`role-btn ${userRole==='shopkeeper' ? 'active' : ''}`}
                onClick={()=>handleRoleChange('shopkeeper')}
              >
                🏪 Shopkeeper
              </button>

              <button
                type="button"
                className={`role-btn ${userRole==='customer' ? 'active' : ''}`}
                onClick={()=>handleRoleChange('customer')}
              >
                🛒 Customer
              </button>

            </div>

          </div>

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
            />

          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button type="submit" className="login-btn">
            Sign In
          </button>

          <div className="demo-info">
            <p>Demo Credentials:</p>
            <small>Email: admin@vendorhub.com | Pass: demo123</small>
            <small>Email: shopkeeper@vendorhub.com | Pass: demo123</small>
            <small>Email: customer@vendorhub.com | Pass: demo123</small>
          </div>

        </form>

      </div>

    </div>
  );
}