import { useState } from "react";

const GREEN = "#16a34a";
const GREEN_LIGHT = "#dcfce7";
const GREEN_DARK = "#15803d";

const shops = [
  { id: 1, name: "Fresh Mart", rating: 4.6, reviews: 230, time: "25-30 min", location: "0.5 km", categories: "Grocery Store", delivery: "Free delivery on orders above ₹299", image: "🏪", color: "#bbf7d0" },
  { id: 2, name: "Sri Lakshmi Store", rating: 4.6, reviews: 180, time: "20 min", location: "0.8 km", categories: "Local Store", delivery: "Free delivery", image: "🛒", color: "#fef9c3" },
  { id: 3, name: "Green Basket", rating: 4.4, reviews: 150, time: "30 min", location: "1.2 km", categories: "Vegetables & Fruits", delivery: "Free delivery", image: "🧺", color: "#d1fae5" },
  { id: 4, name: "Daily Needs", rating: 4.5, reviews: 200, time: "20 min", location: "1.5 km", categories: "General Store", delivery: "Free delivery", image: "🏬", color: "#dbeafe" },
  { id: 5, name: "Anbu Vegetables", rating: 4.3, reviews: 120, time: "15 min", location: "0.3 km", categories: "Vegetables", delivery: "Free delivery", image: "🥦", color: "#f0fdf4" },
  { id: 6, name: "Super Store", rating: 4.3, reviews: 95, time: "30 min", location: "2.0 km", categories: "Supermarket", delivery: "Free delivery", image: "🏢", color: "#fce7f3" },
];

// Product variants with different weights/quantities
const allProducts = [
  { id: 1, shopId: 1, name: "Basmati Rice", category: "Rice & Dal", image: "🍚", badge: "Best Seller", variants: [
    { weight: "500g", price: 60 },
    { weight: "1kg", price: 110 },
    { weight: "1.5kg", price: 160 },
    { weight: "2kg", price: 210 }
  ], relatedProducts: [2, 3] },
  { id: 2, shopId: 1, name: "Toor Dal", category: "Rice & Dal", image: "🟡", badge: "", variants: [
    { weight: "500g", price: 50 },
    { weight: "1kg", price: 95 },
    { weight: "1.5kg", price: 140 },
    { weight: "2kg", price: 185 }
  ], relatedProducts: [1, 6] },
  { id: 3, shopId: 1, name: "Sunflower Oil", category: "Oil & Masala", image: "🫙", badge: "Popular", variants: [
    { weight: "500ml", price: 70 },
    { weight: "1L", price: 135 },
    { weight: "2L", price: 260 }
  ], relatedProducts: [1, 5] },
  { id: 4, shopId: 1, name: "Tomato", category: "Vegetables", image: "🍅", badge: "", variants: [
    { weight: "500g", price: 15 },
    { weight: "1kg", price: 28 },
    { weight: "2kg", price: 50 }
  ], relatedProducts: [5, 11] },
  { id: 5, shopId: 1, name: "Potato", category: "Vegetables", image: "🥔", badge: "", variants: [
    { weight: "500g", price: 12 },
    { weight: "1kg", price: 20 },
    { weight: "2kg", price: 35 }
  ], relatedProducts: [4, 11] },
  { id: 6, shopId: 1, name: "Moong Dal", category: "Rice & Dal", image: "🫘", badge: "", variants: [
    { weight: "500g", price: 65 },
    { weight: "1kg", price: 120 },
    { weight: "1.5kg", price: 175 }
  ], relatedProducts: [1, 2] },
  { id: 7, shopId: 2, name: "Raw Rice (Ponni)", category: "Rice & Dal", image: "🍚", badge: "Fresh & Premium", variants: [
    { weight: "500g", price: 16 },
    { weight: "1kg", price: 28 },
    { weight: "2kg", price: 52 }
  ], relatedProducts: [8, 9] },
  { id: 8, shopId: 2, name: "Toor Dal Premium", category: "Rice & Dal", image: "🟡", badge: "", variants: [
    { weight: "500g", price: 58 },
    { weight: "1kg", price: 110 },
    { weight: "2kg", price: 210 }
  ], relatedProducts: [7, 9] },
  { id: 9, shopId: 2, name: "Moong Dal Premium", category: "Rice & Dal", image: "🫘", badge: "", variants: [
    { weight: "500g", price: 65 },
    { weight: "1kg", price: 120 },
    { weight: "2kg", price: 235 }
  ], relatedProducts: [7, 8] },
  { id: 10, shopId: 2, name: "Fresh Tomato", category: "Vegetables", image: "🍅", badge: "", variants: [
    { weight: "500g", price: 18 },
    { weight: "1kg", price: 20 },
    { weight: "2kg", price: 38 }
  ], relatedProducts: [11, 12] },
  { id: 11, shopId: 2, name: "Onion", category: "Vegetables", image: "🧅", badge: "", variants: [
    { weight: "500g", price: 12 },
    { weight: "1kg", price: 22 },
    { weight: "2kg", price: 40 }
  ], relatedProducts: [10, 4] },
  { id: 12, shopId: 3, name: "Fresh Carrot", category: "Vegetables", image: "🥕", badge: "Fresh", variants: [
    { weight: "500g", price: 22 },
    { weight: "1kg", price: 40 },
    { weight: "1.5kg", price: 55 }
  ], relatedProducts: [13, 5] },
  { id: 13, shopId: 3, name: "Spinach", category: "Vegetables", image: "🥬", badge: "", variants: [
    { weight: "250g", price: 15 },
    { weight: "500g", price: 28 },
    { weight: "1kg", price: 50 }
  ], relatedProducts: [12, 4] },
  { id: 14, shopId: 3, name: "Banana", category: "Fruits", image: "🍌", badge: "Popular", variants: [
    { weight: "Half Dozen", price: 25 },
    { weight: "Dozen", price: 40 },
    { weight: "2 Dozen", price: 75 }
  ], relatedProducts: [15] },
  { id: 15, shopId: 3, name: "Apple", category: "Fruits", image: "🍎", badge: "", variants: [
    { weight: "500g", price: 80 },
    { weight: "1kg", price: 150 },
    { weight: "1.5kg", price: 220 }
  ], relatedProducts: [14] },
];

