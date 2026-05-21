import React, { useState } from 'react';

/* ─────────────────────────────────────────────
   Reusable sub-components  (same pattern as SellerDashboard)
───────────────────────────────────────────── */

/** Simple inline bar chart */
function BarChart({ data, color = '#3b82f6' }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '140px', padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>
            {d.value >= 1000 ? `₹${(d.value / 1000).toFixed(1)}k` : d.value}
          </span>
          <div style={{
            width: '100%',
            height: `${(d.value / max) * 100}px`,
            background: `linear-gradient(180deg, ${color} 0%, ${color}99 100%)`,
            borderRadius: '6px 6px 0 0',
            minHeight: '4px',
            transition: 'height 0.4s ease',
          }} />
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
        background: checked ? '#3b82f6' : '#d1d5db',
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

/** Labelled input */
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

/** Status badge */
function Badge({ label, color }) {
  const map = {
    green:  { bg: '#dcfce7', text: '#15803d' },
    yellow: { bg: '#fef3c7', text: '#d97706' },
    red:    { bg: '#fee2e2', text: '#dc2626' },
    blue:   { bg: '#dbeafe', text: '#1d4ed8' },
    gray:   { bg: '#f3f4f6', text: '#6b7280' },
  };
  const c = map[color] || map.gray;
  return (
    <span style={{
      padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
      background: c.bg, color: c.text,
    }}>{label}</span>
  );
}

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const SELLERS_DATA = [
  { id: 1, name: 'Fresh Mart',        owner: 'Ramesh Kumar',   city: 'Chennai',   products: 48, orders: 1230, revenue: '₹2,45,000', status: 'Active',   joined: '2023-01-12', phone: '9876543210', email: 'fresh@mart.com',    gstin: '33AABCU9603R1ZX', category: 'Groceries'   },
  { id: 2, name: 'Sri Lakshmi Store', owner: 'Lakshmi Devi',   city: 'Coimbatore',products: 32, orders: 890,  revenue: '₹1,78,000', status: 'Active',   joined: '2023-03-05', phone: '9845671230', email: 'lakshmi@store.com', gstin: '33BBCDE1234F1ZY', category: 'Groceries'   },
  { id: 3, name: 'Green Basket',      owner: 'Arjun Nair',     city: 'Madurai',   products: 26, orders: 450,  revenue: '₹95,000',   status: 'Active',   joined: '2023-06-18', phone: '9823456780', email: 'green@basket.com', gstin: '33CCFGH5678G1ZZ', category: 'Vegetables'  },
  { id: 4, name: 'Daily Needs',       owner: 'Priya Sharma',   city: 'Tiruppur',  products: 61, orders: 2100, revenue: '₹3,10,000', status: 'Suspended',joined: '2022-11-30', phone: '9856781234', email: 'daily@needs.com',  gstin: '33DDIJK9012H2ZA', category: 'General'     },
  { id: 5, name: 'Organic Hub',       owner: 'Suresh Babu',    city: 'Salem',     products: 19, orders: 310,  revenue: '₹67,000',   status: 'Pending',  joined: '2024-02-14', phone: '9867892345', email: 'organic@hub.com',  gstin: '33EELMN3456I2ZB', category: 'Organic'     },
  { id: 6, name: 'Spice World',       owner: 'Meena Pillai',   city: 'Trichy',    products: 40, orders: 760,  revenue: '₹1,22,000', status: 'Active',   joined: '2023-08-22', phone: '9878903456', email: 'spice@world.com',  gstin: '33FFOPQ7890J2ZC', category: 'Spices'      },
];

const USERS_DATA = [
  { id: 1, name: 'Raj Kumar',     email: 'raj@example.com',    city: 'Chennai',    orders: 24, spent: '₹18,400', joined: '2023-02-10', status: 'Active',  phone: '9876543210' },
  { id: 2, name: 'Priya Singh',   email: 'priya@example.com',  city: 'Coimbatore', orders: 18, spent: '₹12,900', joined: '2023-05-18', status: 'Active',  phone: '9812345670' },
  { id: 3, name: 'Amit Patel',    email: 'amit@example.com',   city: 'Madurai',    orders: 7,  spent: '₹4,200',  joined: '2023-09-03', status: 'Inactive',phone: '9834567890' },
  { id: 4, name: 'Deepika Verma', email: 'deepika@example.com',city: 'Salem',      orders: 41, spent: '₹32,600', joined: '2022-12-25', status: 'Active',  phone: '9856789010' },
  { id: 5, name: 'Karan Mehta',   email: 'karan@example.com',  city: 'Tiruppur',   orders: 3,  spent: '₹1,800',  joined: '2024-01-07', status: 'Banned',  phone: '9867890120' },
  { id: 6, name: 'Anjali Rao',    email: 'anjali@example.com', city: 'Trichy',     orders: 29, spent: '₹22,100', joined: '2023-04-14', status: 'Active',  phone: '9878901230' },
  { id: 7, name: 'Vikram Das',    email: 'vikram@example.com', city: 'Erode',      orders: 12, spent: '₹9,500',  joined: '2023-07-28', status: 'Active',  phone: '9889012340' },
];

const ORDERS_DATA = [
  { id: 'ORD001234', customer: 'Raj Kumar',     seller: 'Fresh Mart',        amount: '₹1,200', status: 'Delivered',  date: '2026-05-21', time: '10:30 AM', items: 3, city: 'Chennai',    payment: 'UPI'         },
  { id: 'ORD001235', customer: 'Priya Singh',   seller: 'Sri Lakshmi Store', amount: '₹850',   status: 'Shipped',    date: '2026-05-21', time: '11:00 AM', items: 2, city: 'Coimbatore', payment: 'Card'        },
  { id: 'ORD001236', customer: 'Amit Patel',    seller: 'Green Basket',      amount: '₹450',   status: 'Processing', date: '2026-05-20', time: '09:15 AM', items: 1, city: 'Madurai',    payment: 'COD'         },
  { id: 'ORD001237', customer: 'Deepika Verma', seller: 'Daily Needs',       amount: '₹2,100', status: 'Delivered',  date: '2026-05-20', time: '02:45 PM', items: 5, city: 'Salem',      payment: 'UPI'         },
  { id: 'ORD001238', customer: 'Karan Mehta',   seller: 'Organic Hub',       amount: '₹680',   status: 'Cancelled',  date: '2026-05-19', time: '03:20 PM', items: 2, city: 'Tiruppur',   payment: 'Card'        },
  { id: 'ORD001239', customer: 'Anjali Rao',    seller: 'Spice World',       amount: '₹340',   status: 'Pending',    date: '2026-05-22', time: '08:05 AM', items: 1, city: 'Trichy',     payment: 'UPI'         },
  { id: 'ORD001240', customer: 'Vikram Das',    seller: 'Fresh Mart',        amount: '₹1,550', status: 'Shipped',    date: '2026-05-22', time: '09:40 AM', items: 4, city: 'Erode',      payment: 'Net Banking' },
];

const REVENUE_DATA = {
  week:  [
    { label: 'Mon', value: 48000 }, { label: 'Tue', value: 62000 }, { label: 'Wed', value: 55000 },
    { label: 'Thu', value: 71000 }, { label: 'Fri', value: 83000 }, { label: 'Sat', value: 97000 }, { label: 'Sun', value: 64000 },
  ],
  month: [
    { label: 'W1', value: 210000 }, { label: 'W2', value: 265000 }, { label: 'W3', value: 238000 }, { label: 'W4', value: 291000 },
  ],
  year:  [
    { label: 'Jan', value: 820000 }, { label: 'Feb', value: 760000 }, { label: 'Mar', value: 950000 },
    { label: 'Apr', value: 1040000 }, { label: 'May', value: 880000 }, { label: 'Jun', value: 1120000 },
    { label: 'Jul', value: 1050000 }, { label: 'Aug', value: 1200000 }, { label: 'Sep', value: 1180000 },
    { label: 'Oct', value: 1340000 }, { label: 'Nov', value: 1510000 }, { label: 'Dec', value: 1680000 },
  ],
};

const ORDERS_CHART_DATA = {
  week:  [
    { label: 'Mon', value: 124 }, { label: 'Tue', value: 189 }, { label: 'Wed', value: 156 },
    { label: 'Thu', value: 210 }, { label: 'Fri', value: 243 }, { label: 'Sat', value: 287 }, { label: 'Sun', value: 198 },
  ],
  month: [
    { label: 'W1', value: 620 }, { label: 'W2', value: 785 }, { label: 'W3', value: 710 }, { label: 'W4', value: 862 },
  ],
  year: [
    { label: 'Jan', value: 2400 }, { label: 'Feb', value: 2180 }, { label: 'Mar', value: 2900 },
    { label: 'Apr', value: 3100 }, { label: 'May', value: 2600 }, { label: 'Jun', value: 3400 },
    { label: 'Jul', value: 3200 }, { label: 'Aug', value: 3700 }, { label: 'Sep', value: 3500 },
    { label: 'Oct', value: 4100 }, { label: 'Nov', value: 4700 }, { label: 'Dec', value: 5200 },
  ],
};

const STATUS_COLOR = {
  Active:     'green',
  Delivered:  'green',
  Credited:   'green',
  Filed:      'green',
  Shipped:    'blue',
  Processing: 'yellow',
  Pending:    'yellow',
  Suspended:  'red',
  Cancelled:  'red',
  Banned:     'red',
  Inactive:   'gray',
};

/* ─────────────────────────────────────────────
   Main AdminDashboard
───────────────────────────────────────────── */
export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab]         = useState('overview');
  const [searchSeller, setSearchSeller]   = useState('');
  const [searchUser, setSearchUser]       = useState('');
  const [searchOrder, setSearchOrder]     = useState('');
  const [orderFilter, setOrderFilter]     = useState('all');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedUser, setSelectedUser]   = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  /* Analytics */
  const [revPeriod, setRevPeriod]         = useState('month');
  const [ordPeriod, setOrdPeriod]         = useState('month');

  /* Sellers state */
  const [sellers, setSellers]             = useState(SELLERS_DATA);

  /* Users state */
  const [users, setUsers]                 = useState(USERS_DATA);

  /* Settings */
  const [settingsTab, setSettingsTab]     = useState('platform');
  const [savedSettings, setSavedSettings] = useState(false);

  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'VendorHub',
    supportEmail: 'support@vendorhub.in',
    supportPhone: '1800-123-4567',
    commissionRate: '4.5',
    gstRate: '18',
    maxProductsPerSeller: '200',
    freeDeliveryAbove: '500',
    defaultDeliveryFee: '40',
  });

  const [notifications, setNotifications] = useState({
    newSellerRegistration: true,
    orderDisputes: true,
    largeOrders: true,
    payoutRequests: true,
    systemAlerts: true,
    weeklyReport: true,
    fraudAlerts: true,
    lowPlatformBalance: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAdmin: true,
    ipWhitelist: false,
    auditLog: true,
    sessionTimeout: '60',
    maxLoginAttempts: '5',
  });

  /* ── Derived stats ── */
  const activeSellers  = sellers.filter(s => s.status === 'Active').length;
  const pendingSellers = sellers.filter(s => s.status === 'Pending').length;
  const totalUsers     = users.length;
  const activeUsers    = users.filter(u => u.status === 'Active').length;
  const totalOrdersCount = ORDERS_DATA.length;
  const pendingOrdersCount = ORDERS_DATA.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

  const overviewStats = [
    { label: 'Total Users',     value: totalUsers,        icon: '👥', sub: `${activeUsers} active`,        color: '#3b82f6', onClick: () => setActiveTab('users')   },
    { label: 'Total Sellers',   value: sellers.length,    icon: '🏪', sub: `${pendingSellers} pending`,     color: '#8b5cf6', onClick: () => setActiveTab('sellers') },
    { label: 'Total Orders',    value: totalOrdersCount,  icon: '📦', sub: `${pendingOrdersCount} pending`, color: '#f59e0b', onClick: () => setActiveTab('orders')  },
    { label: 'Platform Revenue',value: '₹24.5L',          icon: '💰', sub: 'This month',                   color: '#10b981', onClick: () => setActiveTab('analytics')},
  ];

  /* ── Filtered lists ── */
  const visibleSellers = sellers.filter(s =>
    s.name.toLowerCase().includes(searchSeller.toLowerCase().trim()) ||
    s.owner.toLowerCase().includes(searchSeller.toLowerCase().trim()) ||
    s.city.toLowerCase().includes(searchSeller.toLowerCase().trim())
  );

  const visibleUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase().trim()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase().trim()) ||
    u.city.toLowerCase().includes(searchUser.toLowerCase().trim())
  );

  const visibleOrders = ORDERS_DATA.filter(o => {
    const matchFilter = orderFilter === 'all' || o.status.toLowerCase() === orderFilter;
    const matchSearch =
      o.id.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.seller.toLowerCase().includes(searchOrder.toLowerCase());
    return matchFilter && matchSearch;
  });

  /* ── Actions ── */
  const toggleSellerStatus = (id) => {
    setSellers(prev => prev.map(s => {
      if (s.id !== id) return s;
      const next = s.status === 'Active' ? 'Suspended' : s.status === 'Suspended' ? 'Active' : s.status === 'Pending' ? 'Active' : s.status;
      return { ...s, status: next };
    }));
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const next = u.status === 'Active' ? 'Inactive' : u.status === 'Inactive' ? 'Active' : u.status === 'Banned' ? 'Active' : 'Active';
      return { ...u, status: next };
    }));
  };

  const handleSaveSettings = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  /* ── Settings inner tabs ── */
  const settingsTabs = [
    { key: 'platform',      label: '⚙️ Platform'        },
    { key: 'notifications', label: '🔔 Notifications'   },
    { key: 'security',      label: '🔒 Security'        },
    { key: 'commissions',   label: '💰 Commissions'     },
    { key: 'taxes',         label: '📜 Tax & GST'       },
  ];

  const revTotal = REVENUE_DATA[revPeriod].reduce((s, d) => s + d.value, 0);
  const ordTotal = ORDERS_CHART_DATA[ordPeriod].reduce((s, d) => s + d.value, 0);

  /* ─────────── RENDER ─────────── */
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <header style={{ background: '#1e293b', color: '#fff', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #334155' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>⚡</div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.3px' }}>VendorHub</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>Admin Control Panel</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{user?.name || 'Super Admin'}</div>
              <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600 }}>Administrator</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👤</div>
            <button onClick={onLogout} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

        {/* ── Sidebar ── */}
        <aside style={{ width: '220px', flexShrink: 0, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '24px 16px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { key: 'overview',  icon: '📊', label: 'Overview'        },
              { key: 'sellers',   icon: '🏪', label: 'Manage Sellers'  },
              { key: 'users',     icon: '👥', label: 'Users'           },
              { key: 'orders',    icon: '📦', label: 'Orders'          },
              { key: 'analytics', icon: '📈', label: 'Analytics'       },
              { key: 'settings',  icon: '⚙️', label: 'Settings'        },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 14px', borderRadius: '10px', border: 'none',
                  background: activeTab === key ? '#eff6ff' : 'transparent',
                  color: activeTab === key ? '#2563eb' : '#6b7280',
                  fontWeight: activeTab === key ? 700 : 500,
                  cursor: 'pointer', fontSize: '14px', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (activeTab !== key) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={e => { if (activeTab !== key) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '16px' }}>{icon}</span>
                {label}
                {key === 'sellers' && pendingSellers > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#fbbf24', color: '#fff', borderRadius: '10px', fontSize: '11px', fontWeight: 800, padding: '1px 7px' }}>{pendingSellers}</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: '28px 32px', overflowX: 'hidden' }}>

          {/* ══════════════════ OVERVIEW ══════════════════ */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: 800, color: '#111827' }}>Dashboard Overview</h2>

              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
                {overviewStats.map((s, i) => (
                  <div key={i} onClick={s.onClick}
                    style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginTop: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{s.sub}</div>
                    <div style={{ fontSize: '11px', color: s.color, fontWeight: 700, marginTop: '6px' }}>View →</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders + Top Sellers side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', marginBottom: '20px' }}>

                <Card title="📦 Recent Orders">
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                          {['Order No.', 'Customer', 'Seller', 'Amount', 'Status'].map(h => (
                            <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#6b7280', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS_DATA.slice(0, 5).map(o => (
                          <tr key={o.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                            <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#374151', fontWeight: 600 }}>{o.id}</td>
                            <td style={{ padding: '10px', fontWeight: 500 }}>{o.customer}</td>
                            <td style={{ padding: '10px', color: '#6b7280' }}>{o.seller}</td>
                            <td style={{ padding: '10px', fontWeight: 700 }}>{o.amount}</td>
                            <td style={{ padding: '10px' }}><Badge label={o.status} color={STATUS_COLOR[o.status] || 'gray'} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button onClick={() => setActiveTab('orders')} style={{ marginTop: '14px', background: '#eff6ff', color: '#2563eb', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>
                    View All Orders →
                  </button>
                </Card>

                <Card title="🏪 Top Sellers by Revenue">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {sellers.filter(s => s.status === 'Active').slice(0, 5).map((s, i) => (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#9ca3af', width: '18px' }}>#{i + 1}</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `hsl(${i * 60}, 60%, 85%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🏪</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.city} · {s.orders} orders</div>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>{s.revenue}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Platform summary row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Active Sellers',  value: activeSellers,  icon: '✅', color: '#10b981' },
                  { label: 'Pending Approval',value: pendingSellers, icon: '⏳', color: '#f59e0b' },
                  { label: 'Active Users',    value: activeUsers,    icon: '👤', color: '#3b82f6' },
                  { label: 'Cancelled Orders',value: ORDERS_DATA.filter(o=>o.status==='Cancelled').length, icon: '❌', color: '#ef4444' },
                ].map((c, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ fontSize: '28px' }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: c.color }}>{c.value}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ SELLERS ══════════════════ */}
          {activeTab === 'sellers' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                  🏪 Manage Sellers
                  {pendingSellers > 0 && (
                    <span style={{ marginLeft: '10px', background: '#fef3c7', color: '#d97706', fontSize: '13px', fontWeight: 700, padding: '3px 12px', borderRadius: '20px' }}>
                      {pendingSellers} pending approval
                    </span>
                  )}
                </h2>
                <input
                  type="text" placeholder="🔍 Search by name, owner, city..."
                  value={searchSeller} onChange={e => setSearchSeller(e.target.value)}
                  style={{ width: '340px', padding: '11px 16px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <Card>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                        {['Store', 'Owner', 'City', 'Products', 'Orders', 'Revenue', 'Status', 'Joined', 'Actions'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#6b7280', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleSellers.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #f9fafb', transition: 'background 0.1s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🏪</div>
                              <div>
                                <div style={{ fontWeight: 700, color: '#111827' }}>{s.name}</div>
                                <div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.category}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px', color: '#374151' }}>{s.owner}</td>
                          <td style={{ padding: '12px', color: '#6b7280' }}>{s.city}</td>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{s.products}</td>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{s.orders}</td>
                          <td style={{ padding: '12px', fontWeight: 700, color: '#10b981' }}>{s.revenue}</td>
                          <td style={{ padding: '12px' }}><Badge label={s.status} color={STATUS_COLOR[s.status] || 'gray'} /></td>
                          <td style={{ padding: '12px', color: '#9ca3af', fontSize: '12px' }}>{s.joined}</td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
                              <button onClick={() => setSelectedSeller(s)}
                                style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '6px 12px', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
                                View
                              </button>
                              <button onClick={() => toggleSellerStatus(s.id)}
                                style={{
                                  background: s.status === 'Active' ? '#fee2e2' : s.status === 'Pending' ? '#dcfce7' : '#dcfce7',
                                  color:      s.status === 'Active' ? '#dc2626' : s.status === 'Pending' ? '#16a34a' : '#16a34a',
                                  border: 'none', padding: '6px 12px', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '12px',
                                }}>
                                {s.status === 'Active' ? 'Suspend' : s.status === 'Pending' ? 'Approve' : 'Activate'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ══════════════════ USERS ══════════════════ */}
          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#111827' }}>👥 Users</h2>
                <input
                  type="text" placeholder="🔍 Search by name, email, city..."
                  value={searchUser} onChange={e => setSearchUser(e.target.value)}
                  style={{ width: '340px', padding: '11px 16px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {/* Summary row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
                {[
                  { label: 'Total Users',    value: users.length,                                          color: '#3b82f6' },
                  { label: 'Active',         value: users.filter(u=>u.status==='Active').length,           color: '#10b981' },
                  { label: 'Inactive',       value: users.filter(u=>u.status==='Inactive').length,         color: '#f59e0b' },
                  { label: 'Banned',         value: users.filter(u=>u.status==='Banned').length,           color: '#ef4444' },
                ].map((c, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: c.color }}>{c.value}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>{c.label}</div>
                  </div>
                ))}
              </div>

              <Card>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                        {['User', 'Email', 'City', 'Orders', 'Total Spent', 'Status', 'Joined', 'Actions'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#6b7280', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleUsers.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #f9fafb' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                                {u.name.charAt(0)}
                              </div>
                              <div style={{ fontWeight: 700, color: '#111827' }}>{u.name}</div>
                            </div>
                          </td>
                          <td style={{ padding: '12px', color: '#6b7280' }}>{u.email}</td>
                          <td style={{ padding: '12px', color: '#374151' }}>{u.city}</td>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{u.orders}</td>
                          <td style={{ padding: '12px', fontWeight: 700, color: '#10b981' }}>{u.spent}</td>
                          <td style={{ padding: '12px' }}><Badge label={u.status} color={STATUS_COLOR[u.status] || 'gray'} /></td>
                          <td style={{ padding: '12px', color: '#9ca3af', fontSize: '12px' }}>{u.joined}</td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => setSelectedUser(u)}
                                style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '6px 12px', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
                                View
                              </button>
                              <button onClick={() => toggleUserStatus(u.id)}
                                style={{
                                  background: u.status === 'Active' ? '#fef3c7' : '#dcfce7',
                                  color:      u.status === 'Active' ? '#d97706' : '#16a34a',
                                  border: 'none', padding: '6px 12px', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '12px',
                                }}>
                                {u.status === 'Active' ? 'Disable' : 'Enable'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ══════════════════ ORDERS ══════════════════ */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                  📦 Orders <span style={{ fontSize: '15px', color: '#6b7280', fontWeight: 400 }}>({visibleOrders.length})</span>
                </h2>
                <input
                  type="text" placeholder="🔍 Search by order ID, customer, seller..."
                  value={searchOrder} onChange={e => setSearchOrder(e.target.value)}
                  style={{ width: '340px', padding: '11px 16px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {/* Filter chips */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(f => (
                  <button key={f} onClick={() => setOrderFilter(f)}
                    style={{
                      padding: '7px 16px', borderRadius: '20px', border: '2px solid',
                      borderColor: orderFilter === f ? '#2563eb' : '#e5e7eb',
                      background: orderFilter === f ? '#2563eb' : '#fff',
                      color: orderFilter === f ? '#fff' : '#374151',
                      fontWeight: 600, cursor: 'pointer', fontSize: '13px',
                      textTransform: 'capitalize',
                    }}>
                    {f === 'all' ? '📋 All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <Card>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                        {['Order No.', 'Customer', 'Seller', 'Amount', 'Items', 'Payment', 'Status', 'Date', 'Action'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#6b7280', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleOrders.length === 0
                        ? <tr><td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>No orders match your filter.</td></tr>
                        : visibleOrders.map(o => (
                          <tr key={o.id} style={{ borderBottom: '1px solid #f9fafb' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                            onMouseLeave={e => e.currentTarget.style.background = ''}>
                            <td style={{ padding: '11px 12px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>{o.id}</td>
                            <td style={{ padding: '11px 12px', fontWeight: 600 }}>{o.customer}</td>
                            <td style={{ padding: '11px 12px', color: '#6b7280' }}>{o.seller}</td>
                            <td style={{ padding: '11px 12px', fontWeight: 700 }}>{o.amount}</td>
                            <td style={{ padding: '11px 12px', color: '#374151' }}>{o.items}</td>
                            <td style={{ padding: '11px 12px', color: '#6b7280' }}>{o.payment}</td>
                            <td style={{ padding: '11px 12px' }}><Badge label={o.status} color={STATUS_COLOR[o.status] || 'gray'} /></td>
                            <td style={{ padding: '11px 12px', color: '#9ca3af', fontSize: '12px' }}>{o.date}<br />{o.time}</td>
                            <td style={{ padding: '11px 12px' }}>
                              <button onClick={() => setSelectedOrder(o)}
                                style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '6px 14px', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ══════════════════ ANALYTICS ══════════════════ */}
          {activeTab === 'analytics' && (
            <div>
              <h2 style={{ margin: '0 0 24px', fontSize: '22px', fontWeight: 800, color: '#111827' }}>📈 Platform Analytics</h2>

              {/* KPI row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Total Revenue',      value: '₹1,20,04,000', sub: 'All time',     icon: '💰', color: '#10b981' },
                  { label: 'This Month Revenue', value: `₹${(revTotal / 100000).toFixed(2)}L`, sub: revPeriod, icon: '📅', color: '#3b82f6' },
                  { label: 'Total Orders',       value: ordTotal.toLocaleString(),             sub: ordPeriod, icon: '📦', color: '#8b5cf6' },
                  { label: 'Avg Order Value',    value: '₹1,048',       sub: 'Per order',    icon: '📊', color: '#f59e0b' },
                ].map((c, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '26px', marginBottom: '8px' }}>{c.icon}</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: c.color }}>{c.value}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginTop: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'capitalize' }}>{c.sub}</div>
                  </div>
                ))}
              </div>

              {/* Revenue + Orders charts side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <Card title="💰 Revenue Chart">
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {['week', 'month', 'year'].map(p => (
                      <button key={p} onClick={() => setRevPeriod(p)}
                        style={{ padding: '5px 14px', borderRadius: '20px', border: '2px solid', borderColor: revPeriod === p ? '#3b82f6' : '#e5e7eb',
                          background: revPeriod === p ? '#3b82f6' : '#fff', color: revPeriod === p ? '#fff' : '#374151',
                          fontWeight: 600, cursor: 'pointer', fontSize: '12px', textTransform: 'capitalize' }}>
                        {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Year'}
                      </button>
                    ))}
                  </div>
                  <BarChart data={REVENUE_DATA[revPeriod]} color="#3b82f6" />
                </Card>

                <Card title="📦 Orders Chart">
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {['week', 'month', 'year'].map(p => (
                      <button key={p} onClick={() => setOrdPeriod(p)}
                        style={{ padding: '5px 14px', borderRadius: '20px', border: '2px solid', borderColor: ordPeriod === p ? '#8b5cf6' : '#e5e7eb',
                          background: ordPeriod === p ? '#8b5cf6' : '#fff', color: ordPeriod === p ? '#fff' : '#374151',
                          fontWeight: 600, cursor: 'pointer', fontSize: '12px', textTransform: 'capitalize' }}>
                        {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Year'}
                      </button>
                    ))}
                  </div>
                  <BarChart data={ORDERS_CHART_DATA[ordPeriod]} color="#8b5cf6" />
                </Card>
              </div>

              {/* Top Sellers + Category breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card title="🏆 Top Sellers by Revenue">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[...sellers].sort((a, b) => parseInt(b.revenue.replace(/[₹,]/g, '')) - parseInt(a.revenue.replace(/[₹,]/g, ''))).slice(0, 5).map((s, i) => {
                      const maxOrders = Math.max(...sellers.map(x => x.orders));
                      const pct = Math.round((s.orders / maxOrders) * 100);
                      return (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', width: '18px' }}>#{i + 1}</span>
                          <div style={{ width: '32px', height: '32px', borderRadius: '7px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>🏪</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{s.name}</div>
                            <div style={{ height: '5px', background: '#f3f4f6', borderRadius: '3px', marginTop: '4px' }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', borderRadius: '3px' }} />
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', whiteSpace: 'nowrap' }}>{s.revenue}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card title="🗂️ Orders by Status">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Delivered',  count: ORDERS_DATA.filter(o=>o.status==='Delivered').length,  color: '#10b981', pct: 28 },
                      { label: 'Shipped',    count: ORDERS_DATA.filter(o=>o.status==='Shipped').length,    color: '#3b82f6', pct: 20 },
                      { label: 'Processing', count: ORDERS_DATA.filter(o=>o.status==='Processing').length, color: '#f59e0b', pct: 14 },
                      { label: 'Pending',    count: ORDERS_DATA.filter(o=>o.status==='Pending').length,    color: '#f97316', pct: 14 },
                      { label: 'Cancelled',  count: ORDERS_DATA.filter(o=>o.status==='Cancelled').length,  color: '#ef4444', pct: 14 },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: '#374151', width: '90px' }}>{s.label}</span>
                        <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px' }}>
                          <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '4px' }} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151', width: '20px', textAlign: 'right' }}>{s.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ══════════════════ SETTINGS ══════════════════ */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#111827' }}>⚙️ Admin Settings</h2>
                <button onClick={handleSaveSettings}
                  style={{ background: savedSettings ? '#16a34a' : '#2563eb', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', transition: 'background 0.3s' }}>
                  {savedSettings ? '✅ Saved!' : '💾 Save Changes'}
                </button>
              </div>

              {/* Inner tab strip */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px', background: '#f3f4f6', padding: '6px', borderRadius: '14px' }}>
                {settingsTabs.map(t => (
                  <button key={t.key} onClick={() => setSettingsTab(t.key)}
                    style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap',
                      background: settingsTab === t.key ? '#fff' : 'transparent',
                      color: settingsTab === t.key ? '#2563eb' : '#6b7280',
                      boxShadow: settingsTab === t.key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ─── Platform Settings ─── */}
              {settingsTab === 'platform' && (
                <>
                  <Card title="🏗️ Platform Configuration">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Platform Name"   value={platformSettings.platformName}   onChange={v => setPlatformSettings(p => ({...p, platformName: v}))} />
                      <Field label="Support Email"   value={platformSettings.supportEmail}   onChange={v => setPlatformSettings(p => ({...p, supportEmail: v}))} type="email" />
                      <Field label="Support Phone"   value={platformSettings.supportPhone}   onChange={v => setPlatformSettings(p => ({...p, supportPhone: v}))} type="tel" />
                      <Field label="Max Products per Seller" value={platformSettings.maxProductsPerSeller} onChange={v => setPlatformSettings(p => ({...p, maxProductsPerSeller: v}))} type="number" />
                    </div>
                  </Card>
                  <Card title="🚚 Delivery Defaults">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Free Delivery Above (₹)" value={platformSettings.freeDeliveryAbove} onChange={v => setPlatformSettings(p => ({...p, freeDeliveryAbove: v}))} type="number" />
                      <Field label="Default Delivery Fee (₹)" value={platformSettings.defaultDeliveryFee} onChange={v => setPlatformSettings(p => ({...p, defaultDeliveryFee: v}))} type="number" />
                    </div>
                  </Card>
                </>
              )}

              {/* ─── Notifications ─── */}
              {settingsTab === 'notifications' && (
                <Card title="🔔 Admin Notification Preferences">
                  {[
                    { key: 'newSellerRegistration', label: 'New Seller Registration',    desc: 'When a new seller submits an application' },
                    { key: 'orderDisputes',         label: 'Order Disputes',              desc: 'When a customer raises a dispute on an order' },
                    { key: 'largeOrders',           label: 'Large Order Alerts',          desc: 'Orders above ₹10,000 need review' },
                    { key: 'payoutRequests',        label: 'Seller Payout Requests',      desc: 'When sellers request manual payouts' },
                    { key: 'systemAlerts',          label: 'System Alerts',               desc: 'Critical platform health notifications' },
                    { key: 'weeklyReport',          label: 'Weekly Summary Report',       desc: 'Auto-generated platform performance digest' },
                    { key: 'fraudAlerts',           label: 'Fraud / Suspicious Activity', desc: 'Flagged accounts or unusual order patterns' },
                    { key: 'lowPlatformBalance',    label: 'Low Platform Wallet Balance', desc: 'When escrow wallet drops below ₹50,000' },
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{item.label}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{item.desc}</div>
                      </div>
                      <Toggle checked={notifications[item.key]} onChange={v => setNotifications(n => ({...n, [item.key]: v}))} />
                    </div>
                  ))}
                </Card>
              )}

              {/* ─── Security ─── */}
              {settingsTab === 'security' && (
                <>
                  <Card title="🔒 Admin Security">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Session Timeout (minutes)" value={security.sessionTimeout} onChange={v => setSecurity(s => ({...s, sessionTimeout: v}))} type="number" />
                      <Field label="Max Login Attempts"        value={security.maxLoginAttempts} onChange={v => setSecurity(s => ({...s, maxLoginAttempts: v}))} type="number" />
                    </div>
                    {[
                      { key: 'twoFactorAdmin', label: '2FA for Admin Login',   desc: 'Require OTP on every admin login' },
                      { key: 'ipWhitelist',    label: 'IP Whitelist',           desc: 'Only allow access from approved IPs' },
                      { key: 'auditLog',       label: 'Audit Log',              desc: 'Record all admin actions for compliance' },
                    ].map(item => (
                      <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{item.label}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{item.desc}</div>
                        </div>
                        <Toggle checked={security[item.key]} onChange={v => setSecurity(s => ({...s, [item.key]: v}))} />
                      </div>
                    ))}
                  </Card>
                  <Card title="🔑 Change Admin Password">
                    <Field label="Current Password"     value="" placeholder="Enter current password" type="password" />
                    <Field label="New Password"         value="" placeholder="At least 12 characters"  type="password" />
                    <Field label="Confirm New Password" value="" placeholder="Repeat new password"      type="password" />
                    <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>
                      Update Password
                    </button>
                  </Card>
                  <Card title="📋 Active Admin Sessions">
                    {[
                      { device: '💻 Chrome · Windows', location: 'Chennai, TN',    time: 'Active now', active: true  },
                      { device: '📱 Safari · iPhone',   location: 'Chennai, TN',    time: '1 hour ago', active: false },
                      { device: '💻 Firefox · MacOS',   location: 'Bangalore, KA',  time: '3 days ago', active: false },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{s.device}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{s.location} · {s.time}</div>
                        </div>
                        {s.active
                          ? <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>● This session</span>
                          : <button style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Revoke</button>
                        }
                      </div>
                    ))}
                  </Card>
                </>
              )}

              {/* ─── Commissions ─── */}
              {settingsTab === 'commissions' && (
                <>
                  <Card title="💰 Platform Commission Rates">
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', fontSize: '13px', color: '#1d4ed8' }}>
                      ℹ️ Commission is deducted automatically from each order payout before crediting sellers.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Default Commission Rate (%)" value={platformSettings.commissionRate} onChange={v => setPlatformSettings(p => ({...p, commissionRate: v}))} type="number" hint="Applied to all sellers by default" />
                      <Field label="GST Rate (%)" value={platformSettings.gstRate} onChange={v => setPlatformSettings(p => ({...p, gstRate: v}))} type="number" hint="GST on commission amount" />
                    </div>
                    {[
                      { category: 'Groceries & Staples', rate: '3%',  sellers: 4 },
                      { category: 'Vegetables & Fruits', rate: '4%',  sellers: 2 },
                      { category: 'Organic Products',    rate: '5%',  sellers: 1 },
                      { category: 'Spices',              rate: '4.5%',sellers: 1 },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>{r.category}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{r.sellers} sellers in this category</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontWeight: 800, fontSize: '16px', color: '#2563eb' }}>{r.rate}</span>
                          <button style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '5px 12px', borderRadius: '7px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Edit</button>
                        </div>
                      </div>
                    ))}
                  </Card>
                </>
              )}

              {/* ─── Tax & GST ─── */}
              {settingsTab === 'taxes' && (
                <>
                  <Card title="📜 GST Filing Status">
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', fontSize: '13px', color: '#15803d' }}>
                      ✅ Platform GSTIN is verified. Auto-invoicing is active for all orders above ₹1,000.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                      <Field label="Platform GSTIN"  value="33AABVU1234P1ZX" readOnly hint="Contact CA to update GSTIN" />
                      <Field label="PAN Number"      value="AABVU1234P"       readOnly hint="Contact support to update PAN" />
                      <Field label="Business Type"   value="Private Limited Company" readOnly />
                      <Field label="Tax Category"    value="E-commerce Operator"     readOnly />
                    </div>
                  </Card>
                  <Card title="🧾 Monthly GST Filings">
                    {[
                      { period: 'Apr 2026', status: 'Pending',  due: '2026-05-20', amount: '₹18,420' },
                      { period: 'Mar 2026', status: 'Filed',    due: '2026-04-20', amount: '₹16,980' },
                      { period: 'Feb 2026', status: 'Filed',    due: '2026-03-20', amount: '₹14,650' },
                      { period: 'Jan 2026', status: 'Filed',    due: '2026-02-20', amount: '₹15,200' },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{r.period}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>Due: {r.due}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700 }}>{r.amount}</span>
                          <Badge label={r.status} color={STATUS_COLOR[r.status] || 'gray'} />
                          {r.status === 'Pending' && (
                            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>
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

      {/* ══ SELLER DETAIL MODAL ══ */}
      {selectedSeller && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999, padding: '20px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>🏪</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{selectedSeller.name}</h2>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{selectedSeller.category} · {selectedSeller.city}</div>
                </div>
              </div>
              <button onClick={() => setSelectedSeller(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#6b7280', padding: '4px 8px' }}>×</button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Total Orders', value: selectedSeller.orders, color: '#3b82f6' },
                  { label: 'Revenue',      value: selectedSeller.revenue, color: '#10b981' },
                  { label: 'Products',     value: selectedSeller.products, color: '#8b5cf6' },
                  { label: 'Status',       value: selectedSeller.status,  color: STATUS_COLOR[selectedSeller.status] === 'green' ? '#10b981' : STATUS_COLOR[selectedSeller.status] === 'red' ? '#ef4444' : '#f59e0b' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#f9fafb', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: s.color, marginTop: '4px' }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {[
                ['Owner', selectedSeller.owner],
                ['Email', selectedSeller.email],
                ['Phone', selectedSeller.phone],
                ['GSTIN', selectedSeller.gstin],
                ['City', selectedSeller.city],
                ['Joined', selectedSeller.joined],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>{k}</span>
                  <span style={{ color: '#111827', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button onClick={() => { toggleSellerStatus(selectedSeller.id); setSelectedSeller(null); }}
                  style={{
                    flex: 1, padding: '11px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px',
                    background: selectedSeller.status === 'Active' ? '#fee2e2' : '#dcfce7',
                    color:      selectedSeller.status === 'Active' ? '#dc2626' : '#15803d',
                  }}>
                  {selectedSeller.status === 'Active' ? '🚫 Suspend Seller' : selectedSeller.status === 'Pending' ? '✅ Approve Seller' : '✅ Reactivate Seller'}
                </button>
                <button onClick={() => setSelectedSeller(null)} style={{ flex: 1, padding: '11px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: '#374151' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ USER DETAIL MODAL ══ */}
      {selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999, padding: '20px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '520px', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, color: '#2563eb' }}>
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{selectedUser.name}</h2>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{selectedUser.email}</div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#6b7280' }}>×</button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Total Orders', value: selectedUser.orders, color: '#3b82f6' },
                  { label: 'Total Spent',  value: selectedUser.spent,  color: '#10b981' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#f9fafb', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: s.color, marginTop: '4px' }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {[
                ['City', selectedUser.city],
                ['Phone', selectedUser.phone],
                ['Joined', selectedUser.joined],
                ['Status', selectedUser.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>{k}</span>
                  <span style={{ color: '#111827', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button onClick={() => { toggleUserStatus(selectedUser.id); setSelectedUser(null); }}
                  style={{
                    flex: 1, padding: '11px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px',
                    background: selectedUser.status === 'Active' ? '#fef3c7' : '#dcfce7',
                    color:      selectedUser.status === 'Active' ? '#d97706' : '#15803d',
                  }}>
                  {selectedUser.status === 'Active' ? '⛔ Disable Account' : '✅ Enable Account'}
                </button>
                <button onClick={() => setSelectedUser(null)} style={{ flex: 1, padding: '11px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: '#374151' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ ORDER DETAIL MODAL ══ */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999, padding: '20px' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '520px', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '22px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', color: '#2563eb' }}>{selectedOrder.id}</h2>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{selectedOrder.date} · {selectedOrder.time}</div>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#6b7280' }}>×</button>
            </div>
            <div style={{ padding: '24px' }}>
              {[
                ['Customer', selectedOrder.customer],
                ['Seller', selectedOrder.seller],
                ['Amount', selectedOrder.amount],
                ['Items', selectedOrder.items],
                ['Payment', selectedOrder.payment],
                ['City', selectedOrder.city],
                ['Status', selectedOrder.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>{k}</span>
                  {k === 'Status'
                    ? <Badge label={String(v)} color={STATUS_COLOR[String(v)] || 'gray'} />
                    : <span style={{ color: '#111827', fontWeight: k === 'Amount' ? 800 : 500 }}>{v}</span>
                  }
                </div>
              ))}
              <button onClick={() => setSelectedOrder(null)}
                style={{ width: '100%', marginTop: '20px', background: '#2563eb', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '15px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}