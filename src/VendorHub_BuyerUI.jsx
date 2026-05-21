import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const G = "#16a34a";
const GL = "#dcfce7";
const GD = "#15803d";

// ─── REAL PRODUCT IMAGES (Unsplash — reliable crop URLs) ─────────────────────
// We load via img tags; onError falls back to a green placeholder.
// The URL is NOT shown in any UI label — only the <img src> attribute uses it.
const PRODUCT_IMG = {
  "Basmati Rice":       "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
  "Toor Dal":           "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=300&fit=crop",
  "Sunflower Oil":      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
  "Tomato":             "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300&h=300&fit=crop",
  "Fresh Tomato":       "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300&h=300&fit=crop",
  "Potato":             "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop",
  "Moong Dal":          "https://images.unsplash.com/photo-1617501537405-5e19a5f90697?w=300&h=300&fit=crop",
  "Moong Dal Premium":  "https://images.unsplash.com/photo-1617501537405-5e19a5f90697?w=300&h=300&fit=crop",
  "Raw Rice (Ponni)":   "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=300&h=300&fit=crop",
  "Toor Dal Premium":   "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=300&fit=crop",
  "Onion":              "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop",
  "Fresh Carrot":       "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
  "Spinach":            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
  "Banana":             "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
  "Apple":              "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
};
const SHOP_IMG = {
  "Fresh Mart":       "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=300&fit=crop",
  "Sri Lakshmi Store":"https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=300&fit=crop",
  "Green Basket":     "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=300&fit=crop",
  "Daily Needs":      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&h=300&fit=crop",
  "Anbu Vegetables":  "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&h=300&fit=crop",
  "Super Store":      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=300&fit=crop",
};
const CAT_IMG = {
  Groceries:  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
  Vegetables: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=200&h=200&fit=crop",
  Fruits:     "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&h=200&fit=crop",
  Dairy:      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop",
  Bakery:     "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
  Snacks:     "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop",
  Beverages:  "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop",
  "Rice & Dal":"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const shops = [
  { id:1, name:"Fresh Mart",        rating:4.6, reviews:230, time:"25-30 min", location:"0.5 km", categories:"Grocery Store",        delivery:"Free delivery on orders above ₹299" },
  { id:2, name:"Sri Lakshmi Store", rating:4.6, reviews:180, time:"20 min",    location:"0.8 km", categories:"Local Store",           delivery:"Free delivery" },
  { id:3, name:"Green Basket",      rating:4.4, reviews:150, time:"30 min",    location:"1.2 km", categories:"Vegetables & Fruits",   delivery:"Free delivery" },
  { id:4, name:"Daily Needs",       rating:4.5, reviews:200, time:"20 min",    location:"1.5 km", categories:"General Store",         delivery:"Free delivery" },
  { id:5, name:"Anbu Vegetables",   rating:4.3, reviews:120, time:"15 min",    location:"0.3 km", categories:"Vegetables",            delivery:"Free delivery" },
  { id:6, name:"Super Store",       rating:4.3, reviews:95,  time:"30 min",    location:"2.0 km", categories:"Supermarket",           delivery:"Free delivery" },
];

const allProducts = [
  { id:1,  shopId:1, name:"Basmati Rice",      category:"Rice & Dal",   badge:"Best Seller",    variants:[{w:"500g",p:60},{w:"1kg",p:110},{w:"1.5kg",p:160},{w:"2kg",p:210}], related:[2,3], desc:"Premium long-grain basmati, aged for superior aroma and flavor." },
  { id:2,  shopId:1, name:"Toor Dal",           category:"Rice & Dal",   badge:"",               variants:[{w:"500g",p:50},{w:"1kg",p:95},{w:"1.5kg",p:140},{w:"2kg",p:185}],  related:[1,6], desc:"Sun-dried toor dal, protein-rich, perfect for everyday dal." },
  { id:3,  shopId:1, name:"Sunflower Oil",      category:"Oil & Masala", badge:"Popular",        variants:[{w:"500ml",p:70},{w:"1L",p:135},{w:"2L",p:260}],                    related:[1,5], desc:"Cold-pressed sunflower oil, light and heart-healthy." },
  { id:4,  shopId:1, name:"Tomato",             category:"Vegetables",   badge:"",               variants:[{w:"250g",p:8},{w:"500g",p:15},{w:"1kg",p:28},{w:"2kg",p:50}],       related:[5,11],desc:"Farm-fresh red tomatoes, rich in lycopene." },
  { id:5,  shopId:1, name:"Potato",             category:"Vegetables",   badge:"",               variants:[{w:"500g",p:12},{w:"1kg",p:20},{w:"2kg",p:35},{w:"5kg",p:80}],        related:[4,11],desc:"Freshly harvested potatoes, ideal for frying or curries." },
  { id:6,  shopId:1, name:"Moong Dal",          category:"Rice & Dal",   badge:"",               variants:[{w:"500g",p:65},{w:"1kg",p:120},{w:"1.5kg",p:175}],                 related:[1,2], desc:"Washed moong dal, easy to cook, high in protein." },
  { id:7,  shopId:2, name:"Raw Rice (Ponni)",   category:"Rice & Dal",   badge:"Fresh & Premium",variants:[{w:"500g",p:16},{w:"1kg",p:28},{w:"2kg",p:52},{w:"5kg",p:125}],       related:[8,9], desc:"Famous Ponni raw rice, soft texture, great for daily cooking." },
  { id:8,  shopId:2, name:"Toor Dal Premium",   category:"Rice & Dal",   badge:"",               variants:[{w:"500g",p:58},{w:"1kg",p:110},{w:"2kg",p:210}],                   related:[7,9], desc:"Premium grade toor dal, cleaned and sorted." },
  { id:9,  shopId:2, name:"Moong Dal Premium",  category:"Rice & Dal",   badge:"",               variants:[{w:"500g",p:65},{w:"1kg",p:120},{w:"2kg",p:235}],                   related:[7,8], desc:"Extra-clean premium moong dal from top farms." },
  { id:10, shopId:2, name:"Fresh Tomato",       category:"Vegetables",   badge:"",               variants:[{w:"250g",p:9},{w:"500g",p:18},{w:"1kg",p:32},{w:"2kg",p:60}],        related:[11,4],desc:"Juicy ripe tomatoes delivered same day." },
  { id:11, shopId:2, name:"Onion",              category:"Vegetables",   badge:"",               variants:[{w:"500g",p:12},{w:"1kg",p:22},{w:"2kg",p:40},{w:"5kg",p:95}],         related:[10,4],desc:"Crisp red onions, sourced directly from farmers." },
  { id:12, shopId:3, name:"Fresh Carrot",       category:"Vegetables",   badge:"Fresh",          variants:[{w:"250g",p:12},{w:"500g",p:22},{w:"1kg",p:40},{w:"1.5kg",p:55}],      related:[13,5],desc:"Crunchy carrots, rich in beta-carotene." },
  { id:13, shopId:3, name:"Spinach",            category:"Vegetables",   badge:"",               variants:[{w:"250g",p:15},{w:"500g",p:28},{w:"1kg",p:50}],                     related:[12,4],desc:"Tender baby spinach, washed and ready to cook." },
  { id:14, shopId:3, name:"Banana",             category:"Fruits",       badge:"Popular",        variants:[{w:"Half Dozen",p:25},{w:"Dozen",p:40},{w:"2 Dozen",p:75}],           related:[15],  desc:"Sweet ripe bananas, naturally grown." },
  { id:15, shopId:3, name:"Apple",              category:"Fruits",       badge:"",               variants:[{w:"500g",p:80},{w:"1kg",p:150},{w:"1.5kg",p:220},{w:"2kg",p:290}],   related:[14],  desc:"Crisp Shimla apples, hand-picked for freshness." },
];

