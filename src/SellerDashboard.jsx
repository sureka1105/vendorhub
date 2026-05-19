import React, { useState } from 'react';
import './SellerDashboard.css';

export default function SellerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Sales', value: '₹85,420', icon: '💰' },
    { label: 'Total Orders', value: '324', icon: '📦' },
    { label: 'Pending Orders', value: '12', icon: '⏳' },
    { label: 'Products', value: '156', icon: '🛍️' },
  ];

  const recentOrders = [
    { id: 1, orderNo: 'ORD001234', customer: 'Raj Kumar', amount: '₹1,200', status: 'Delivered', date: '2024-05-18' },
    { id: 2, orderNo: 'ORD001235', customer: 'Priya Singh', amount: '₹850', status: 'Shipped', date: '2024-05-18' },
    { id: 3, orderNo: 'ORD001236', customer: 'Amit Patel', amount: '₹450', status: 'Processing', date: '2024-05-17' },
    { id: 4, orderNo: 'ORD001237', customer: 'Deepika Verma', amount: '₹2,100', status: 'Pending', date: '2024-05-17' },
  ];

  const products = [
    { id: 1, name: 'Basmati Rice 1kg', price: '₹110', stock: 250, sales: 1230 },
    { id: 2, name: 'Toor Dal 1kg', price: '₹95', stock: 180, sales: 890 },
    { id: 3, name: 'Sunflower Oil 1L', price: '₹135', stock: 95, sales: 450 },
    { id: 4, name: 'Tomato (Fresh)', price: '₹28/kg', stock: 500, sales: 320 },
  ];

  return (
    <div className="seller-dashboard">
      {/* Header */}
      <header className="seller-header">
        <div className="seller-header-content">
          <h1>🏪 {user?.name || 'Store'}</h1>
          <div className="seller-user-info">
            <span className="seller-role">Seller</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="seller-container">
        {/* Sidebar */}
        <aside className="seller-sidebar">
          <nav className="seller-nav">
            <button
              className={`seller-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={`seller-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              🛍️ My Products
            </button>
            <button
              className={`seller-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
            <button
              className={`seller-nav-btn ${activeTab === 'earnings' ? 'active' : ''}`}
              onClick={() => setActiveTab('earnings')}
            >
              📈 Earnings
            </button>
            <button
              className={`seller-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="seller-content">
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
                  <table className="seller-table">
                    <thead>
                      <tr>
                        <th>Order No.</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.orderNo}</td>
                          <td>{order.customer}</td>
                          <td>{order.amount}</td>
                          <td>
                            <span className={`status-badge status-${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="tab-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>My Products</h2>
                <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                  + Add Product
                </button>
              </div>
              <div className="table-container">
                <table className="seller-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Total Sales</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.sales}</td>
                        <td>
                          <button style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontWeight: 600 }}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <h2>Orders</h2>
              <div className="section">
                <p>Order management features coming soon...</p>
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="tab-content">
              <h2>Earnings</h2>
              <div className="section">
                <p>Earnings analytics coming soon...</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>Store Settings</h2>
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