const categories = [
  { name: "Groceries", icon: "🛍️" },
  { name: "Vegetables", icon: "🥦" },
  { name: "Fruits", icon: "🍎" },
  { name: "Dairy", icon: "🥛" },
  { name: "Bakery", icon: "🥐" },
  { name: "Snacks", icon: "🍿" },
  { name: "Beverages", icon: "🧃" },
  { name: "Rice & Dal", icon: "🍚" },
];

const orderStatuses = ["Order Placed", "Confirmed", "Packed", "Shipped", "Delivered"];

// ── NAV ──────────────────────────────────────────────────────────────────────
function BottomNav({ page, setPage, cartCount, wishlistCount }) {
  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "categories", icon: "☰", label: "Categories" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "wishlist", icon: "♡", label: "Wishlist" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e5e7eb", display: "flex", zIndex: 100 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)} style={{ flex: 1, padding: "8px 4px 10px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 20, position: "relative" }}>
            {t.icon}
            {t.id === "wishlist" && wishlistCount > 0 && <span style={{ position: "absolute", top: -4, right: -6, background: GREEN, color: "#fff", borderRadius: "50%", fontSize: 9, width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{wishlistCount}</span>}
          </span>
          <span style={{ fontSize: 10, color: page === t.id ? GREEN : "#9ca3af", fontWeight: page === t.id ? 700 : 400 }}>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

function TopBar({ title, onBack, onCart, cartCount, children }) {
  return (
    <div style={{ position: "sticky", top: 0, background: "#fff", zIndex: 50, borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      {onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 0 }}>←</button>}
      <span style={{ fontWeight: 700, fontSize: 16, flex: 1, color: "#111" }}>{title}</span>
      {children}
      {onCart && (
        <button onClick={onCart} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontSize: 22 }}>
          🛒
          {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: GREEN, color: "#fff", borderRadius: "50%", fontSize: 9, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
        </button>
      )}
    </div>
  );
}

function GreenBtn({ children, onClick, style = {} }) {
  return <button onClick={onClick} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "13px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%", ...style }}>{children}</button>;
}