const categories = ["Groceries","Vegetables","Fruits","Dairy","Bakery","Snacks","Beverages","Rice & Dal"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function pImg(name) { return PRODUCT_IMG[name] || "https://images.unsplash.com/photo-1543168256-418811576931?w=300&h=300&fit=crop"; }

// Safe image component — shows a green circle if src fails
function PImg({ src, alt, style, onClick }) {
  const [err, setErr] = useState(false);
  if (err) return (
    <div onClick={onClick} style={{ background: GL, display:"flex", alignItems:"center", justifyContent:"center", color:GD, fontSize:28, fontWeight:700, ...style }}>🌿</div>
  );
  return <img src={src} alt={alt||""} onError={()=>setErr(true)} onClick={onClick} style={{ objectFit:"cover", display:"block", ...style }} />;
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function TopBar({ title, onBack, onCart, cartCount, right }) {
  return (
    <div style={{ position:"sticky", top:0, background:"#fff", zIndex:80, borderBottom:"1px solid #e5e7eb", padding:"13px 16px", display:"flex", alignItems:"center", gap:10 }}>
      {onBack && <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, padding:0, color:"#111" }}>←</button>}
      <span style={{ fontWeight:700, fontSize:16, flex:1, color:"#111" }}>{title}</span>
      {right}
      {onCart && (
        <button onClick={onCart} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", fontSize:22 }}>
          🛒
          {cartCount>0 && <span style={{ position:"absolute", top:-4, right:-4, background:"#ef4444", color:"#fff", borderRadius:"50%", fontSize:9, width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{cartCount}</span>}
        </button>
      )}
    </div>
  );
}

function BottomNav({ page, setPage, cartCount, wishlistCount }) {
  const tabs = [
    { id:"home",       icon:"🏠", label:"Home" },
    { id:"categories", icon:"☰",  label:"Categories" },
    { id:"orders",     icon:"📦", label:"Orders" },
    { id:"wishlist",   icon:"♡",  label:"Wishlist" },
    { id:"profile",    icon:"👤", label:"Profile" },
  ];
  return (
    <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1.5px solid #e5e7eb", display:"flex", zIndex:200 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={()=>setPage(t.id)} style={{ flex:1, padding:"8px 4px 10px", background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <span style={{ fontSize:20, position:"relative" }}>
            {t.icon}
            {t.id==="wishlist" && wishlistCount>0 && <span style={{ position:"absolute", top:-4, right:-6, background:G, color:"#fff", borderRadius:"50%", fontSize:9, width:14, height:14, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{wishlistCount}</span>}
            {t.id==="orders"   && cartCount>0    && <span style={{ position:"absolute", top:-4, right:-6, background:"#ef4444", color:"#fff", borderRadius:"50%", fontSize:9, width:14, height:14, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{cartCount}</span>}
          </span>
          <span style={{ fontSize:10, color:page===t.id?G:"#9ca3af", fontWeight:page===t.id?700:400 }}>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// Quantity stepper
function QBtn({ onAdd, qty, onInc, onDec }) {
  if (!qty) return (
    <button onClick={e=>{e.stopPropagation();onAdd();}} style={{ border:`1.5px solid ${G}`, color:G, background:"#fff", borderRadius:8, padding:"5px 16px", fontWeight:700, cursor:"pointer", fontSize:13, minWidth:58 }}>Add</button>
  );
  return (
    <div onClick={e=>e.stopPropagation()} style={{ display:"flex", alignItems:"center", gap:4, border:`1.5px solid ${G}`, borderRadius:8, padding:"3px 6px" }}>
      <button onClick={e=>{e.stopPropagation();onDec();}} style={{ background:"none", border:"none", color:G, fontWeight:900, fontSize:18, cursor:"pointer", lineHeight:1, width:22 }}>−</button>
      <span style={{ fontWeight:700, color:"#111", minWidth:18, textAlign:"center", fontSize:14 }}>{qty}</span>
      <button onClick={e=>{e.stopPropagation();onInc();}} style={{ background:"none", border:"none", color:G, fontWeight:900, fontSize:18, cursor:"pointer", lineHeight:1, width:22 }}>+</button>
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE (Amazon-style, opens on product click) ───────────────
function ProductDetailPage({ product, cart, addToCart, removeFromCart, wishlist, toggleWishlist, onClose }) {
  const [selV, setSelV] = useState(0);
  const v = product.variants[selV];
  const cartKey = `${product.id}_${v.w}`;
  const cartItem = cart[cartKey];
  const isWished = wishlist.has(product.id);

  // Related products
  const related = allProducts.filter(p => product.related.includes(p.id));

  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", zIndex:300, overflowY:"auto", paddingBottom:90 }}>
      {/* Header */}
      <div style={{ position:"sticky", top:0, background:"#fff", zIndex:10, borderBottom:"1px solid #e5e7eb", padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, padding:0, color:"#111" }}>←</button>
        <span style={{ fontWeight:700, fontSize:15, flex:1 }}>{product.name}</span>
        <button onClick={()=>toggleWishlist(product.id)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>{isWished?"❤️":"🤍"}</button>
      </div>

      {/* Product image — full width, REAL photo */}
      <div style={{ position:"relative", background:"#f9fafb" }}>
        <PImg src={pImg(product.name)} alt={product.name} style={{ width:"100%", height:280 }} />
        {product.badge && (
          <div style={{ position:"absolute", top:12, left:12, background:G, color:"#fff", fontWeight:700, fontSize:11, borderRadius:6, padding:"4px 10px" }}>{product.badge}</div>
        )}
      </div>

      <div style={{ padding:"16px 16px 0" }}>
        {/* Name + price */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontWeight:800, fontSize:20 }}>{product.name}</div>
            <div style={{ fontSize:13, color:"#6b7280", marginTop:2 }}>{product.category}</div>
          </div>
          <div style={{ fontWeight:900, fontSize:24, color:G }}>₹{v.p}</div>
        </div>

        {/* Description */}
        <div style={{ fontSize:13, color:"#374151", marginTop:10, lineHeight:1.6, background:"#f9fafb", borderRadius:10, padding:"10px 12px" }}>
          {product.desc}
        </div>

        {/* Delivery promise (Amazon style) */}
        <div style={{ background:"#f0fdf4", border:`1px solid ${G}`, borderRadius:10, padding:"10px 14px", marginTop:12, display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:20 }}>🚚</span>
          <div>
            <div style={{ fontWeight:700, fontSize:13, color:GD }}>FREE delivery</div>
            <div style={{ fontSize:12, color:"#374151" }}>Delivered in 25–30 minutes · Orders above ₹299</div>
          </div>
        </div>

        {/* Weight / Quantity selector (Amazon Fresh style) */}
        <div style={{ marginTop:16 }}>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:8 }}>Select Weight</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}>
            {product.variants.map((pv, i) => (
              <button key={i} onClick={()=>setSelV(i)} style={{ padding:"12px 8px", border:selV===i?`2px solid ${G}`:"1px solid #e5e7eb", background:selV===i?"#f0fdf4":"#fff", borderRadius:12, cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontSize:13, fontWeight:700, color:selV===i?G:"#111" }}>{pv.w}</div>
                <div style={{ fontSize:15, fontWeight:800, color:selV===i?G:"#374151", marginTop:4 }}>₹{pv.p}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Product details list */}
        <div style={{ marginTop:16 }}>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:8 }}>Product Details</div>
          {["Farm fresh, sourced daily","No artificial preservatives","Quality checked before dispatch","Safe for all age groups"].map(d=>(
            <div key={d} style={{ display:"flex", gap:8, alignItems:"center", padding:"5px 0", borderBottom:"1px solid #f3f4f6", fontSize:13, color:"#374151" }}>
              <span style={{ color:G, fontWeight:700 }}>✓</span> {d}
            </div>
          ))}
        </div>

        {/* Related products */}
        {related.length>0 && (
          <div style={{ marginTop:16 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:10 }}>Frequently Bought Together</div>
            <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" }}>
              {related.map(rp=>{
                const rv = rp.variants[0];
                const rKey = `${rp.id}_${rv.w}`;
                const rCart = cart[rKey];
                return (
                  <div key={rp.id} style={{ minWidth:130, background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, overflow:"hidden", flexShrink:0 }}>
                    <PImg src={pImg(rp.name)} alt={rp.name} style={{ width:"100%", height:90 }} />
                    <div style={{ padding:"8px 8px 10px" }}>
                      <div style={{ fontWeight:600, fontSize:12 }}>{rp.name}</div>
                      <div style={{ fontSize:11, color:"#6b7280" }}>{rv.w}</div>
                      <div style={{ fontWeight:700, fontSize:13, color:G, marginTop:2, marginBottom:6 }}>₹{rv.p}</div>
                      <QBtn onAdd={()=>addToCart(rp,0)} qty={rCart?.qty} onInc={()=>addToCart(rp,0)} onDec={()=>removeFromCart(rKey)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom sticky: Add to cart */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid #e5e7eb", padding:"12px 16px", display:"flex", gap:10 }}>
        <button onClick={()=>toggleWishlist(product.id)} style={{ background:isWished?"#fee2e2":"#f3f4f6", border:"none", borderRadius:12, padding:"12px 16px", fontSize:20, cursor:"pointer" }}>{isWished?"❤️":"🤍"}</button>
        {cartItem ? (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${G}`, borderRadius:12, gap:12 }}>
            <button onClick={()=>removeFromCart(cartKey)} style={{ background:"none", border:"none", color:G, fontWeight:900, fontSize:22, cursor:"pointer", padding:"0 12px" }}>−</button>
            <span style={{ fontWeight:800, fontSize:16 }}>{cartItem.qty}</span>
            <button onClick={()=>addToCart(product, selV)} style={{ background:"none", border:"none", color:G, fontWeight:900, fontSize:22, cursor:"pointer", padding:"0 12px" }}>+</button>
          </div>
        ) : (
          <button onClick={()=>addToCart(product, selV)} style={{ flex:1, background:G, color:"#fff", border:"none", borderRadius:12, padding:14, fontWeight:700, fontSize:15, cursor:"pointer" }}>
            Add to Cart · ₹{v.p}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── ADDRESS MANAGER (Amazon Fresh style) ────────────────────────────────────
function AddressManager({ onSelect, onClose, current }) {
  const [addresses, setAddresses] = useState([
    { id:1, tag:"Home",  line1:"123, 4th Street, Anna Nagar", city:"Chennai", pin:"600040", phone:"9100000000" },
    { id:2, tag:"Work",  line1:"45, Mount Road, T.Nagar",     city:"Chennai", pin:"600017", phone:"9100000001" },
  ]);
  const [adding, setAdding] = useState(false);
  const [locating, setLocating] = useState(false);
  const [form, setForm] = useState({ tag:"Home", line1:"", city:"", pin:"", phone:"" });
  const [liveAddr, setLiveAddr] = useState(null);

  const detectLive = () => {
    setLocating(true);
    if (!navigator.geolocation) { setLocating(false); return; }
    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const d = await r.json();
          const addr = d.address || {};
          const line1 = [addr.road, addr.neighbourhood, addr.suburb].filter(Boolean).join(", ");
          const city  = addr.city || addr.town || addr.county || "";
          const pin   = addr.postcode || "";
          setLiveAddr({ line1, city, pin });
          setForm(f=>({ ...f, line1, city, pin }));
          setAdding(true);
        } catch { /* ignore */ }
        setLocating(false);
      },
      () => { setLocating(false); alert("Location permission denied. Please enable it in your browser settings."); }
    );
  };

  const save = () => {
    if (!form.line1 || !form.city) return;
    const newAddr = { id: Date.now(), ...form };
    setAddresses(prev=>[...prev, newAddr]);
    onSelect(newAddr);
    onClose();
  };

  if (adding) return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:500, display:"flex", alignItems:"flex-end" }}>
      <div style={{ background:"#fff", width:"100%", borderRadius:"20px 20px 0 0", padding:"20px 20px 32px", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:17 }}>Add New Address</div>
          <button onClick={()=>setAdding(false)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        {liveAddr && <div style={{ background:GL, borderRadius:10, padding:"8px 12px", marginBottom:14, fontSize:12, color:GD, fontWeight:600 }}>📍 Location detected: {liveAddr.line1}, {liveAddr.city}</div>}

        {/* Tag selector */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {["Home","Work","Other"].map(tag=>(
            <button key={tag} onClick={()=>setForm(f=>({...f,tag}))} style={{ padding:"6px 16px", borderRadius:20, border:form.tag===tag?`2px solid ${G}`:"1px solid #e5e7eb", background:form.tag===tag?GL:"#fff", fontWeight:600, color:form.tag===tag?GD:"#374151", cursor:"pointer", fontSize:13 }}>{tag==="Home"?"🏠":tag==="Work"?"🏢":"📍"} {tag}</button>
          ))}
        </div>

        {[["Flat / Area / Street *", "line1"], ["City *", "city"], ["Pincode", "pin"], ["Phone", "phone"]].map(([lbl, key])=>(
          <div key={key} style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:4 }}>{lbl}</label>
            <input value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} style={{ width:"100%", padding:"10px 12px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:14, boxSizing:"border-box", outline:"none" }} />
          </div>
        ))}

        <button onClick={save} style={{ width:"100%", background:G, color:"#fff", border:"none", borderRadius:12, padding:14, fontWeight:700, fontSize:15, cursor:"pointer", marginTop:4 }}>Save Address</button>
      </div>
    </div>
  );

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:500, display:"flex", alignItems:"flex-end" }}>
      <div style={{ background:"#fff", width:"100%", borderRadius:"20px 20px 0 0", padding:"20px 20px 28px", maxHeight:"85vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:17 }}>Deliver to</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>✕</button>
        </div>

        {/* Live location button — Amazon Fresh style */}
        <button onClick={detectLive} disabled={locating} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px", border:`2px dashed ${G}`, borderRadius:12, background:"#f0fdf4", cursor:"pointer", marginBottom:14 }}>
          <div style={{ width:38, height:38, background:G, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>📍</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:700, fontSize:14, color:GD }}>{locating?"Detecting your location…":"Use my current location"}</div>
            <div style={{ fontSize:12, color:"#6b7280", marginTop:1 }}>Allow location access to auto-fill your address</div>
          </div>
          {locating && <span style={{ marginLeft:"auto", fontSize:18, animation:"spin 1s linear infinite" }}>⏳</span>}
        </button>

        {/* Saved addresses */}
        <div style={{ fontWeight:700, fontSize:14, color:"#374151", marginBottom:8 }}>Saved Addresses</div>
        {addresses.map(a=>(
          <div key={a.id} onClick={()=>{onSelect(a);onClose();}} style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 14px", border:current?.id===a.id?`2px solid ${G}`:"1px solid #e5e7eb", borderRadius:12, marginBottom:10, cursor:"pointer", background:current?.id===a.id?"#f0fdf4":"#fff" }}>
            <div style={{ width:36, height:36, background:current?.id===a.id?G:"#f3f4f6", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{a.tag==="Home"?"🏠":a.tag==="Work"?"🏢":"📍"}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#111" }}>{a.tag}</div>
              <div style={{ fontSize:12, color:"#6b7280", marginTop:1 }}>{a.line1}, {a.city} {a.pin}</div>
            </div>
            {current?.id===a.id && <span style={{ color:G, fontWeight:700, fontSize:18 }}>✓</span>}
          </div>
        ))}

        <button onClick={()=>setAdding(true)} style={{ width:"100%", border:`1.5px solid ${G}`, color:G, background:"#fff", borderRadius:12, padding:"12px", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <span style={{ fontSize:18 }}>+</span> Add New Address
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── INSTAGRAM-STYLE PROFILE PHOTO EDITOR ────────────────────────────────────
function ProfilePhotoEditor({ current, onSave, onClose }) {
  const fileRef = useRef();
  const camRef  = useRef();
  const canvasRef= useRef();
  const [preview, setPreview] = useState(current);
  const [streaming, setStreaming] = useState(false);
  const [mode, setMode] = useState(null); // "gallery" | "camera"

  const openGallery = () => fileRef.current.click();

  const openCamera = async () => {
    setMode("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode:"user" }, audio:false });
      camRef.current.srcObject = stream;
      camRef.current.play();
      setStreaming(true);
    } catch { alert("Camera not available"); setMode(null); }
  };

  const snap = () => {
    const v = camRef.current;
    const c = canvasRef.current;
    c.width  = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d").drawImage(v,0,0);
    setPreview(c.toDataURL("image/jpeg", 0.85));
    v.srcObject.getTracks().forEach(t=>t.stop());
    setStreaming(false);
    setMode("preview");
  };

  const onFileChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => { setPreview(ev.target.result); setMode("preview"); };
    r.readAsDataURL(f);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:600, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      {/* Camera stream */}
      {mode==="camera" && (
        <div style={{ width:"100%", maxWidth:480, position:"relative" }}>
          <video ref={camRef} style={{ width:"100%", borderRadius:12 }} autoPlay playsInline />
          <canvas ref={canvasRef} style={{ display:"none" }} />
          <button onClick={snap} style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", width:64, height:64, borderRadius:"50%", background:"#fff", border:"4px solid #ddd", cursor:"pointer", fontSize:28 }}>📸</button>
        </div>
      )}

      {/* Preview */}
      {(mode==="preview" || (!mode && preview)) && (
        <div style={{ textAlign:"center" }}>
          <div style={{ position:"relative", width:200, height:200, margin:"0 auto 20px" }}>
            <img src={preview} style={{ width:200, height:200, borderRadius:"50%", objectFit:"cover", border:"4px solid #fff" }} />
          </div>
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            <button onClick={()=>{onSave(preview);onClose();}} style={{ background:G, color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontWeight:700, cursor:"pointer", fontSize:15 }}>Use Photo</button>
            <button onClick={()=>setMode(null)} style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", borderRadius:12, padding:"12px 20px", fontWeight:600, cursor:"pointer" }}>Retake</button>
          </div>
        </div>
      )}

      {/* Instagram-style action sheet when no mode */}
      {!mode && !preview && (
        <div style={{ background:"#fff", borderRadius:16, width:"90%", maxWidth:380, overflow:"hidden" }}>
          <div style={{ padding:"16px 20px", borderBottom:"1px solid #e5e7eb", textAlign:"center", fontWeight:700, fontSize:16 }}>Profile Photo</div>
          {[
            { label:"Take Photo",        icon:"📷", action:openCamera },
            { label:"Choose from Library",icon:"🖼️", action:openGallery },
          ].map(({label,icon,action})=>(
            <div key={label} onClick={action} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", borderBottom:"1px solid #f3f4f6", cursor:"pointer" }}>
              <span style={{ fontSize:22 }}>{icon}</span>
              <span style={{ fontWeight:600, fontSize:15 }}>{label}</span>
            </div>
          ))}
          <div onClick={onClose} style={{ padding:"16px 20px", textAlign:"center", cursor:"pointer", color:"#ef4444", fontWeight:700, fontSize:15 }}>Cancel</div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display:"none" }} />
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ cart, setPage, setSelectedShop, addToCart, removeFromCart, wishlist, toggleWishlist, deliveryAddr, setShowAddrMgr, profilePhoto, openProduct }) {
  const [search, setSearch] = useState("");
  const [showVariant, setShowVariant] = useState(false);
  const [selProduct, setSelProduct]   = useState(null);
  const [toastMsg, setToastMsg]       = useState(null);

  const cartCount = Object.values(cart).reduce((a,b)=>a+b.qty,0);

  const showToast = msg => {
    setToastMsg(msg);
    setTimeout(()=>setToastMsg(null), 2500);
  };

  // Smart Add: directly adds default variant, no modal unless explicitly selecting weight
  const handleAdd = p => {
    openProduct(p);   // click goes to product detail page
  };

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Recommendations from cart
  const getRecommended = () => {
    const keys = Object.keys(cart);
    if (!keys.length) return allProducts.filter(p=>p.badge).slice(0,8);
    const cartIds = new Set(keys.map(k=>parseInt(k.split("_")[0])));
    const relIds  = new Set();
    keys.forEach(k=>{
      const p = allProducts.find(x=>x.id===parseInt(k.split("_")[0]));
      if (p) p.related.forEach(r=>relIds.add(r));
    });
    const recs = allProducts.filter(p=>relIds.has(p.id)&&!cartIds.has(p.id));
    return recs.length ? recs : allProducts.filter(p=>p.badge&&!cartIds.has(p.id)).slice(0,6);
  };
  const recommended = getRecommended();

  return (
    <div style={{ paddingBottom:80 }}>
      {/* Toast */}
      {toastMsg && (
        <div style={{ position:"fixed", top:60, left:16, right:16, zIndex:400, background:G, color:"#fff", padding:"12px 16px", borderRadius:12, fontWeight:600, fontSize:14, boxShadow:"0 4px 16px rgba(0,0,0,0.2)" }}>
          ✓ {toastMsg}
        </div>
      )}

      {/* Sticky header */}
      <div style={{ position:"sticky", top:0, zIndex:80, background:"#fff", borderBottom:"1px solid #f3f4f6" }}>
        {/* Location bar */}
        <div style={{ background:G, padding:"10px 16px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div onClick={()=>setShowAddrMgr(true)} style={{ cursor:"pointer", flex:1 }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>Deliver to</div>
            <div style={{ fontWeight:700, fontSize:14, color:"#fff", display:"flex", alignItems:"center", gap:4 }}>
              <span>📍</span>
              <span style={{ maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {deliveryAddr ? `${deliveryAddr.tag} — ${deliveryAddr.line1}, ${deliveryAddr.city}` : "Select delivery address"}
              </span>
              <span style={{ fontSize:11 }}>▾</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button onClick={()=>setPage("cart")} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", fontSize:22, color:"#fff" }}>
              🛒
              {cartCount>0 && <span style={{ position:"absolute", top:-4, right:-4, background:"#ef4444", color:"#fff", borderRadius:"50%", fontSize:9, width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{cartCount}</span>}
            </button>
            <div onClick={()=>setPage("profile")} style={{ cursor:"pointer" }}>
              {profilePhoto
                ? <img src={profilePhoto} style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(255,255,255,0.7)" }} />
                : <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div>
              }
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding:"8px 16px 10px", background:"#fff" }}>
          <div style={{ background:"#f3f4f6", borderRadius:12, display:"flex", alignItems:"center", padding:"9px 14px", gap:8 }}>
            <span style={{ fontSize:16 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, shops..." style={{ border:"none", background:"none", outline:"none", flex:1, fontSize:14 }} />
            {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#9ca3af" }}>✕</button>}
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {/* Search results */}
        {search && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:14, color:"#374151", margin:"8px 0" }}>Search results for "{search}"</div>
            {filteredProducts.length===0 && <div style={{ color:"#9ca3af", fontSize:14, padding:"20px 0", textAlign:"center" }}>No products found</div>}
            {filteredProducts.map(p=>{
              const k = `${p.id}_${p.variants[0].w}`;
              const ci= cart[k];
              return (
                <div key={p.id} onClick={()=>openProduct(p)} style={{ display:"flex", gap:12, padding:"10px 12px", background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", marginBottom:8, cursor:"pointer", alignItems:"center" }}>
                  <PImg src={pImg(p.name)} alt={p.name} style={{ width:54, height:54, borderRadius:10 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{p.name}</div>
                    <div style={{ fontSize:11, color:"#6b7280" }}>{p.category}</div>
                    <div style={{ fontWeight:700, color:G, fontSize:13 }}>from ₹{p.variants[0].p}</div>
                  </div>
                  <QBtn onAdd={()=>{ addToCart(p,0); showToast(`${p.name} added!`); }} qty={ci?.qty} onInc={()=>addToCart(p,0)} onDec={()=>removeFromCart(k)} />
                </div>
              );
            })}
          </div>
        )}

        {!search && <>
          {/* Banner */}
          <div style={{ position:"relative", borderRadius:16, overflow:"hidden", marginTop:14, marginBottom:16, height:140 }}>
            <PImg src="https://images.unsplash.com/photo-1543168256-418811576931?w=700&h=300&fit=crop" alt="Fresh groceries" style={{ width:"100%", height:140 }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(0,0,0,0.62) 0%,transparent 65%)", display:"flex", alignItems:"center", padding:"0 20px" }}>
              <div>
                <div style={{ fontWeight:800, fontSize:18, color:"#fff", lineHeight:1.2 }}>Fresh Groceries<br/>Delivered Fast 🚀</div>
                <div style={{ background:G, color:"#fff", display:"inline-block", borderRadius:8, padding:"5px 14px", fontSize:12, fontWeight:700, marginTop:8 }}>Upto 50% Off</div>
              </div>
            </div>
          </div>

          {/* Promo */}
          <div style={{ background:"linear-gradient(135deg,#ede9fe,#ddd6fe)", borderRadius:14, padding:"12px 16px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontWeight:700, color:"#4c1d95", fontSize:13 }}>🎉 Flat 20% Off on your first order</div>
              <div style={{ background:"#fff", color:"#7c3aed", borderRadius:6, padding:"3px 10px", display:"inline-block", fontWeight:700, fontSize:12, marginTop:6, border:"1px dashed #7c3aed" }}>HELLO20</div>
            </div>
            <span style={{ fontSize:36 }}>🛵</span>
          </div>

          {/* Categories */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontWeight:700, fontSize:16 }}>Shop by Category</span>
            <button onClick={()=>setPage("categories")} style={{ color:G, background:"none", border:"none", fontWeight:600, cursor:"pointer", fontSize:13 }}>See all</button>
          </div>
          <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:8, marginBottom:18, scrollbarWidth:"none" }}>
            {categories.map(c=>(
              <div key={c} onClick={()=>setPage("categories")} style={{ minWidth:80, textAlign:"center", cursor:"pointer" }}>
                <PImg src={CAT_IMG[c]} alt={c} style={{ width:68, height:68, borderRadius:"50%", margin:"0 auto 6px", border:"2px solid #e5e7eb" }} />
                <div style={{ fontSize:11, color:"#374151", fontWeight:600 }}>{c}</div>
              </div>
            ))}
          </div>

          {/* Top Rated Shops */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontWeight:700, fontSize:16 }}>Top Rated Shops</span>
            <button onClick={()=>setPage("categories")} style={{ color:G, background:"none", border:"none", fontWeight:600, cursor:"pointer", fontSize:13 }}>See all</button>
          </div>
          <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:8, marginBottom:18, scrollbarWidth:"none" }}>
            {shops.map(s=>(
              <div key={s.id} onClick={()=>{setSelectedShop(s);setPage("shop");}} style={{ minWidth:200, background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", cursor:"pointer", overflow:"hidden", flexShrink:0, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <PImg src={SHOP_IMG[s.name]} alt={s.name} style={{ width:"100%", height:120 }} />
                <div style={{ padding:"10px 12px" }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>{s.name}</div>
                  <div style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>⭐ {s.rating} ({s.reviews}+) · {s.time}</div>
                  <div style={{ fontSize:12, color:G, fontWeight:600, marginTop:3 }}>🚚 {s.delivery}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended */}
          {recommended.length>0 && (
            <>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:10 }}>🎯 {Object.keys(cart).length>0 ? "Recommended For You" : "Popular Products"}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                {recommended.slice(0,6).map(p=>{
                  const v  = p.variants[0];
                  const k  = `${p.id}_${v.w}`;
                  const ci = cart[k];
                  const iw = wishlist.has(p.id);
                  return (
                    <div key={p.id} onClick={()=>openProduct(p)} style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", overflow:"hidden", cursor:"pointer" }}>
                      <div style={{ position:"relative" }}>
                        <PImg src={pImg(p.name)} alt={p.name} style={{ width:"100%", height:120 }} />
                        {p.badge && <div style={{ position:"absolute", top:6, left:6, background:G, color:"#fff", fontSize:9, fontWeight:700, borderRadius:4, padding:"2px 6px" }}>{p.badge}</div>}
                        <button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}} style={{ position:"absolute", top:5, right:5, background:"rgba(255,255,255,0.9)", border:"none", fontSize:16, cursor:"pointer", borderRadius:"50%", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center" }}>{iw?"❤️":"🤍"}</button>
                      </div>
                      <div style={{ padding:"8px 10px 10px" }}>
                        <div style={{ fontWeight:700, fontSize:13 }}>{p.name}</div>
                        <div style={{ fontSize:11, color:"#6b7280" }}>{v.w}</div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6 }}>
                          <div style={{ fontWeight:800, color:G, fontSize:14 }}>₹{v.p}</div>
                          <QBtn onAdd={()=>{ addToCart(p,0); showToast(`${p.name} added!`); }} qty={ci?.qty} onInc={()=>addToCart(p,0)} onDec={()=>removeFromCart(k)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Best Sellers */}
          <div style={{ fontWeight:700, fontSize:16, marginBottom:10 }}>🔥 Best Sellers</div>
          {allProducts.filter(p=>p.shopId===1).map(p=>{
            const v  = p.variants[0];
            const k  = `${p.id}_${v.w}`;
            const ci = cart[k];
            const iw = wishlist.has(p.id);
            return (
              <div key={p.id} onClick={()=>openProduct(p)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid #f3f4f6", cursor:"pointer" }}>
                <PImg src={pImg(p.name)} alt={p.name} style={{ width:64, height:64, borderRadius:12, flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>{p.name}</div>
                  <div style={{ fontSize:11, color:"#6b7280" }}>{v.w}</div>
                  <div style={{ fontWeight:800, color:G, fontSize:14 }}>₹{v.p}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"center", flexShrink:0 }}>
                  <button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}} style={{ background:"none", border:"none", fontSize:17, cursor:"pointer" }}>{iw?"❤️":"🤍"}</button>
                  <QBtn onAdd={()=>{ addToCart(p,0); showToast(`${p.name} added!`); }} qty={ci?.qty} onInc={()=>addToCart(p,0)} onDec={()=>removeFromCart(k)} />
                </div>
              </div>
            );
          })}
        </>}
      </div>

      {/* Cart FAB */}
      {cartCount>0 && (
        <div style={{ position:"fixed", bottom:70, left:16, right:16, zIndex:150 }}>
          <button onClick={()=>setPage("cart")} style={{ background:G, color:"#fff", border:"none", borderRadius:14, padding:"14px 20px", fontWeight:700, fontSize:15, cursor:"pointer", width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 4px 20px rgba(22,163,74,0.4)" }}>
            <span>🛒 {cartCount} item{cartCount>1?"s":""}</span>
            <span>View Cart →</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── CATEGORIES PAGE ──────────────────────────────────────────────────────────
function CategoriesPage({ setPage, setSelectedShop, cart, addToCart, removeFromCart, wishlist, toggleWishlist, openProduct }) {
  const [active, setActive] = useState("All");
  const cartCount = Object.values(cart).reduce((a,b)=>a+b.qty,0);
  return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="Categories" onCart={()=>setPage("cart")} cartCount={cartCount} />
      <div style={{ display:"flex", gap:8, padding:"10px 16px", overflowX:"auto", scrollbarWidth:"none", background:"#fff", borderBottom:"1px solid #f3f4f6" }}>
        {["All",...categories].map(t=>(
          <button key={t} onClick={()=>setActive(t)} style={{ whiteSpace:"nowrap", background:active===t?G:"#f3f4f6", color:active===t?"#fff":"#374151", border:"none", borderRadius:20, padding:"6px 14px", fontWeight:600, fontSize:13, cursor:"pointer" }}>{t}</button>
        ))}
      </div>
      <div style={{ padding:"14px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
          {(active==="All"?categories:categories.filter(c=>c===active)).map(c=>(
            <div key={c} onClick={()=>setActive(c)} style={{ background:GL, borderRadius:14, padding:"14px", textAlign:"center", cursor:"pointer" }}>
              <PImg src={CAT_IMG[c]} alt={c} style={{ width:80, height:80, borderRadius:"50%", margin:"0 auto 8px" }} />
              <div style={{ fontWeight:700, color:"#166534", fontSize:13 }}>{c}</div>
            </div>
          ))}
        </div>
        <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>Shops</div>
        {shops.filter(s=>active==="All"||s.categories.includes(active)).map(s=>(
          <div key={s.id} onClick={()=>{setSelectedShop(s);setPage("shop");}} style={{ display:"flex", gap:12, alignItems:"center", padding:12, background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", marginBottom:10, cursor:"pointer" }}>
            <PImg src={SHOP_IMG[s.name]} alt={s.name} style={{ width:68, height:68, borderRadius:12 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{s.name}</div>
              <div style={{ fontSize:12, color:"#6b7280" }}>{s.categories}</div>
              <div style={{ fontSize:12, marginTop:2 }}>⭐ {s.rating} ({s.reviews}+) · 📍{s.location} · ⏱{s.time}</div>
            </div>
            <span style={{ color:G, fontWeight:700, fontSize:18 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SHOP PAGE ────────────────────────────────────────────────────────────────
function ShopPage({ shop, setPage, cart, addToCart, removeFromCart, wishlist, toggleWishlist, openProduct }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch]       = useState("");
  const products = allProducts.filter(p=>p.shopId===shop.id);
  const cats     = ["All",...new Set(products.map(p=>p.category))];
  const filtered = products.filter(p=>(activeTab==="All"||p.category===activeTab)&&p.name.toLowerCase().includes(search.toLowerCase()));
  const cartCount= Object.values(cart).reduce((a,b)=>a+b.qty,0);

  return (
    <div style={{ paddingBottom:80 }}>
      {/* Shop hero */}
      <div style={{ position:"relative" }}>
        <PImg src={SHOP_IMG[shop.name]} alt={shop.name} style={{ width:"100%", height:180 }} />
        <button onClick={()=>setPage("home")} style={{ position:"absolute", top:12, left:12, background:"rgba(0,0,0,0.4)", border:"none", cursor:"pointer", fontSize:20, color:"#fff", borderRadius:"50%", width:36, height:36 }}>←</button>
        <button onClick={()=>toggleWishlist(shop.id)} style={{ position:"absolute", top:12, right:12, background:"rgba(0,0,0,0.4)", border:"none", cursor:"pointer", fontSize:20, borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {wishlist.has(shop.id)?"❤️":"🤍"}
        </button>
      </div>
      <div style={{ background:"#fff", padding:"14px 16px", borderBottom:"1px solid #e5e7eb" }}>
        <div style={{ fontWeight:800, fontSize:18 }}>{shop.name}</div>
        <div style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>⭐ {shop.rating} ({shop.reviews}+) · {shop.categories}</div>
        <div style={{ fontSize:12, color:G, fontWeight:600, marginTop:3 }}>🚚 {shop.delivery}</div>
        <div style={{ display:"flex", gap:8, marginTop:10 }}>
          {[{l:"Distance",v:shop.location},{l:"Delivery",v:shop.time},{l:"Rating",v:`⭐${shop.rating}`}].map(x=>(
            <div key={x.l} style={{ flex:1, background:"#f0fdf4", borderRadius:10, padding:"7px 6px", textAlign:"center" }}>
              <div style={{ fontSize:10, color:"#6b7280" }}>{x.l}</div>
              <div style={{ fontWeight:700, color:G, fontSize:12 }}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding:"8px 16px", background:"#fff", borderBottom:"1px solid #f3f4f6" }}>
        <div style={{ background:"#f3f4f6", borderRadius:10, display:"flex", alignItems:"center", padding:"8px 12px", gap:8 }}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search in ${shop.name}...`} style={{ border:"none", background:"none", outline:"none", flex:1, fontSize:13 }} />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display:"flex", gap:8, padding:"8px 16px", overflowX:"auto", scrollbarWidth:"none", background:"#fff", borderBottom:"1px solid #f3f4f6" }}>
        {cats.map(c=><button key={c} onClick={()=>setActiveTab(c)} style={{ whiteSpace:"nowrap", background:activeTab===c?G:"#f3f4f6", color:activeTab===c?"#fff":"#374151", border:"none", borderRadius:20, padding:"5px 13px", fontWeight:600, fontSize:12, cursor:"pointer" }}>{c}</button>)}
      </div>

      {/* Products — clickable images */}
      <div style={{ padding:"0 16px" }}>
        {filtered.length===0 && <div style={{ textAlign:"center", padding:40, color:"#9ca3af" }}>No products found</div>}
        {filtered.map(p=>{
          const v  = p.variants[0];
          const k  = `${p.id}_${v.w}`;
          const ci = cart[k];
          return (
            <div key={p.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 0", borderBottom:"1px solid #f3f4f6" }}>
              {/* Clickable product image → opens detail */}
              <div style={{ position:"relative", flexShrink:0 }} onClick={()=>openProduct(p)}>
                <PImg src={pImg(p.name)} alt={p.name} style={{ width:72, height:72, borderRadius:12, cursor:"pointer" }} />
                {p.badge && <div style={{ position:"absolute", top:-4, left:-4, background:G, color:"#fff", fontSize:8, fontWeight:700, borderRadius:4, padding:"2px 5px" }}>{p.badge}</div>}
              </div>
              <div style={{ flex:1, minWidth:0 }} onClick={()=>openProduct(p)}>
                <div style={{ fontWeight:700, fontSize:14, cursor:"pointer" }}>{p.name}</div>
                <div style={{ fontSize:11, color:"#6b7280" }}>{v.w}</div>
                {/* Show all variant prices */}
                <div style={{ fontSize:11, color:"#374151", marginTop:2 }}>
                  {p.variants.map((pv,i)=>(
                    <span key={i} style={{ marginRight:6, color:i===0?G:"#6b7280", fontWeight:i===0?700:400 }}>{pv.w} ₹{pv.p}</span>
                  ))}
                </div>
              </div>
              <QBtn onAdd={()=>openProduct(p)} qty={ci?.qty} onInc={()=>addToCart(p,0)} onDec={()=>removeFromCart(k)} />
            </div>
          );
        })}
      </div>

      {cartCount>0 && (
        <div style={{ position:"fixed", bottom:70, left:16, right:16, zIndex:150 }}>
          <button onClick={()=>setPage("cart")} style={{ background:G, color:"#fff", border:"none", borderRadius:14, padding:"14px 20px", fontWeight:700, fontSize:15, cursor:"pointer", width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 4px 20px rgba(22,163,74,0.4)" }}>
            <span>🛒 {cartCount} item{cartCount>1?"s":""}</span><span>View Cart →</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
function CartPage({ cart, setPage, addToCart, removeFromCart, clearCart, deliveryAddr, setShowAddrMgr }) {
  const items     = Object.values(cart);
  const itemTotal = items.reduce((s,i)=>s+i.price*i.qty, 0);
  const delivFee  = itemTotal>=299 ? 0 : 29;
  const total     = itemTotal + delivFee;

  if (items.length===0) return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="My Cart" onBack={()=>setPage("home")} />
      <div style={{ textAlign:"center", padding:60 }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🛒</div>
        <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>Your cart is empty</div>
        <div style={{ color:"#6b7280", marginBottom:24 }}>Add items from shops to get started</div>
        <button onClick={()=>setPage("home")} style={{ background:G, color:"#fff", border:"none", borderRadius:10, padding:"12px 32px", fontWeight:700, cursor:"pointer" }}>Browse Shops</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="My Cart" onBack={()=>setPage("home")} />

      {/* Delivery address bar — Amazon style */}
      <div onClick={()=>setShowAddrMgr(true)} style={{ display:"flex", gap:10, alignItems:"center", margin:"12px 16px", background:"#f0fdf4", border:`1px solid ${G}`, borderRadius:12, padding:"10px 14px", cursor:"pointer" }}>
        <span style={{ fontSize:20 }}>📍</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:"#6b7280" }}>Deliver to</div>
          <div style={{ fontWeight:700, fontSize:13, color:GD }}>
            {deliveryAddr ? `${deliveryAddr.tag} — ${deliveryAddr.line1}, ${deliveryAddr.city}` : "Select delivery address"}
          </div>
        </div>
        <span style={{ color:G, fontWeight:700, fontSize:13 }}>Change</span>
      </div>

      {/* Free delivery banner */}
      {delivFee===0
        ? <div style={{ background:GL, margin:"0 16px 10px", borderRadius:10, padding:"8px 14px", fontSize:12, fontWeight:700, color:GD }}>🎉 You qualify for FREE delivery!</div>
        : <div style={{ background:"#fef3c7", margin:"0 16px 10px", borderRadius:10, padding:"8px 14px", fontSize:12, color:"#92400e" }}>Add ₹{299-itemTotal} more for FREE delivery</div>
      }

      <div style={{ padding:"0 16px" }}>
        {items.map(item=>(
          <div key={item.cartKey||item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 0", borderBottom:"1px solid #f3f4f6" }}>
            <PImg src={pImg(item.name)} alt={item.name} style={{ width:64, height:64, borderRadius:12, flexShrink:0 }} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{item.name}</div>
              <div style={{ fontSize:12, color:"#6b7280" }}>{item.weight || item.selectedVariant?.w || item.w}</div>
              <div style={{ fontWeight:700, color:G, fontSize:14 }}>₹{item.price * item.qty}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
              <QBtn qty={item.qty} onInc={()=>addToCart(item, 0)} onDec={()=>removeFromCart(item.cartKey||`${item.id}_${item.weight}`)} />
              <button onClick={()=>{ let n=item.qty; while(n-->0) removeFromCart(item.cartKey||`${item.id}_${item.weight}`); }} style={{ color:"#ef4444", background:"none", border:"none", fontSize:11, cursor:"pointer", fontWeight:600 }}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bill */}
      <div style={{ margin:"16px 16px 0", background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:16 }}>
        <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>Bill Summary</div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span style={{ color:"#6b7280" }}>Item Total</span><span style={{ fontWeight:600 }}>₹{itemTotal}</span></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span style={{ color:"#6b7280" }}>Delivery Charge</span><span style={{ fontWeight:600, color:delivFee===0?G:"#111" }}>{delivFee===0?"FREE":`₹${delivFee}`}</span></div>
        <div style={{ borderTop:"1px solid #e5e7eb", paddingTop:10, display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontWeight:800, fontSize:16 }}>Total</span>
          <span style={{ fontWeight:800, fontSize:16, color:G }}>₹{total}</span>
        </div>
      </div>
      <div style={{ padding:"12px 16px 0", display:"flex", gap:8, fontSize:12, color:"#6b7280", justifyContent:"center" }}>
        <span>✅ 100% Secure</span><span>·</span><span>🚚 On-time Delivery</span><span>·</span><span>💰 Best Prices</span>
      </div>
      <div style={{ padding:"12px 16px" }}>
        <button onClick={()=>setPage("checkout")} style={{ width:"100%", background:G, color:"#fff", border:"none", borderRadius:12, padding:14, fontWeight:700, fontSize:15, cursor:"pointer" }}>Proceed to Checkout →</button>
      </div>
    </div>
  );
}

// ─── WISHLIST PAGE ────────────────────────────────────────────────────────────
function WishlistPage({ wishlist, setPage, addToCart, removeFromCart, cart, toggleWishlist, setSelectedShop, openProduct }) {
  const wishedProducts = allProducts.filter(p=>wishlist.has(p.id));
  const wishedShops    = shops.filter(s=>wishlist.has(s.id));

  return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="My Wishlist" />
      {wishedProducts.length===0 && wishedShops.length===0 ? (
        <div style={{ textAlign:"center", padding:60 }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🤍</div>
          <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>No saved items yet</div>
          <div style={{ color:"#6b7280", marginBottom:24 }}>Tap the heart on any product to save it here</div>
          <button onClick={()=>setPage("home")} style={{ background:G, color:"#fff", border:"none", borderRadius:10, padding:"12px 32px", fontWeight:700, cursor:"pointer" }}>Browse Products</button>
        </div>
      ) : (
        <div style={{ padding:16 }}>
          {wishedProducts.length>0 && (
            <>
              <div style={{ fontWeight:700, fontSize:15, marginBottom:12, color:"#111" }}>💝 Saved Products ({wishedProducts.length})</div>
              {wishedProducts.map(p=>{
                const v   = p.variants[0];
                const k   = `${p.id}_${v.w}`;
                const ci  = cart[k];
                return (
                  <div key={p.id} onClick={()=>openProduct(p)} style={{ display:"flex", alignItems:"center", gap:12, padding:12, background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", marginBottom:10, cursor:"pointer" }}>
                    <div style={{ position:"relative", flexShrink:0 }}>
                      <PImg src={pImg(p.name)} alt={p.name} style={{ width:68, height:68, borderRadius:12 }} />
                      {p.badge && <div style={{ position:"absolute", top:-4, left:-4, background:G, color:"#fff", fontSize:8, fontWeight:700, borderRadius:4, padding:"2px 5px" }}>{p.badge}</div>}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:"#6b7280" }}>{v.w}</div>
                      <div style={{ fontWeight:800, color:G, fontSize:14 }}>₹{v.p}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end", flexShrink:0 }}>
                      <button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>❤️</button>
                      <QBtn onAdd={()=>addToCart(p,0)} qty={ci?.qty} onInc={()=>addToCart(p,0)} onDec={()=>removeFromCart(k)} />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {wishedShops.length>0 && (
            <>
              <div style={{ fontWeight:700, fontSize:15, marginTop:8, marginBottom:12 }}>🏪 Saved Shops ({wishedShops.length})</div>
              {wishedShops.map(s=>(
                <div key={s.id} onClick={()=>{setSelectedShop(s);setPage("shop");}} style={{ display:"flex", gap:12, alignItems:"center", padding:12, background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", marginBottom:10, cursor:"pointer" }}>
                  <PImg src={SHOP_IMG[s.name]} alt={s.name} style={{ width:60, height:60, borderRadius:12 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{s.name}</div>
                    <div style={{ fontSize:12, color:"#6b7280" }}>{s.categories}</div>
                    <div style={{ fontSize:12, marginTop:2 }}>⭐ {s.rating} · ⏱{s.time}</div>
                  </div>
                  <button onClick={e=>{e.stopPropagation();toggleWishlist(s.id);}} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>❤️</button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
function CheckoutPage({ cart, setPage, clearCart, deliveryAddr, setShowAddrMgr }) {
  const [payMethod, setPayMethod] = useState("upi");
  const items     = Object.values(cart);
  const itemTotal = items.reduce((s,i)=>s+i.price*i.qty, 0);
  const delivFee  = itemTotal>=299 ? 0 : 29;
  const total     = itemTotal + delivFee;

  return (
    <div style={{ paddingBottom:90 }}>
      <TopBar title="Checkout" onBack={()=>setPage("cart")} />
      <div style={{ padding:16 }}>
        {/* Delivery address */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:16, marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>📍 Delivery Address</div>
          {deliveryAddr ? (
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontWeight:700, fontSize:13 }}>{deliveryAddr.tag==="Home"?"🏠":deliveryAddr.tag==="Work"?"🏢":"📍"} {deliveryAddr.tag}</div>
                <div style={{ color:"#6b7280", fontSize:13, marginTop:4 }}>{deliveryAddr.line1}<br />{deliveryAddr.city} — {deliveryAddr.pin}<br />{deliveryAddr.phone}</div>
              </div>
              <button onClick={()=>setShowAddrMgr(true)} style={{ color:G, background:"none", border:"none", fontWeight:700, cursor:"pointer" }}>Change</button>
            </div>
          ) : (
            <button onClick={()=>setShowAddrMgr(true)} style={{ color:G, background:GL, border:"none", borderRadius:10, padding:"10px 16px", fontWeight:700, cursor:"pointer", width:"100%" }}>+ Select Delivery Address</button>
          )}
        </div>

        {/* Order summary */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:16, marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>🛍️ Order Summary</div>
          {items.map(i=>(
            <div key={i.cartKey||i.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, alignItems:"center" }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <PImg src={pImg(i.name)} alt={i.name} style={{ width:32, height:32, borderRadius:6 }} />
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{i.name} {i.weight||i.w}</div>
                  <div style={{ fontSize:11, color:"#6b7280" }}>Qty: {i.qty}</div>
                </div>
              </div>
              <span style={{ fontWeight:600, fontSize:13 }}>₹{i.price*i.qty}</span>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #e5e7eb", paddingTop:10, marginTop:4 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}><span style={{ color:"#6b7280", fontSize:13 }}>Item Total</span><span style={{ fontSize:13 }}>₹{itemTotal}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#6b7280", fontSize:13 }}>Delivery Fee</span><span style={{ fontSize:13, color:delivFee===0?G:"#111" }}>{delivFee===0?"FREE":`₹${delivFee}`}</span></div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:16, marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>💳 Payment Method</div>
          {[{id:"card",label:"Credit / Debit Card",sub:"•••• •••• •••• 4242",icon:"💳"},{id:"upi",label:"UPI",sub:"Pay via any UPI app",icon:"📱"},{id:"cod",label:"Cash on Delivery",sub:"Pay when delivered",icon:"💵"}].map(m=>(
            <div key={m.id} onClick={()=>setPayMethod(m.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f3f4f6", cursor:"pointer" }}>
              <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${payMethod===m.id?G:"#d1d5db"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {payMethod===m.id && <div style={{ width:10, height:10, borderRadius:"50%", background:G }} />}
              </div>
              <span style={{ fontSize:18 }}>{m.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:13 }}>{m.label}</div>
                <div style={{ fontSize:12, color:"#6b7280" }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 14px" }}>
          <span style={{ fontWeight:800, fontSize:17 }}>Total Payable</span>
          <span style={{ fontWeight:900, fontSize:20, color:G }}>₹{total}</span>
        </div>
        <button onClick={()=>{clearCart();setPage("tracking");}} style={{ width:"100%", background:G, color:"#fff", border:"none", borderRadius:12, padding:14, fontWeight:700, fontSize:15, cursor:"pointer" }}>Place Order →</button>
      </div>
    </div>
  );
}

// ─── TRACKING PAGE ────────────────────────────────────────────────────────────
function TrackingPage({ setPage }) {
  const [step, setStep] = useState(2);
  const steps = ["Order Placed","Confirmed","Packed","Shipped","Delivered"];
  return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="Order Tracking" onBack={()=>setPage("orders")} />
      <div style={{ padding:16 }}>
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:16, marginBottom:14 }}>
          <div style={{ fontWeight:700, fontSize:15 }}>Order #VH12345678</div>
          <div style={{ color:"#6b7280", fontSize:12, marginTop:2 }}>Placed on: 20 May 2024, 10:30 AM</div>
        </div>
        <div style={{ background:"#f0fdf4", border:`1px solid ${G}`, borderRadius:14, padding:14, marginBottom:14 }}>
          <div style={{ fontWeight:700, color:G, fontSize:13 }}>🕐 Estimated Delivery</div>
          <div style={{ fontWeight:800, fontSize:18, color:"#166534" }}>Today, 06:00 PM</div>
        </div>
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:16, marginBottom:14 }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ display:"flex", gap:12 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:i<=step?G:"#e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", fontWeight:700, flexShrink:0 }}>{i<=step?"✓":""}</div>
                {i<steps.length-1 && <div style={{ width:2, flex:1, minHeight:28, background:i<step?G:"#e5e7eb", margin:"2px 0" }} />}
              </div>
              <div style={{ paddingBottom:i<steps.length-1?16:0 }}>
                <div style={{ fontWeight:i===step?700:400, color:i<=step?"#111":"#9ca3af", fontSize:14 }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
        {step<4 && <button onClick={()=>setStep(s=>s+1)} style={{ background:GL, color:G, border:`1px solid ${G}`, borderRadius:10, padding:"10px", fontWeight:700, cursor:"pointer", width:"100%", marginBottom:10 }}>Simulate Next Update →</button>}
        {step===4 && <div style={{ background:G, color:"#fff", borderRadius:12, padding:16, textAlign:"center" }}><div style={{ fontSize:32 }}>🎉</div><div style={{ fontWeight:800, fontSize:17, marginTop:6 }}>Order Delivered!</div></div>}
      </div>
    </div>
  );
}

// ─── ORDERS PAGE ─────────────────────────────────────────────────────────────
function OrdersPage({ setPage }) {
  const orders = [
    { id:"VH12345678", shop:"Fresh Mart",        items:"Basmati Rice, Tomato", total:301, status:"Delivered", date:"20 May 2024" },
    { id:"VH12345679", shop:"Sri Lakshmi Store", items:"Raw Rice, Onion",      total:68,  status:"Shipped",   date:"19 May 2024" },
    { id:"VH12345680", shop:"Green Basket",      items:"Fresh Carrot, Banana", total:65,  status:"Confirmed", date:"18 May 2024" },
  ];
  const sc = { Delivered:G, Shipped:"#2563eb", Confirmed:"#d97706" };
  return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="My Orders" />
      <div style={{ padding:16 }}>
        {orders.map(o=>(
          <div key={o.id} style={{ background:"#fff", borderRadius:14, border:"1px solid #e5e7eb", padding:14, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <PImg src={SHOP_IMG[o.shop]} alt={o.shop} style={{ width:46, height:46, borderRadius:10 }} />
                <div>
                  <div style={{ fontWeight:700, fontSize:14 }}>{o.shop}</div>
                  <div style={{ fontSize:12, color:"#6b7280" }}>{o.date}</div>
                </div>
              </div>
              <div style={{ background:sc[o.status]+"22", color:sc[o.status], fontWeight:700, fontSize:11, borderRadius:8, padding:"4px 10px" }}>{o.status}</div>
            </div>
            <div style={{ fontSize:13, color:"#374151", marginBottom:8 }}>{o.items}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontWeight:800, color:G }}>₹{o.total}</span>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setPage("tracking")} style={{ color:G, background:"none", border:`1px solid ${G}`, borderRadius:8, padding:"5px 12px", fontWeight:700, cursor:"pointer", fontSize:12 }}>Track</button>
                <button style={{ color:"#6b7280", background:"none", border:"1px solid #e5e7eb", borderRadius:8, padding:"5px 12px", fontWeight:700, cursor:"pointer", fontSize:12 }}>Reorder</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE PAGE (Instagram edit style) ────────────────────────────────────
function ProfilePage({ setPage, user, onLogout, profilePhoto, setProfilePhoto }) {
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name,  setName]  = useState(user?.name  || "Guest User");
  const [email, setEmail] = useState(user?.email || "user@email.com");
  const [phone, setPhone] = useState("9100000000");
  const [saved, setSaved] = useState(false);

  const saveProfile = () => { setSaved(true); setEditing(false); setTimeout(()=>setSaved(false),2500); };

  const menuItems = [
    { icon:"📦", label:"My Orders",        action:()=>setPage("orders") },
    { icon:"📍", label:"Saved Addresses",  action:()=>{} },
    { icon:"💳", label:"Payment Methods",  action:()=>{} },
    { icon:"🤍", label:"My Wishlist",      action:()=>setPage("wishlist") },
    { icon:"⭐", label:"Ratings & Reviews",action:()=>{} },
    { icon:"🎁", label:"Offers & Coupons", action:()=>{} },
    { icon:"🔔", label:"Notifications",    action:()=>{} },
    { icon:"❓", label:"Help & Support",   action:()=>{} },
    { icon:"⚙️", label:"Settings",         action:()=>{} },
  ];

  return (
    <div style={{ paddingBottom:80 }}>
      <TopBar title="My Profile" />

      {saved && <div style={{ background:GL, color:GD, padding:"10px 16px", fontWeight:700, fontSize:13 }}>✅ Profile saved!</div>}

      {/* Profile hero — Instagram edit style */}
      <div style={{ background:`linear-gradient(135deg, ${G} 0%, ${GD} 100%)`, padding:"28px 16px 24px", textAlign:"center" }}>
        {/* Avatar with edit overlay */}
        <div style={{ position:"relative", width:96, margin:"0 auto 14px" }}>
          {profilePhoto
            ? <img src={profilePhoto} style={{ width:96, height:96, borderRadius:"50%", objectFit:"cover", border:"3px solid rgba(255,255,255,0.8)" }} />
            : <div style={{ width:96, height:96, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, border:"3px solid rgba(255,255,255,0.5)", margin:"0 auto" }}>👤</div>
          }
          {/* Camera overlay button — Instagram style */}
          <button onClick={()=>setShowPhotoEditor(true)} style={{ position:"absolute", bottom:0, right:0, width:30, height:30, borderRadius:"50%", background:"#fff", border:`2px solid ${G}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14, boxShadow:"0 2px 6px rgba(0,0,0,0.15)" }}>📷</button>
        </div>

        {editing ? (
          <div style={{ textAlign:"left", margin:"0 auto", maxWidth:280 }}>
            {[["Name", name, setName,"text"],["Email",email,setEmail,"email"],["Phone",phone,setPhone,"tel"]].map(([l,v,sv,t])=>(
              <div key={l} style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginBottom:3 }}>{l}</div>
                <input value={v} onChange={e=>sv(e.target.value)} type={t} style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"none", fontSize:14, boxSizing:"border-box", outline:"none", background:"rgba(255,255,255,0.9)" }} />
              </div>
            ))}
            <div style={{ display:"flex", gap:8, marginTop:12 }}>
              <button onClick={saveProfile} style={{ flex:1, background:"#fff", color:G, border:"none", borderRadius:8, padding:"9px", fontWeight:700, cursor:"pointer", fontSize:13 }}>Save</button>
              <button onClick={()=>setEditing(false)} style={{ flex:1, background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)", borderRadius:8, padding:"9px", fontWeight:600, cursor:"pointer", fontSize:13 }}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontWeight:800, fontSize:20, color:"#fff" }}>{name}</div>
            <div style={{ color:"rgba(255,255,255,0.8)", fontSize:14, marginTop:2 }}>{email}</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, marginTop:1 }}>📞 {phone}</div>
            <button onClick={()=>setEditing(true)} style={{ background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.5)", borderRadius:10, padding:"7px 22px", marginTop:12, fontWeight:700, cursor:"pointer", fontSize:13 }}>✏️ Edit Profile</button>
          </>
        )}
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1, background:"#e5e7eb", marginBottom:14 }}>
        {[{label:"Orders",val:"12"},{label:"Reviews",val:"8"},{label:"Wishlist",val:"5"}].map(s=>(
          <div key={s.label} style={{ background:"#fff", padding:"14px 0", textAlign:"center" }}>
            <div style={{ fontWeight:800, fontSize:20, color:G }}>{s.val}</div>
            <div style={{ fontSize:12, color:"#6b7280" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ padding:"0 16px" }}>
        {menuItems.map((m,i)=>(
          <div key={i} onClick={m.action} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:"1px solid #f3f4f6", cursor:"pointer" }}>
            <span style={{ fontSize:22, width:28, textAlign:"center" }}>{m.icon}</span>
            <span style={{ flex:1, fontWeight:500, fontSize:15 }}>{m.label}</span>
            <span style={{ color:"#9ca3af", fontSize:18 }}>›</span>
          </div>
        ))}
        <div style={{ marginTop:20, marginBottom:10 }}>
          <button onClick={onLogout} style={{ width:"100%", background:"#fee2e2", color:"#dc2626", border:"none", borderRadius:10, padding:14, fontWeight:700, cursor:"pointer", fontSize:15 }}>🚪 Logout</button>
        </div>
      </div>

      {/* Instagram-style photo editor */}
      {showPhotoEditor && (
        <ProfilePhotoEditor
          current={profilePhoto}
          onSave={setProfilePhoto}
          onClose={()=>setShowPhotoEditor(false)}
        />
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function VendorHubApp({ user, onLogout }) {
  const [page,          setPage]         = useState("home");
  const [cart,          setCart]         = useState({});
  const [wishlist,      setWishlist]     = useState(new Set());
  const [selectedShop,  setSelectedShop] = useState(null);
  const [deliveryAddr,  setDeliveryAddr] = useState(null);
  const [showAddrMgr,   setShowAddrMgr]  = useState(false);
  const [profilePhoto,  setProfilePhoto] = useState(null);
  const [openedProduct, setOpenedProduct]= useState(null); // opens full detail overlay

  // Cart key = productId_weight (supports multiple weights of same product)
  const addToCart = useCallback((product, variantIdx = 0) => {
    const v = product.variants?.[variantIdx] || product.variants?.[0];
    if (!v) return;
    const key = `${product.id}_${v.w || v.weight}`;
    setCart(prev => ({
      ...prev,
      [key]: {
        ...product,
        cartKey: key,
        weight: v.w || v.weight,
        price:  v.p  || v.price,
        qty: (prev[key]?.qty || 0) + 1,
      },
    }));
  }, []);

  const removeFromCart = useCallback(key => {
    setCart(prev => {
      const item = prev[key];
      if (!item || item.qty <= 1) { const n={...prev}; delete n[key]; return n; }
      return { ...prev, [key]: { ...item, qty: item.qty-1 } };
    });
  }, []);

  const clearCart    = ()  => setCart({});
  const toggleWishlist = id => setWishlist(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  const cartCount = Object.values(cart).reduce((a,b)=>a+b.qty,0);
  const openProduct   = p  => setOpenedProduct(p);

  const sharedProps = { cart, setPage, addToCart, removeFromCart, clearCart, wishlist, toggleWishlist, setSelectedShop, deliveryAddr, setShowAddrMgr, profilePhoto, openProduct };

  const renderPage = () => {
    switch(page) {
      case "home":       return <HomePage      {...sharedProps} />;
      case "categories": return <CategoriesPage {...sharedProps} />;
      case "shop":       return selectedShop ? <ShopPage shop={selectedShop} {...sharedProps} /> : <HomePage {...sharedProps} />;
      case "cart":       return <CartPage      {...sharedProps} />;
      case "wishlist":   return <WishlistPage  {...sharedProps} />;
      case "checkout":   return <CheckoutPage  cart={cart} setPage={setPage} clearCart={clearCart} deliveryAddr={deliveryAddr} setShowAddrMgr={setShowAddrMgr} />;
      case "tracking":   return <TrackingPage  setPage={setPage} />;
      case "orders":     return <OrdersPage    setPage={setPage} />;
      case "profile":    return <ProfilePage   setPage={setPage} user={user} onLogout={onLogout} profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
      default:           return <HomePage      {...sharedProps} />;
    }
  };

  return (
    <div style={{ width:"100vw", minHeight:"100vh", background:"#f9fafb", fontFamily:"'Segoe UI', sans-serif", overflowX:"hidden" }}>
      {renderPage()}
      <BottomNav page={page} setPage={setPage} cartCount={cartCount} wishlistCount={wishlist.size} />

      {/* Product detail overlay */}
      {openedProduct && (
        <ProductDetailPage
          product={openedProduct}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onClose={()=>setOpenedProduct(null)}
        />
      )}

      {/* Address manager overlay */}
      {showAddrMgr && (
        <AddressManager
          current={deliveryAddr}
          onSelect={setDeliveryAddr}
          onClose={()=>setShowAddrMgr(false)}
        />
      )}
    </div>
  );
}