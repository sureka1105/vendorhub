import React, { useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '12,543', icon: '👥' },
    { label: 'Total Sellers', value: '284', icon: '🏪' },
    { label: 'Total Orders', value: '45,230', icon: '📦' },
    { label: 'Revenue', value: '₹24.5L', icon: '💰' },
  ];

  const recentOrders = [
    { id: 1, orderNo: 'ORD001234', seller: 'Fresh Mart', amount: '₹1,200', status: 'Delivered' },
    { id: 2, orderNo: 'ORD001235', seller: 'Sri Lakshmi Store', amount: '₹850', status: 'Shipped' },
    { id: 3, orderNo: 'ORD001236', seller: 'Green Basket', amount: '₹450', status: 'Processing' },
    { id: 4, orderNo: 'ORD001237', seller: 'Daily Needs', amount: '₹2,100', status: 'Delivered' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>VendorHub Admin Panel</h1>
          <div className="admin-user-info">
            <span className="admin-role">Admin</span>
            <span className="admin-name">{user?.name || 'Admin'}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'sellers' ? 'active' : ''}`}
              onClick={() => setActiveTab('sellers')}
            >
              🏪 Manage Sellers
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>
              
              <div className="stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-value">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="section">
                <h3>Recent Orders</h3>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order No.</th>
                        <th>Seller</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.orderNo}</td>
                          <td>{order.seller}</td>
                          <td>{order.amount}</td>
                          <td>
                            <span className={`status-badge status-${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sellers Tab */}
          {activeTab === 'sellers' && (
            <div className="tab-content">
              <h2>Manage Sellers</h2>
              <div className="section">
                <p>Seller management features coming soon...</p>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="tab-content">
              <h2>Users</h2>
              <div className="section">
                <p>Users management features coming soon...</p>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <h2>Orders</h2>
              <div className="section">
                <p>Orders management features coming soon...</p>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="tab-content">
              <h2>Analytics</h2>
              <div className="section">
                <p>Analytics dashboard coming soon...</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>Settings</h2>
              <div className="section">
                <p>Settings coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