// Product Variant Selector Component
function ProductVariantModal({ product, onAddToCart, onClose }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = product.variants[selectedVariant];

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 200 }}>
      <div style={{ background: "#fff", width: "100%", borderRadius: "20px 20px 0 0", padding: "20px 16px 30px", animation: "slideUp 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 40 }}>{product.image}</span>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{product.name}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: "#666" }}>Select Quantity/Weight:</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {product.variants.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariant(idx)}
                style={{
                  padding: "12px",
                  border: selectedVariant === idx ? `2px solid ${GREEN}` : "1px solid #e5e7eb",
                  background: selectedVariant === idx ? `${GREEN}22` : "#fff",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600,
                  color: selectedVariant === idx ? GREEN : "#111"
                }}
              >
                <div style={{ fontSize: 13 }}>{v.weight}</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>₹{v.price}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => { onAddToCart(product, selectedVariant); onClose(); }}
          style={{
            width: "100%",
            background: GREEN,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Add to Cart - ₹{variant.price}
        </button>
      </div>
    </div>
  );
}

function AddBtn({ onAdd, qty, onInc, onDec, onQuantityChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempQty, setTempQty] = useState(qty?.toString() || "");

  if (!qty) return <button onClick={onAdd} style={{ border: `1.5px solid ${GREEN}`, color: GREEN, background: "#fff", borderRadius: 8, padding: "5px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Add</button>;
  
  const handleSaveQty = () => {
    const numQty = parseFloat(tempQty);
    if (!isNaN(numQty) && numQty > 0) {
      onQuantityChange?.(numQty);
      setIsEditing(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${GREEN}`, borderRadius: 8, padding: "4px 8px" }}>
      <button onClick={onDec} style={{ background: "none", border: "none", color: GREEN, fontWeight: 900, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>−</button>
      {isEditing ? (
        <input
          type="number"
          step="0.1"
          value={tempQty}
          onChange={e => setTempQty(e.target.value)}
          onBlur={handleSaveQty}
          onKeyPress={e => e.key === 'Enter' && handleSaveQty()}
          style={{ fontWeight: 700, color: "#111", width: 30, textAlign: "center", border: "none", outline: "none", fontSize: 14 }}
          autoFocus
        />
      ) : (
        <span onClick={() => { setTempQty(qty.toString()); setIsEditing(true); }} style={{ fontWeight: 700, color: "#111", minWidth: 16, textAlign: "center", cursor: "pointer" }}>{qty}</span>
      )}
      <button onClick={onInc} style={{ background: "none", border: "none", color: GREEN, fontWeight: 900, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>+</button>
    </div>
  );
}

// ── PAGE: HOME ────────────────────────────────────────────────────────────────
function HomePage({ cart, setPage, setSelectedShop, addToCart, removeFromCart, wishlist, toggleWishlist }) {
  const [search, setSearch] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("Home - 123, Anna Nagar, Chennai");
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const addresses = [
    "Home - 123, Anna Nagar, Chennai",
    "Work - Tech Park, Chennai",
    "Other - 456, KK Nagar, Chennai"
  ];

  const cartCount = Object.values(cart).reduce((a, b) => a + b.qty, 0);

  const handleAddProduct = (product) => {
    setSelectedProduct(product);
    setShowVariantModal(true);
  };

  const handleAddToCart = (product, variantIdx) => {
    const variant = product.variants[variantIdx];
    addToCart({
      id: product.id,
      name: product.name,
      weight: variant.weight,
      price: variant.price,
      image: product.image,
      category: product.category
    });
    
    // Add notification
    const newNotif = { id: Date.now(), text: `${product.name} (${variant.weight}) added to cart` };
    setNotifications(prev => [...prev, newNotif]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 3000);
  };

  // Calculate predicted products based on related products
  const getPredictedProducts = () => {
    if (Object.keys(cart).length === 0) {
      return allProducts.filter(p => p.badge).slice(0, 8);
    }
    
    const cartIds = new Set(Object.keys(cart).map(Number));
    const relatedIds = new Set();
    
    // Get related products from items in cart
    Object.values(cart).forEach(item => {
      const product = allProducts.find(p => p.id === item.id);
      if (product && product.relatedProducts) {
        product.relatedProducts.forEach(rid => relatedIds.add(rid));
      }
    });
    
    const predicted = allProducts.filter(p => relatedIds.has(p.id));
    
    if (predicted.length < 4) {
      const popular = allProducts
        .filter(p => !cartIds.has(p.id) && !predicted.includes(p))
        .filter(p => p.badge)
        .slice(0, 4 - predicted.length);
      predicted.push(...popular);
    }
    
    return predicted.slice(0, 8);
  };

  const predictedProducts = getPredictedProducts();

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Notifications */}
      {notifications.length > 0 && (
        <div style={{ position: "fixed", top: 60, left: 16, right: 16, zIndex: 150 }}>
          {notifications.map(notif => (
            <div key={notif.id} style={{
              background: GREEN,
              color: "#fff",
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              animation: "slideDown 0.3s ease"
            }}>
              ✓ {notif.text}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#fff", padding: "12px 16px 0", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div onClick={() => setShowAddressModal(true)} style={{ cursor: "pointer" }}>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Deliver to</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{deliveryAddress} ▾</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => {
              const notif = { id: Date.now(), text: "You have no new notifications" };
              setNotifications([notif]);
              setTimeout(() => setNotifications([]), 2000);
            }} style={{ fontSize: 22, cursor: "pointer", background: "none", border: "none" }}>🔔</button>
            <button onClick={() => setPage("cart")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontSize: 22 }}>
              🛒
              {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: GREEN, color: "#fff", borderRadius: "50%", fontSize: 9, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 10, display: "flex", alignItems: "center", padding: "8px 12px", gap: 8 }}>
            <span>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for products, shops..." style={{ border: "none", background: "none", outline: "none", flex: 1, fontSize: 14 }} />
          </div>
          <button style={{ background: "#f3f4f6", border: "none", borderRadius: 10, padding: "0 12px", cursor: "pointer", fontSize: 18 }}>⚙</button>
        </div>
      </div>

      {/* Delivery Address Modal */}
      {showAddressModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px", maxWidth: "90%", width: 300 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Select Delivery Address</div>
            {addresses.map((addr, idx) => (
              <div
                key={idx}
                onClick={() => { setDeliveryAddress(addr); setShowAddressModal(false); }}
                style={{
                  padding: "12px 16px",
                  border: deliveryAddress === addr ? `2px solid ${GREEN}` : "1px solid #e5e7eb",
                  borderRadius: 10,
                  marginBottom: 10,
                  cursor: "pointer",
                  background: deliveryAddress === addr ? `${GREEN}11` : "#fff",
                  fontWeight: 500
                }}
              >
                📍 {addr}
              </div>
            ))}
            <button
              onClick={() => setShowAddressModal(false)}
              style={{
                width: "100%",
                background: GREEN,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Variant Modal */}
      {showVariantModal && selectedProduct && (
        <ProductVariantModal
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={() => setShowVariantModal(false)}
        />
      )}

      <div style={{ padding: "0 16px" }}>
        {/* Banner */}
        <div style={{ background: "linear-gradient(135deg,#dcfce7,#bbf7d0)", borderRadius: 16, padding: "18px 20px", marginTop: 14, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#166534" }}>Fresh Groceries</div>
            <div style={{ color: "#15803d", fontSize: 13, marginTop: 2 }}>Delivered to your Home</div>
            <div style={{ color: GREEN_DARK, fontWeight: 700, fontSize: 14, marginTop: 4 }}>Upto 50% Off</div>
            <button style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", marginTop: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Shop Now</button>
          </div>
          <span style={{ fontSize: 64 }}>🥗</span>
        </div>

        {/* Promo Code */}
        <div style={{ background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", borderRadius: 14, padding: "14px 16px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, color: "#4c1d95", fontSize: 14 }}>🎉 Flat 20% Off on your first order</div>
            <div style={{ background: "#fff", color: "#7c3aed", borderRadius: 6, padding: "4px 12px", display: "inline-block", fontWeight: 700, fontSize: 13, marginTop: 6, border: "1px dashed #7c3aed" }}>Use Code: HELLO20</div>
          </div>
          <span style={{ fontSize: 40 }}>🛵</span>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Shop by Category</span>
          <button onClick={() => setPage("categories")} style={{ color: GREEN, background: "none", border: "none", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>See all</button>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, marginBottom: 18, scrollbarWidth: "none" }}>
          {categories.map(c => (
            <div key={c.name} onClick={() => setPage("categories")} style={{ minWidth: 70, textAlign: "center", cursor: "pointer" }}>
              <div style={{ background: "#f0fdf4", borderRadius: 12, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 4px" }}>{c.icon}</div>
              <div style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{c.name}</div>
            </div>
          ))}
        </div>

        {/* Top Rated Shops */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Top Rated Shops</span>
          <button style={{ color: GREEN, background: "none", border: "none", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>See all</button>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4, marginBottom: 18, scrollbarWidth: "none" }}>
          {shops.map(s => (
            <div key={s.id} onClick={() => { setSelectedShop(s); setPage("shop"); }} style={{ minWidth: 150, background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", cursor: "pointer", overflow: "hidden" }}>
              <div style={{ background: s.color, height: 90, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{s.image}</div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>⭐ {s.rating} · {s.time}</div>
                <div style={{ fontSize: 11, color: GREEN, marginTop: 2 }}>Free delivery</div>
              </div>
            </div>
          ))}
        </div>

        {/* Predicted/Recommended Products */}
        {Object.keys(cart).length > 0 && predictedProducts.length > 0 && (
          <>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              🎯 Recommended For You
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {predictedProducts.map(p => {
                const cartItem = cart[p.id];
                const isWishlisted = wishlist.has(p.id);
                return (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: 10, overflow: "hidden" }}>
                    <div style={{ position: "relative", marginBottom: 8 }}>
                      <div style={{ width: "100%", aspectRatio: "1", background: "#f9fafb", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{p.image}</div>
                      {p.badge && <div style={{ position: "absolute", top: 4, left: 4, background: GREEN, color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: 4, padding: "2px 6px" }}>{p.badge}</div>}
                      <button onClick={() => toggleWishlist(p.id)} style={{ position: "absolute", top: 4, right: 4, background: "#fff", border: "none", fontSize: 18, cursor: "pointer", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isWishlisted ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{p.weight}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontWeight: 700, color: "#111", fontSize: 14 }}>₹{p.price}</div>
                      <AddBtn onAdd={() => addToCart(p)} qty={cartItem?.qty} onInc={() => addToCart(p)} onDec={() => removeFromCart(p.id)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Best Sellers */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>Best Sellers</div>
        {allProducts.filter(p => p.shopId === 1).map(p => {
          const cartItem = cart[p.id];
          const isWishlisted = wishlist.has(p.id);
          return (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 56, height: 56, background: "#f9fafb", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{p.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ color: "#6b7280", fontSize: 12 }}>{p.weight}</div>
                <div style={{ fontWeight: 700, color: "#111", fontSize: 14 }}>₹{p.price}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexDirection: "column" }}>
                <button onClick={() => toggleWishlist(p.id)} style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer" }}>
                  {isWishlisted ? "❤️" : "🤍"}
                </button>
                <AddBtn onAdd={() => addToCart(p)} qty={cartItem?.qty} onInc={() => addToCart(p)} onDec={() => removeFromCart(p.id)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart FAB */}
      {cartCount > 0 && (
        <div style={{ position: "fixed", bottom: 70, left: 16, right: 16, zIndex: 90 }}>
          <button onClick={() => setPage("cart")} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "14px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>🛒 {cartCount} item{cartCount > 1 ? "s" : ""}</span>
            <span>View Cart →</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── PAGE: CATEGORIES ──────────────────────────────────────────────────────────
function CategoriesPage({ setPage, setSelectedShop }) {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...categories.map(c => c.name)];
  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="Categories" />
      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", scrollbarWidth: "none", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)} style={{ whiteSpace: "nowrap", background: active === t ? GREEN : "#f3f4f6", color: active === t ? "#fff" : "#374151", border: "none", borderRadius: 20, padding: "6px 14px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Browse by Category</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {categories.filter(c => active === "All" || c.name === active).map(c => (
            <div key={c.name} style={{ background: GREEN_LIGHT, borderRadius: 14, padding: "20px 16px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: "#166534" }}>{c.name}</div>
            </div>
          ))}
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Shops in this category</div>
        {shops.map(s => (
          <div key={s.id} onClick={() => { setSelectedShop(s); setPage("shop"); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", marginBottom: 10, cursor: "pointer" }}>
            <div style={{ width: 56, height: 56, background: s.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{s.image}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{s.categories}</div>
              <div style={{ fontSize: 12, color: "#374151", marginTop: 2 }}>⭐ {s.rating} ({s.reviews}+) · 📍 {s.location} · ⏱ {s.time}</div>
            </div>
            <span style={{ color: GREEN, fontWeight: 700 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PAGE: SHOP DETAIL ─────────────────────────────────────────────────────────
function ShopPage({ shop, setPage, cart, addToCart, removeFromCart, wishlist, toggleWishlist }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const products = allProducts.filter(p => p.shopId === shop.id);
  const cats = ["All", ...new Set(products.map(p => p.category))];
  const cartCount = Object.values(cart).reduce((a, b) => a + b.qty, 0);
  const isWishlisted = wishlist.has(shop.id);
  const filtered = products.filter(p => (activeTab === "All" || p.category === activeTab) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title={shop.name} onBack={() => setPage("home")} onCart={() => setPage("cart")} cartCount={cartCount}>
        <button onClick={() => toggleWishlist(shop.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22 }}>{isWishlisted ? "❤️" : "🤍"}</button>
      </TopBar>

      {/* Shop Banner */}
      <div style={{ background: shop.color, height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70 }}>{shop.image}</div>

      {/* Shop Info */}
      <div style={{ padding: 16, background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 52, height: 52, background: shop.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{shop.image}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{shop.name}</div>
            <div style={{ color: "#6b7280", fontSize: 12 }}>⭐ {shop.rating} ({shop.reviews}+) · {shop.categories}</div>
            <div style={{ color: GREEN, fontSize: 12, marginTop: 2 }}>{shop.delivery}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Distance</div>
            <div style={{ fontWeight: 700, color: GREEN, fontSize: 13 }}>{shop.location}</div>
          </div>
          <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Delivery</div>
            <div style={{ fontWeight: 700, color: GREEN, fontSize: 13 }}>{shop.time}</div>
          </div>
          <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Rating</div>
            <div style={{ fontWeight: 700, color: GREEN, fontSize: 13 }}>⭐ {shop.rating}</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "10px 16px", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ background: "#f3f4f6", borderRadius: 10, display: "flex", alignItems: "center", padding: "8px 12px", gap: 8 }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search in ${shop.name}...`} style={{ border: "none", background: "none", outline: "none", flex: 1, fontSize: 14 }} />
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        {cats.map(c => <button key={c} onClick={() => setActiveTab(c)} style={{ whiteSpace: "nowrap", background: activeTab === c ? GREEN : "#f3f4f6", color: activeTab === c ? "#fff" : "#374151", border: "none", borderRadius: 20, padding: "6px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{c}</button>)}
      </div>

      {/* Products */}
      <div style={{ padding: "0 16px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>No products found</div>}
        {filtered.map(p => {
          const cartItem = cart[p.id];
          return (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 64, height: 64, background: "#f9fafb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{p.image}</div>
                {p.badge && <div style={{ position: "absolute", top: -4, left: -4, background: GREEN, color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: 6, padding: "2px 5px" }}>{p.badge}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ color: "#6b7280", fontSize: 12 }}>{p.weight}</div>
                <div style={{ fontWeight: 700, color: "#111", fontSize: 15 }}>₹{p.price}</div>
              </div>
              <AddBtn onAdd={() => addToCart(p)} qty={cartItem?.qty} onInc={() => addToCart(p)} onDec={() => removeFromCart(p.id)} />
            </div>
          );
        })}
      </div>

      {/* Cart FAB */}
      {cartCount > 0 && (
        <div style={{ position: "fixed", bottom: 70, left: 16, right: 16, zIndex: 90 }}>
          <button onClick={() => setPage("cart")} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "14px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>🛒 {cartCount} item{cartCount > 1 ? "s" : ""}</span>
            <span>View Cart →</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ── PAGE: CART ────────────────────────────────────────────────────────────────
function CartPage({ cart, setPage, addToCart, removeFromCart, clearCart }) {
  const items = Object.values(cart);
  const itemTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = itemTotal >= 299 ? 0 : 10;
  const total = itemTotal + deliveryFee;

  if (items.length === 0) return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="Cart" onBack={() => setPage("home")} />
      <div style={{ textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Your cart is empty</div>
        <div style={{ color: "#6b7280", marginBottom: 24 }}>Add items from shops to get started</div>
        <button onClick={() => setPage("home")} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, cursor: "pointer" }}>Browse Shops</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="My Cart" onBack={() => setPage("home")} />
      <div style={{ background: "#f0fdf4", borderRadius: 10, margin: "12px 16px", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <span>📍</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Deliver to</div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Home - 123, Anna Nagar, Chennai</div>
        </div>
        <button style={{ color: GREEN, background: "none", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Change</button>
      </div>

      <div style={{ padding: "0 16px" }}>
        {items.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ width: 56, height: 56, background: "#f9fafb", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{item.image}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>{item.weight}</div>
              <div style={{ fontWeight: 700, color: GREEN, fontSize: 14 }}>₹{item.price * item.qty}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <AddBtn qty={item.qty} onInc={() => addToCart({ id: item.id, name: item.name, weight: item.weight, price: item.price, image: item.image })} onDec={() => removeFromCart(item.id)} />
              <button onClick={() => { for (let i = 0; i < item.qty; i++) removeFromCart(item.id); }} style={{ color: "#ef4444", background: "none", border: "none", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Summary */}
      <div style={{ margin: "16px 16px 0", background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Bill Summary</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#6b7280" }}>Item Total</span>
          <span style={{ fontWeight: 600 }}>₹{itemTotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#6b7280" }}>Delivery Charge</span>
          <span style={{ fontWeight: 600, color: deliveryFee === 0 ? GREEN : "#111" }}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
        </div>
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
          <span style={{ fontWeight: 800, fontSize: 16, color: GREEN }}>₹{total}</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 12, color: "#6b7280" }}>
          <span>✅ 100% Secure</span>
          <span>🚚 On-time Delivery</span>
          <span>💰 Best Prices</span>
        </div>
        <GreenBtn onClick={() => setPage("checkout")}>Proceed to Checkout →</GreenBtn>
      </div>
    </div>
  );
}

// ── PAGE: WISHLIST ────────────────────────────────────────────────────────────
function WishlistPage({ wishlist, setPage, addToCart, removeFromCart, cart, toggleWishlist, setSelectedShop }) {
  const wishedProducts = allProducts.filter(p => wishlist.has(p.id));
  const wishedShops = shops.filter(s => wishlist.has(s.id));

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="My Wishlist" />
      
      {wishedProducts.length === 0 && wishedShops.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>No saved items yet</div>
          <div style={{ color: "#6b7280", marginBottom: 24 }}>Tap the heart on any product to save it here</div>
          <button onClick={() => setPage("home")} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, cursor: "pointer" }}>Browse Products</button>
        </div>
      ) : (
        <div style={{ padding: 16 }}>
          {/* Wishlist Products Section */}
          {wishedProducts.length > 0 && (
            <>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: "#111" }}>💝 Saved Products</div>
              {wishedProducts.map(p => {
                const cartItem = cart[p.id];
                return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", marginBottom: 10 }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 64, height: 64, background: "#f9fafb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{p.image}</div>
                      {p.badge && <div style={{ position: "absolute", top: -4, left: -4, background: GREEN, color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: 6, padding: "2px 5px" }}>{p.badge}</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>{p.weight}</div>
                      <div style={{ fontWeight: 700, color: "#111", fontSize: 14 }}>₹{p.price}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                      <button onClick={() => toggleWishlist(p.id)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>❤️</button>
                      <AddBtn onAdd={() => addToCart(p)} qty={cartItem?.qty} onInc={() => addToCart(p)} onDec={() => removeFromCart(p.id)} />
                    </div>
                  </div>
                );
              })}
              {wishedShops.length > 0 && <div style={{ height: 20 }} />}
            </>
          )}

          {/* Wishlist Shops Section */}
          {wishedShops.length > 0 && (
            <>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: "#111" }}>🏪 Saved Shops</div>
              {wishedShops.map(s => (
                <div key={s.id} onClick={() => { setSelectedShop(s); setPage("shop"); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ width: 56, height: 56, background: s.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{s.image}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{s.categories}</div>
                    <div style={{ fontSize: 12, color: "#374151", marginTop: 2 }}>⭐ {s.rating} · ⏱ {s.time}</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleWishlist(s.id); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>❤️</button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── PAGE: CHECKOUT ────────────────────────────────────────────────────────────
function CheckoutPage({ cart, setPage, clearCart }) {
  const [payMethod, setPayMethod] = useState("card");
  const items = Object.values(cart);
  const itemTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = itemTotal >= 299 ? 0 : 10;
  const total = itemTotal + deliveryFee;

  const placeOrder = () => {
    clearCart();
    setPage("tracking");
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="Checkout" onBack={() => setPage("cart")} />

      <div style={{ padding: 16 }}>
        {/* Delivery Address */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>📍 Delivery Address</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>🏠 Home</div>
              <div style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>123, 4th Street, Anna Nagar,<br />Chennai - 600040<br />9100000000</div>
            </div>
            <button style={{ color: GREEN, background: "none", border: "none", fontWeight: 700, cursor: "pointer" }}>Change</button>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>🛍️ Order Summary</div>
          {items.map(i => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 20 }}>{i.image}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{i.name} {i.weight}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Qty: {i.qty}</div>
                </div>
              </div>
              <span style={{ fontWeight: 600, fontSize: 13 }}>₹{i.price * i.qty}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 10, marginTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#6b7280", fontSize: 13 }}>Item Total</span>
              <span style={{ fontSize: 13 }}>₹{itemTotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#6b7280", fontSize: 13 }}>Delivery Fee</span>
              <span style={{ fontSize: 13, color: deliveryFee === 0 ? GREEN : "#111" }}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>💳 Payment Method</div>
          {[
            { id: "card", label: "Credit / Debit Card", sub: "•••• •••• •••• 4242", icon: "💳" },
            { id: "upi", label: "UPI", sub: "Pay via any UPI app", icon: "📱" },
            { id: "cod", label: "Cash on Delivery", sub: "Pay when delivered", icon: "💵" },
          ].map(m => (
            <div key={m.id} onClick={() => setPayMethod(m.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${payMethod === m.id ? GREEN : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {payMethod === m.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: GREEN }} />}
              </div>
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{m.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Place Order */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "12px 0" }}>
          <span style={{ fontWeight: 800, fontSize: 17 }}>Total Payable</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: GREEN }}>₹{total}</span>
        </div>
        <GreenBtn onClick={placeOrder}>Place Order →</GreenBtn>
      </div>
    </div>
  );
}

// ── PAGE: ORDER TRACKING ──────────────────────────────────────────────────────
function TrackingPage({ setPage }) {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = [
    { label: "Order Placed", time: "20 May, 10:30 AM", done: true },
    { label: "Confirmed", time: "20 May, 10:35 AM", done: true },
    { label: "Packed", time: "20 May, 10:45 AM", done: currentStep >= 2 },
    { label: "Shipped", time: "Expected: 20 May, 01:00 PM", done: currentStep >= 3 },
    { label: "Delivered", time: "Expected: 20 May, 06:00 PM", done: currentStep >= 4 },
  ];
  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="Order Tracking" onBack={() => setPage("orders")} />
      <div style={{ padding: 16 }}>
        {/* Order ID Card */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Order #VH12345678</div>
              <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>Placed on: 20 May 2024, 10:30 AM</div>
            </div>
            <div style={{ background: GREEN_LIGHT, color: GREEN, fontWeight: 700, fontSize: 12, borderRadius: 8, padding: "4px 10px" }}>Active</div>
          </div>
        </div>

        {/* Live Status */}
        <div style={{ background: "#f0fdf4", borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${GREEN}` }}>
          <div style={{ fontWeight: 700, color: GREEN, fontSize: 14, marginBottom: 4 }}>🕐 Estimated Delivery Time</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#166534" }}>20 May 2024, 06:00 PM</div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Your order is being prepared at the shop</div>
        </div>

        {/* Timeline */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Tracking Status</div>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < steps.length - 1 ? 0 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.done ? GREEN : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{s.done ? "✓" : ""}</div>
                {i < steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 28, background: steps[i + 1].done ? GREEN : "#e5e7eb", margin: "2px 0" }} />}
              </div>
              <div style={{ paddingBottom: i < steps.length - 1 ? 16 : 0 }}>
                <div style={{ fontWeight: s.done ? 700 : 400, color: s.done ? "#111" : "#9ca3af", fontSize: 14 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{s.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Simulate Progress */}
        {currentStep < 4 && (
          <button onClick={() => setCurrentStep(s => s + 1)} style={{ background: "#f0fdf4", color: GREEN, border: `1px solid ${GREEN}`, borderRadius: 10, padding: "10px", fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: 12 }}>
            Simulate Next Update →
          </button>
        )}
        {currentStep === 4 && (
          <div style={{ background: GREEN, color: "#fff", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>Order Delivered!</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Rate your experience</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 28, cursor: "pointer" }}>⭐</span>)}
            </div>
          </div>
        )}

        {/* Need Help */}
        <div style={{ background: "#f9fafb", borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Need Help?</div>
            <div style={{ color: "#6b7280", fontSize: 12 }}>We are here for you</div>
          </div>
          <button style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Contact Us</button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE: ORDERS ──────────────────────────────────────────────────────────────
function OrdersPage({ setPage }) {
  const orders = [
    { id: "VH12345678", shop: "Fresh Mart", items: "Basmati Rice, Tomato", total: 301, status: "Delivered", date: "20 May 2024", icon: "🏪" },
    { id: "VH12345679", shop: "Sri Lakshmi Store", items: "Raw Rice, Onion", total: 68, status: "Shipped", date: "19 May 2024", icon: "🛒" },
    { id: "VH12345680", shop: "Green Basket", items: "Fresh Carrot, Banana", total: 65, status: "Confirmed", date: "18 May 2024", icon: "🧺" },
  ];
  const statusColor = { Delivered: GREEN, Shipped: "#2563eb", Confirmed: "#d97706", Placed: "#6b7280" };

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="My Orders" />
      <div style={{ padding: 16 }}>
        {orders.map(o => (
          <div key={o.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 28 }}>{o.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{o.shop}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{o.date}</div>
                </div>
              </div>
              <div style={{ background: statusColor[o.status] + "22", color: statusColor[o.status], fontWeight: 700, fontSize: 11, borderRadius: 8, padding: "4px 10px" }}>{o.status}</div>
            </div>
            <div style={{ fontSize: 13, color: "#374151", marginBottom: 10 }}>{o.items}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, color: GREEN }}>₹{o.total}</span>
              <button onClick={() => setPage("tracking")} style={{ color: GREEN, background: "none", border: `1px solid ${GREEN}`, borderRadius: 8, padding: "6px 14px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PAGE: PROFILE ─────────────────────────────────────────────────────────────
function ProfilePage({ setPage, user, onLogout }) {
  const menuItems = [
    { icon: "📦", label: "My Orders", action: () => setPage("orders") },
    { icon: "📍", label: "Saved Addresses", action: () => {} },
    { icon: "💳", label: "Payment Methods", action: () => {} },
    { icon: "♡", label: "My Wishlist", action: () => setPage("wishlist") },
    { icon: "⭐", label: "Ratings & Reviews", action: () => {} },
    { icon: "🎁", label: "Offers & Coupons", action: () => {} },
    { icon: "🔔", label: "Notifications", action: () => {} },
    { icon: "❓", label: "Help & Support", action: () => {} },
    { icon: "⚙️", label: "Settings", action: () => {} },
  ];

  const displayName = user?.name || "Guest User";
  const displayEmail = user?.email || "user@email.com";

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="Profile" />
      {/* User Card */}
      <div style={{ background: GREEN, padding: "24px 16px 30px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>👤</div>
        <div style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>{displayName}</div>
        <div style={{ color: "#bbf7d0", fontSize: 14, marginTop: 2 }}>{displayEmail}</div>
        <button style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 8, padding: "6px 20px", marginTop: 12, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Edit Profile</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "#e5e7eb", margin: "0 0 16px" }}>
        {[{ label: "Orders", val: "12" }, { label: "Reviews", val: "8" }, { label: "Wishlist", val: "5" }].map(s => (
          <div key={s.label} style={{ background: "#fff", padding: "14px 0", textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: GREEN }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ padding: "0 16px" }}>
        {menuItems.map((m, i) => (
          <div key={i} onClick={m.action} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
            <span style={{ fontSize: 22, width: 28, textAlign: "center" }}>{m.icon}</span>
            <span style={{ flex: 1, fontWeight: 500, fontSize: 15 }}>{m.label}</span>
            <span style={{ color: "#9ca3af", fontSize: 18 }}>›</span>
          </div>
        ))}
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          <button onClick={onLogout} style={{ width: "100%", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 10, padding: 14, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function VendorHubApp({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState(new Set());
  const [selectedShop, setSelectedShop] = useState(null);

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: { ...product, qty: (prev[product.id]?.qty || 0) + 1 }
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const item = prev[id];
      if (!item || item.qty <= 1) { const n = { ...prev }; delete n[id]; return n; }
      return { ...prev, [id]: { ...item, qty: item.qty - 1 } };
    });
  };

  const clearCart = () => setCart({});

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b.qty, 0);

  const renderPage = () => {
    const props = { cart, setPage, addToCart, removeFromCart, clearCart, wishlist, toggleWishlist, setSelectedShop };
    switch (page) {
      case "home": return <HomePage {...props} />;
      case "categories": return <CategoriesPage setPage={setPage} setSelectedShop={setSelectedShop} />;
      case "shop": return selectedShop ? <ShopPage shop={selectedShop} {...props} /> : <HomePage {...props} />;
      case "cart": return <CartPage {...props} />;
      case "wishlist": return <WishlistPage wishlist={wishlist} setPage={setPage} setSelectedShop={setSelectedShop} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} toggleWishlist={toggleWishlist} />;
      case "checkout": return <CheckoutPage cart={cart} setPage={setPage} clearCart={clearCart} />;
      case "tracking": return <TrackingPage setPage={setPage} />;
      case "orders": return <OrdersPage setPage={setPage} />;
      case "profile": return <ProfilePage setPage={setPage} user={user} onLogout={onLogout} />;
      default: return <HomePage {...props} />;
    }
  };

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", background: "#f9fafb", minHeight: "100vh", position: "relative", fontFamily: "'Segoe UI', sans-serif" }}>
      {renderPage()}
      <BottomNav page={page} setPage={setPage} cartCount={cartCount} wishlistCount={wishlist.size} />
    </div>
  );
}
