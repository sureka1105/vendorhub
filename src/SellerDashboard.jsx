import React, { useState } from 'react';
import './SellerDashboard.css';

/* ─────────────────────────────────────────────
   Tiny reusable sub-components
───────────────────────────────────────────── */

/** Simple inline bar chart (no lib needed) */
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '140px', padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>₹{(d.value / 1000).toFixed(1)}k</span>
          <div
            style={{
              width: '100%',
              height: `${(d.value / max) * 100}px`,
              background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '6px 6px 0 0',
              minHeight: '4px',
              transition: 'height 0.4s ease',
            }}
          />
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Toggle switch */
function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
        background: checked ? '#16a34a' : '#d1d5db',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: '3px',
        left: checked ? '23px' : '3px',
        width: '18px', height: '18px', borderRadius: '50%',
        background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

/** Section card wrapper */
function Card({ title, children, style }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', padding: '24px',
      border: '1px solid #e5e7eb', marginBottom: '20px', ...style,
    }}>
      {title && <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: 700, color: '#111827' }}>{title}</h3>}
      {children}
    </div>
  );
}

/** Labelled input row */
function Field({ label, value, onChange, type = 'text', placeholder, readOnly, hint }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange ? e => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px',
          border: '1.5px solid #e5e7eb', outline: 'none', boxSizing: 'border-box',
          background: readOnly ? '#f9fafb' : '#fff', color: '#111827',
        }}
      />
      {hint && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>{hint}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main dashboard
───────────────────────────────────────────── */
export default function SellerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab]         = useState('overview');
  const [searchProduct, setSearchProduct] = useState('');
  const [showRestock, setShowRestock]     = useState(false);
  const [restockQty, setRestockQty]       = useState({});
  const [searchOrder, setSearchOrder]     = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter]     = useState('all');

  /* ── Earnings state ── */
  const [earningPeriod, setEarningPeriod] = useState('month'); // week | month | year
  const [payoutRequested, setPayoutRequested] = useState(false);

  /* ── Settings state ── */
  const [settingsTab, setSettingsTab]   = useState('profile');
  const [savedSettings, setSavedSettings] = useState(false);

  const [profile, setProfile] = useState({
    storeName: user?.name || 'My Store',
    ownerName: user?.name || '',
    phone: '9876543210',
    email: user?.email || 'shop@example.com',
    address: '12, Gandhi Street',
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    pincode: '641601',
    gstin: '33AABCU9603R1ZX',
  });

  const [bankDetails, setBankDetails] = useState({
    accountName: user?.name || '',
    accountNo: '****  ****  4523',
    ifsc: 'SBIN0001234',
    bankName: 'State Bank of India',
    upiId: 'shop@upi',
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderShipped: true,
    lowStock: true,
    payoutCredit: true,
    promotions: false,
    appUpdates: true,
  });

  const [delivery, setDelivery] = useState({
    freeAbove: '500',
    standardFee: '40',
    expressFee: '80',
    cutoffTime: '17:00',
    sameDayEnabled: true,
    nextDayEnabled: true,
  });

  /* ── Data ── */
  const recentOrders = [
    { id: 1, orderNo: 'ORD001234', customer: 'Raj Kumar',     amount: '₹1,200', status: 'Delivered',  date: '2024-05-18' },
    { id: 2, orderNo: 'ORD001235', customer: 'Priya Singh',   amount: '₹850',   status: 'Shipped',    date: '2024-05-18' },
    { id: 3, orderNo: 'ORD001236', customer: 'Amit Patel',    amount: '₹450',   status: 'Processing', date: '2024-05-17' },
    { id: 4, orderNo: 'ORD001237', customer: 'Deepika Verma', amount: '₹2,100', status: 'Pending',    date: '2024-05-17' },
  ];

  const [products, setProducts] = useState([
    { id: 1, name: 'Basmati Rice 1kg',  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format', price: '₹110',   stock: 250, sales: 1230 },
    { id: 2, name: 'Toor Dal 1kg',      image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=200&auto=format', price: '₹95',    stock: 180, sales: 890  },
    { id: 3, name: 'Sunflower Oil 1L',  image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format', price: '₹135',   stock: 95,  sales: 450  },
    { id: 4, name: 'Tomato (Fresh)',    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&auto=format',   price: '₹28/kg', stock: 500, sales: 320  },
    { id: 5, name: 'Apple 1kg',         image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&auto=format',   price: '₹150',   stock: 120, sales: 240  },
    { id: 6, name: 'Banana',            image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&auto=format', price: '₹40',    stock: 300, sales: 520  },
  ]);

  const [orders] = useState([
    { id: 1, customer: 'Raj Kumar',    orderDate: '2026-05-21', orderTime: '10:30 AM', delivery: '2026-05-22 06:00 PM', status: 'Pending',  items: [{ name: 'Apple', qty: 2 }] },
    { id: 2, customer: 'Priya Singh',  orderDate: '2026-05-21', orderTime: '11:00 AM', delivery: '2026-05-23 05:00 PM', status: 'Shipped',  items: [{ name: 'Banana', qty: 3 }] },
    { id: 3, customer: 'Amit Patel',   orderDate: '2026-05-20', orderTime: '09:15 AM', delivery: '2026-05-22 04:00 PM', status: 'Pending',  items: [{ name: 'Toor Dal 1kg', qty: 1 }] },
  ]);

  /* ── Earnings data ── */
  const earningsData = {
    week:  [
      { label: 'Mon', value: 3200 }, { label: 'Tue', value: 5100 }, { label: 'Wed', value: 4400 },
      { label: 'Thu', value: 6800 }, { label: 'Fri', value: 7200 }, { label: 'Sat', value: 9100 }, { label: 'Sun', value: 5300 },
    ],
    month: [
      { label: 'W1', value: 18000 }, { label: 'W2', value: 22000 }, { label: 'W3', value: 19500 }, { label: 'W4', value: 26000 },
    ],
    year:  [
      { label: 'Jan', value: 72000 }, { label: 'Feb', value: 68000 }, { label: 'Mar', value: 85000 },
      { label: 'Apr', value: 91000 }, { label: 'May', value: 78000 }, { label: 'Jun', value: 95000 },
      { label: 'Jul', value: 88000 }, { label: 'Aug', value: 102000 }, { label: 'Sep', value: 97000 },
      { label: 'Oct', value: 110000 }, { label: 'Nov', value: 125000 }, { label: 'Dec', value: 138000 },
    ],
  };

  const paymentHistory = [
    { id: 'PAY-2024',   date: '2026-05-01', amount: '₹26,000', method: 'Bank Transfer', status: 'Credited'  },
    { id: 'PAY-2023',   date: '2026-04-01', amount: '₹19,500', method: 'Bank Transfer', status: 'Credited'  },
    { id: 'PAY-2022',   date: '2026-03-01', amount: '₹22,000', method: 'Bank Transfer', status: 'Credited'  },
    { id: 'PAY-2021',   date: '2026-02-01', amount: '₹18,000', method: 'Bank Transfer', status: 'Credited'  },
    { id: 'PAY-2020',   date: '2026-01-01', amount: '₹21,000', method: 'Bank Transfer', status: 'Processing'},
  ];

  const periodTotal = earningsData[earningPeriod].reduce((s, d) => s + d.value, 0);

  /* ── Derived ── */
  const totalSales    = products.reduce((sum, p) => sum + p.sales, 0);
  const totalOrders   = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalProducts = products.length;

  const goToOrders = (filterMode) => { setOrderFilter(filterMode); setActiveTab('orders'); };

  const stats = [
    { label: 'Total Sales',    value: `₹${totalSales}`, icon: '💰', onClick: null },
    { label: 'Total Orders',   value: totalOrders,       icon: '📦', onClick: () => goToOrders('all') },
    { label: 'Pending Orders', value: pendingOrders,     icon: '⏳', onClick: () => goToOrders('pending') },
    { label: 'Products',       value: totalProducts,     icon: '🛍️', onClick: null },
  ];

  const visibleOrders = orderFilter === 'pending' ? orders.filter(o => o.status === 'Pending') : orders;

  const handleRestock = (productId) => {
    const qty = Number(restockQty[productId] || 0);
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: p.stock + qty } : p));
  };

  const imgFallback = (e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/70x70/e5e7eb/6b7280?text=🛒'; };

  const handleSaveSettings = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  /* ─────── SETTINGS INNER TABS DATA ─────── */
  const settingsTabs = [
    { key: 'profile',       label: '🏪 Store Profile'      },
    { key: 'bank',          label: '🏦 Bank & Payments'    },
    { key: 'notifications', label: '🔔 Notifications'      },
    { key: 'delivery',      label: '🚚 Delivery Settings'  },
    { key: 'security',      label: '🔒 Security'           },
    { key: 'taxes',         label: '📜 Tax & GST'          },
  ];

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div className="seller-dashboard">

      {/* Header */}
      <header className="seller-header">
        <div className="seller-header-content">
          <h1>🏪 {user?.name || 'Store'}</h1>
          <div className="seller-user-info">
            <span className="seller-role">Shopkeeper</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="seller-container">

        {/* Sidebar */}
        <aside className="seller-sidebar">
          <nav className="seller-nav">
            {[
              { key: 'overview', label: '📊 Overview'   },
              { key: 'products', label: '🛍️ My Products' },
              { key: 'orders',   label: '📦 Orders'      },
              { key: 'earnings', label: '📈 Earnings'    },
              { key: 'settings', label: '⚙️ Settings'    },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`seller-nav-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="seller-content">

          {/* ══════════════ OVERVIEW ══════════════ */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                {stats.map((stat, idx) => (
                  <div
                    key={idx} className="stat-card"
                    onClick={stat.onClick || undefined}
                    style={{ cursor: stat.onClick ? 'pointer' : 'default', transition: 'transform 0.15s' }}
                    onMouseEnter={e => { if (stat.onClick) e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-value">{stat.value}</div>
                      {stat.onClick && <div style={{ fontSize: '11px', color: '#667eea', marginTop: '4px', fontWeight: 600 }}>View →</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3>Recent Orders</h3>
                  <input type="text" placeholder="🔍 Search Customer / Order ID..." value={searchOrder}
                    onChange={e => setSearchOrder(e.target.value)}
                    style={{ width: '320px', padding: '12px 16px', background: '#f3f4f6', border: 'none', borderRadius: '14px', fontSize: '15px', outline: 'none' }}
                  />
                </div>
                <div className="table-container">
                  <table className="seller-table">
                    <thead><tr><th>Order No.</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {recentOrders.filter(o =>
                        o.orderNo.toLowerCase().includes(searchOrder.toLowerCase().trim()) ||
                        o.customer.toLowerCase().includes(searchOrder.toLowerCase().trim())
                      ).map(order => (
                        <tr key={order.id}>
                          <td>{order.orderNo}</td><td>{order.customer}</td><td>{order.amount}</td>
                          <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                          <td>{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ PRODUCTS ══════════════ */}
          {activeTab === 'products' && (
            <div className="tab-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Shopkeeper Products</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input type="text" placeholder="🔍 Search products..." value={searchProduct}
                    onChange={e => setSearchProduct(e.target.value)}
                    style={{ width: '350px', padding: '14px 18px', background: '#f3f4f6', border: 'none', borderRadius: '18px', fontSize: '16px', outline: 'none' }}
                  />
                  <button onClick={() => alert('Voice Product Entry Coming Soon')}
                    style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    🎤 Mic Add
                  </button>
                  <button onClick={() => setShowRestock(true)}
                    style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                    + Add Product
                  </button>
                </div>
              </div>
              <div className="table-container">
                <table className="seller-table">
                  <thead><tr><th>Product Name</th><th>Price</th><th>Stock</th><th>Total Sales</th><th>Action</th></tr></thead>
                  <tbody>
                    {products.filter(p => p.name.toLowerCase().includes(searchProduct.toLowerCase().trim())).map(product => (
                      <tr key={product.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={product.image} alt={product.name} onError={imgFallback}
                              style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                            <span>{product.name}</span>
                          </div>
                        </td>
                        <td>{product.price}</td><td>{product.stock}</td><td>{product.sales}</td>
                        <td><button style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontWeight: 600 }}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════════ ORDERS ══════════════ */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Orders <span style={{ fontSize: '16px', color: '#6b7280', fontWeight: 400 }}>({visibleOrders.length}{orderFilter === 'pending' ? ' pending' : ''})</span></h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'pending'].map(f => (
                    <button key={f} onClick={() => setOrderFilter(f)}
                      style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid', borderColor: orderFilter === f ? '#667eea' : '#e5e7eb',
                        background: orderFilter === f ? '#667eea' : '#fff', color: orderFilter === f ? '#fff' : '#374151', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
                      {f === 'all' ? '📋 All Orders' : '⏳ Pending Only'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="table-container">
                <table className="seller-table">
                  <thead><tr><th>Customer</th><th>Order Date</th><th>Time</th><th>Delivery</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {visibleOrders.length === 0
                      ? <tr><td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>No orders found.</td></tr>
                      : visibleOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.customer}</td><td>{order.orderDate}</td><td>{order.orderTime}</td><td>{order.delivery}</td>
                          <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                          <td>
                            <button onClick={() => setSelectedOrder(order)}
                              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}>
                              View Order
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════════ EARNINGS ══════════════ */}
          {activeTab === 'earnings' && (
            <div className="tab-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>📈 Earnings & Payments</h2>
                <button
                  onClick={() => { setPayoutRequested(true); setTimeout(() => setPayoutRequested(false), 3000); }}
                  style={{ background: payoutRequested ? '#16a34a' : '#667eea', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', transition: 'background 0.3s' }}
                >
                  {payoutRequested ? '✅ Payout Requested!' : '💸 Request Payout'}
                </button>
              </div>

              {/* Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Total Revenue',    value: '₹10,51,000', sub: 'All time',         icon: '💰', color: '#667eea' },
                  { label: 'This Month',       value: `₹${periodTotal.toLocaleString()}`, sub: earningPeriod, icon: '📅', color: '#16a34a' },
                  { label: 'Pending Payout',   value: '₹26,000',    sub: 'Processing',       icon: '⏳', color: '#f59e0b' },
                  { label: 'Avg Order Value',  value: '₹862',       sub: 'Per order',        icon: '📊', color: '#ec4899' },
                ].map((c, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '18px 20px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '26px', marginBottom: '8px' }}>{c.icon}</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: c.color }}>{c.value}</div>
                    <div style={{ fontSize: '13px', color: '#374151', fontWeight: 600, marginTop: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'capitalize' }}>{c.sub}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <Card title="Revenue Chart">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {['week', 'month', 'year'].map(p => (
                    <button key={p} onClick={() => setEarningPeriod(p)}
                      style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', borderColor: earningPeriod === p ? '#667eea' : '#e5e7eb',
                        background: earningPeriod === p ? '#667eea' : '#fff', color: earningPeriod === p ? '#fff' : '#374151',
                        fontWeight: 600, cursor: 'pointer', fontSize: '13px', textTransform: 'capitalize' }}>
                      {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Year'}
                    </button>
                  ))}
                </div>
                <BarChart data={earningsData[earningPeriod]} />
              </Card>

              {/* Top products */}
              <Card title="🏆 Top Selling Products">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[...products].sort((a, b) => b.sales - a.sales).slice(0, 5).map((p, i) => {
                    const maxSales = products[0].sales || 1;
                    const pct = Math.round((p.sales / Math.max(...products.map(x => x.sales))) * 100);
                    return (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#9ca3af', width: '20px' }}>#{i + 1}</span>
                        <img src={p.image} alt={p.name} onError={imgFallback}
                          style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{p.name}</div>
                          <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', marginTop: '4px' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#667eea,#764ba2)', borderRadius: '3px' }} />
                          </div>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151', minWidth: '60px', textAlign: 'right' }}>{p.sales} sold</span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Payment History */}
              <Card title="💳 Payment History">
                <div className="table-container">
                  <table className="seller-table">
                    <thead><tr><th>Payment ID</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                    <tbody>
                      {paymentHistory.map(pay => (
                        <tr key={pay.id}>
                          <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{pay.id}</td>
                          <td>{pay.date}</td>
                          <td style={{ fontWeight: 700, color: '#16a34a' }}>{pay.amount}</td>
                          <td>{pay.method}</td>
                          <td>
                            <span style={{
                              padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                              background: pay.status === 'Credited' ? '#dcfce7' : '#fef3c7',
                              color: pay.status === 'Credited' ? '#16a34a' : '#d97706',
                            }}>
                              {pay.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ══════════════ SETTINGS ══════════════ */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>⚙️ Seller Settings</h2>
                <button
                  onClick={handleSaveSettings}
                  style={{ background: savedSettings ? '#16a34a' : '#667eea', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', transition: 'background 0.3s' }}
                >
                  {savedSettings ? '✅ Saved!' : '💾 Save Changes'}
                </button>
              </div>

              {/* Inner tab strip */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px', background: '#f3f4f6', padding: '6px', borderRadius: '14px' }}>
                {settingsTabs.map(t => (
                  <button key={t.key} onClick={() => setSettingsTab(t.key)}
                    style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap',
                      background: settingsTab === t.key ? '#fff' : 'transparent',
                      color: settingsTab === t.key ? '#667eea' : '#6b7280',
                      boxShadow: settingsTab === t.key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ─── Store Profile ─── */}
              {settingsTab === 'profile' && (
                <>
                  <Card title="🏪 Store Information">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Store Name" value={profile.storeName} onChange={v => setProfile(p => ({ ...p, storeName: v }))} />
                      <Field label="Owner Name" value={profile.ownerName} onChange={v => setProfile(p => ({ ...p, ownerName: v }))} />
                      <Field label="Phone Number" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))} type="tel" />
                      <Field label="Email Address" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} type="email" />
                    </div>
                  </Card>
                  <Card title="📍 Store Address">
                    <Field label="Street Address" value={profile.address} onChange={v => setProfile(p => ({ ...p, address: v }))} placeholder="Building, Street" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 24px' }}>
                      <Field label="City"    value={profile.city}    onChange={v => setProfile(p => ({ ...p, city: v }))} />
                      <Field label="State"   value={profile.state}   onChange={v => setProfile(p => ({ ...p, state: v }))} />
                      <Field label="Pincode" value={profile.pincode} onChange={v => setProfile(p => ({ ...p, pincode: v }))} />
                    </div>
                  </Card>
                </>
              )}

              {/* ─── Bank & Payments ─── */}
              {settingsTab === 'bank' && (
                <>
                  <Card title="🏦 Bank Account">
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', fontSize: '13px', color: '#15803d' }}>
                      ✅ Your bank account is verified and active. Payouts are processed every Monday.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Account Holder Name" value={bankDetails.accountName} onChange={v => setBankDetails(b => ({ ...b, accountName: v }))} />
                      <Field label="Bank Name" value={bankDetails.bankName} onChange={v => setBankDetails(b => ({ ...b, bankName: v }))} />
                      <Field label="Account Number" value={bankDetails.accountNo} readOnly hint="Contact support to update account number" />
                      <Field label="IFSC Code" value={bankDetails.ifsc} onChange={v => setBankDetails(b => ({ ...b, ifsc: v }))} />
                    </div>
                  </Card>
                  <Card title="📲 UPI & Digital Payments">
                    <Field label="UPI ID" value={bankDetails.upiId} onChange={v => setBankDetails(b => ({ ...b, upiId: v }))} placeholder="yourname@upi" />
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                        <div key={app} style={{ padding: '8px 16px', background: '#f3f4f6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                          ✔ {app}
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card title="💰 Payout Schedule">
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['Weekly', 'Bi-weekly', 'Monthly'].map(opt => (
                        <button key={opt}
                          style={{ padding: '10px 20px', borderRadius: '10px', border: '2px solid', borderColor: opt === 'Weekly' ? '#667eea' : '#e5e7eb',
                            background: opt === 'Weekly' ? '#667eea' : '#fff', color: opt === 'Weekly' ? '#fff' : '#374151', fontWeight: 600, cursor: 'pointer' }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </Card>
                </>
              )}

              {/* ─── Notifications ─── */}
              {settingsTab === 'notifications' && (
                <Card title="🔔 Notification Preferences">
                  {[
                    { key: 'newOrder',     label: 'New Order Received',      desc: 'Get notified instantly when a new order comes in' },
                    { key: 'orderShipped', label: 'Order Shipped',            desc: 'When your product is picked up for delivery' },
                    { key: 'lowStock',     label: 'Low Stock Alert',          desc: 'When any product stock drops below 20 units' },
                    { key: 'payoutCredit', label: 'Payout Credited',          desc: 'When earnings are transferred to your bank' },
                    { key: 'promotions',   label: 'Promotions & Offers',      desc: 'Deals and offers from the platform' },
                    { key: 'appUpdates',   label: 'App & Feature Updates',    desc: 'New features and improvements' },
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{item.label}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{item.desc}</div>
                      </div>
                      <Toggle
                        checked={notifications[item.key]}
                        onChange={v => setNotifications(n => ({ ...n, [item.key]: v }))}
                      />
                    </div>
                  ))}
                </Card>
              )}

              {/* ─── Delivery ─── */}
              {settingsTab === 'delivery' && (
                <>
                  <Card title="🚚 Delivery Charges">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Free Delivery Above (₹)" value={delivery.freeAbove} onChange={v => setDelivery(d => ({ ...d, freeAbove: v }))} type="number" />
                      <Field label="Standard Delivery Fee (₹)" value={delivery.standardFee} onChange={v => setDelivery(d => ({ ...d, standardFee: v }))} type="number" />
                      <Field label="Express Delivery Fee (₹)" value={delivery.expressFee} onChange={v => setDelivery(d => ({ ...d, expressFee: v }))} type="number" />
                      <Field label="Order Cutoff Time" value={delivery.cutoffTime} onChange={v => setDelivery(d => ({ ...d, cutoffTime: v }))} type="time" />
                    </div>
                  </Card>
                  <Card title="⚡ Delivery Options">
                    {[
                      { key: 'sameDayEnabled', label: 'Same-Day Delivery',  desc: 'Orders before cutoff delivered same day' },
                      { key: 'nextDayEnabled', label: 'Next-Day Delivery',  desc: 'All orders guaranteed next day' },
                    ].map(item => (
                      <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{item.label}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{item.desc}</div>
                        </div>
                        <Toggle checked={delivery[item.key]} onChange={v => setDelivery(d => ({ ...d, [item.key]: v }))} />
                      </div>
                    ))}
                  </Card>
                </>
              )}

              {/* ─── Security ─── */}
              {settingsTab === 'security' && (
                <>
                  <Card title="🔒 Change Password">
                    <Field label="Current Password" value="" placeholder="Enter current password" type="password" />
                    <Field label="New Password" value="" placeholder="At least 8 characters" type="password" />
                    <Field label="Confirm New Password" value="" placeholder="Repeat new password" type="password" />
                    <button style={{ background: '#667eea', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, marginTop: '4px' }}>
                      Update Password
                    </button>
                  </Card>
                  <Card title="📱 Two-Factor Authentication">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>OTP via SMS</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Require OTP on every login</div>
                      </div>
                      <Toggle checked={true} onChange={() => {}} />
                    </div>
                  </Card>
                  <Card title="📋 Login Sessions">
                    {[
                      { device: '📱 Android Phone', location: 'Tiruppur, TN', time: 'Active now', active: true },
                      { device: '💻 Chrome Browser', location: 'Chennai, TN', time: '2 days ago', active: false },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{s.device}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{s.location} · {s.time}</div>
                        </div>
                        {s.active
                          ? <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>● This device</span>
                          : <button style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Logout</button>
                        }
                      </div>
                    ))}
                  </Card>
                </>
              )}

              {/* ─── Taxes ─── */}
              {settingsTab === 'taxes' && (
                <>
                  <Card title="📜 GST Information">
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', fontSize: '13px', color: '#1d4ed8' }}>
                      ℹ️ Your GSTIN is verified. GST invoices are auto-generated for all orders above ₹1,000.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="GSTIN" value={profile.gstin} onChange={v => setProfile(p => ({ ...p, gstin: v }))} hint="15-digit GST identification number" />
                      <Field label="PAN Number" value="AABCU9603R" readOnly hint="Contact support to update PAN" />
                      <Field label="Business Type" value="Sole Proprietorship" readOnly />
                      <Field label="Tax Category" value="Retail — Groceries" readOnly />
                    </div>
                  </Card>
                  <Card title="🧾 Tax Filing">
                    {[
                      { period: 'Apr 2026', status: 'Pending',  due: '2026-05-20', amount: '₹1,240' },
                      { period: 'Mar 2026', status: 'Filed',    due: '2026-04-20', amount: '₹1,180' },
                      { period: 'Feb 2026', status: 'Filed',    due: '2026-03-20', amount: '₹980'   },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{r.period}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>Due: {r.due}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700 }}>{r.amount}</span>
                          <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                            background: r.status === 'Filed' ? '#dcfce7' : '#fef3c7', color: r.status === 'Filed' ? '#16a34a' : '#d97706' }}>
                            {r.status}
                          </span>
                          {r.status === 'Pending' && (
                            <button style={{ background: '#667eea', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
                              File Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </Card>
                </>
              )}

            </div>
          )}

        </main>
      </div>

      {/* ── Restock Modal ── */}
      {showRestock && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', width: '700px', padding: '25px', borderRadius: '16px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2>Shop Products</h2>
            {products.map(product => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={product.image} alt={product.name} onError={imgFallback} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{product.name}</div>
                    <div>Current Stock: {product.stock}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input type="number" placeholder="Qty" value={restockQty[product.id] || ''}
                    onChange={e => setRestockQty(prev => ({ ...prev, [product.id]: e.target.value }))}
                    style={{ padding: '10px', width: '90px', border: '1px solid #ccc', borderRadius: '8px' }} />
                  <button onClick={() => handleRestock(product.id)}
                    style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}>
                    Restock
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => setShowRestock(false)}
              style={{ marginTop: '10px', background: '#ef4444', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Order Detail Modal ── */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', width: '550px', padding: '25px', borderRadius: '16px' }}>
            <h2>{selectedOrder.customer}'s Order</h2>
            <p>📅 Date: {selectedOrder.orderDate}</p>
            <p>⏰ Time: {selectedOrder.orderTime}</p>
            <p>🚚 Delivery: {selectedOrder.delivery}</p>
            <p>📌 Status: <span className={`status-badge status-${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
            {selectedOrder.items && (
              <div style={{ marginTop: '12px' }}>
                <strong>🛒 Items:</strong>
                <ul style={{ marginTop: '6px', paddingLeft: '20px' }}>
                  {selectedOrder.items.map((item, i) => <li key={i}>{item.name} × {item.qty}</li>)}
                </ul>
              </div>
            )}
            <button onClick={() => setSelectedOrder(null)}
              style={{ marginTop: '20px', background: '#ef4444', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}