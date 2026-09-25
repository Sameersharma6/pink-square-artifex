import {useEffect,useMemo,useState} from 'react'
import {Link,Routes,Route,useNavigate,useLocation} from 'react-router-dom'
import {Search,Heart,ShoppingBag,User,Menu,X,Star,Trash2,Plus,Minus,LogOut,Settings,Box,Edit3,Trash,Save,Image as ImageIcon,ShieldCheck,ChevronRight} from 'lucide-react'
import {getProducts,getProduct,login,register,me,getAdminProducts,createProduct,updateProduct,deleteProduct} from './api'

const fallback=[
{id:1,name:'Rose Gold Necklace Set',price:799,salePrice:599,category:'Necklaces',imageUrl:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',rating:4.8,stock:20},
{id:2,name:'Pearl Drop Earrings',price:499,salePrice:349,category:'Earrings',imageUrl:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',rating:4.7,stock:30},
{id:3,name:'Crystal Bracelet',price:599,salePrice:449,category:'Bracelets',imageUrl:'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85',rating:4.6,stock:15},
{id:4,name:'Classic Ring Set',price:399,salePrice:299,category:'Rings',imageUrl:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',rating:4.9,stock:25}
]

function useStore(){
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('psa_cart')||'[]'))
 const [wish,setWish]=useState(()=>JSON.parse(localStorage.getItem('psa_wish')||'[]'))
 useEffect(()=>localStorage.setItem('psa_cart',JSON.stringify(cart)),[cart])
 useEffect(()=>localStorage.setItem('psa_wish',JSON.stringify(wish)),[wish])
 const add=p=>setCart(c=>{let x=c.find(i=>i.id===p.id);return x?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]})
 const remove=id=>setCart(c=>c.filter(x=>x.id!==id))
 const qty=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x))
 const toggle=p=>setWish(w=>w.some(x=>x.id===p.id)?w.filter(x=>x.id!==p.id):[...w,p])
 return {cart,wish,add,remove,qty,toggle}
}

function Header({user,store}){
 const [q,setQ]=useState(''),[open,setOpen]=useState(false);const nav=useNavigate()
 const submit=e=>{e.preventDefault();if(q.trim())nav('/collection?search='+encodeURIComponent(q))}
 const logout=()=>{localStorage.removeItem('psa_token');localStorage.removeItem('psa_role');localStorage.removeItem('psa_name');window.location.href='/'}
 return <header className="header">
  <button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  <Link className="brand" to="/"><img src="/assets/pink-square-logo.png"/><span><b>PINK SQUARE</b><small>ARTIFEX</small></span></Link>
  <nav className={open?'show':''}><Link to="/">Home</Link><Link to="/collection">Collection</Link><Link to="/offers">Offers</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link>{user?.role==='ADMIN'&&<Link className="adminNav" to="/admin"><Settings size={15}/> Admin</Link>}</nav>
  <form className="search" onSubmit={submit}><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search jewellery..."/><button>Search</button></form>
  <div className="actions"><Link to="/wishlist" title="Wishlist"><Heart/><b>{store.wish.length}</b></Link><Link to="/cart" title="Cart"><ShoppingBag/><b>{store.cart.reduce((n,x)=>n+x.qty,0)}</b></Link>{user?<button className="accountBtn" onClick={logout}><User/><span>{user.name?.split(' ')[0]}</span><LogOut size={14}/></button>:<Link to="/login" title="Account"><User/></Link>}</div>
 </header>
}

function ProductCard({p,store}){
 const sale=p.salePrice&&p.salePrice<p.price?p.salePrice:p.price
 return <article className="card"><Link to={'/product/'+p.id} className="pic"><img src={p.imageUrl||'/assets/pink-square-logo.png'}/>{p.modelUrl&&<span className="threeBadge"><Box size={13}/> 3D</span>}<button className="heart" onClick={e=>{e.preventDefault();store.toggle(p)}}>{store.wish.some(x=>x.id===p.id)?'♥':'♡'}</button></Link><small>{p.category}</small><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/> {p.rating||4.5}</div><div className="price">₹{sale} {sale<p.price&&<del>₹{p.price}</del>}</div><button className="add" onClick={()=>store.add(p)}>Add to Cart</button></article>
}

function Home({store}){
 const [products,setProducts]=useState(fallback)
 useEffect(()=>{getProducts().then(r=>{if(r.data?.length)setProducts(r.data)}).catch(()=>{})},[])
 return <><section className="hero"><div className="heroCopy"><img className="heroLogo" src="/assets/pink-square-logo.png"/><p>HANDCRAFTED JEWELLERY · TIMELESS ELEGANCE</p><h1>More than just<br/><em>Jewellery...</em></h1><p className="heroText">Elegant artificial jewellery for every story, celebration and everyday moment.</p><Link className="cta" to="/collection">Explore Collection <ChevronRight size={17}/></Link></div><div className="heroPoster"><img src="/assets/pink-square-logo.png"/><h2>PINK SQUARE<br/>ARTIFEX</h2><p>Premium quality · Handcrafted with love · Skin friendly · Safe delivery</p></div></section>
 <section className="section"><div className="sectionHead"><div><small>SHOP BY CATEGORY</small><h2>Find your sparkle</h2></div><Link to="/collection">View all →</Link></div><div className="cats">{['Necklaces','Earrings','Bracelets','Rings'].map(x=><Link to={'/collection?category='+x} key={x}>{x}</Link>)}</div></section>
 <section className="section"><div className="sectionHead"><div><small>JUST DROPPED</small><h2>Trending now</h2></div><Link to="/collection">View all →</Link></div><div className="grid">{products.slice(0,8).map(p=><ProductCard key={p.id} p={p} store={store}/>)}</div></section>
 <section className="benefits"><div>💎 <b>Premium Quality</b><small>Beautiful finishes</small></div><div>💗 <b>Handcrafted with Love</b><small>Made for your story</small></div><div>🛡️ <b>Skin Friendly</b><small>Comfortable & durable</small></div><div>🚚 <b>Safe & Secure Delivery</b><small>Across India</small></div></section></>
}

function Collection({store}){
 const [products,setProducts]=useState(fallback),[q,setQ]=useState(''),[cat,setCat]=useState('All');const loc=useLocation()
 useEffect(()=>{getProducts().then(r=>{if(r.data?.length)setProducts(r.data)}).catch(()=>{})},[])
 useEffect(()=>{const params=new URLSearchParams(loc.search);setQ(params.get('search')||'');setCat(params.get('category')||'All')},[loc.search])
 const shown=products.filter(p=>(cat==='All'||p.category===cat)&&((p.name+' '+(p.category||'')).toLowerCase().includes(q.toLowerCase())))
 return <section className="section"><div className="collectionTop"><div><small>OUR COLLECTION</small><h1>Shop all jewellery</h1><p>{shown.length} products</p></div><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..."/></div><div className="chips">{['All','Necklaces','Earrings','Bracelets','Rings'].map(x=><button className={cat===x?'active':''} onClick={()=>setCat(x)} key={x}>{x}</button>)}</div><div className="grid">{shown.map(p=><ProductCard key={p.id} p={p} store={store}/>)}</div>{!shown.length&&<div className="empty"><h2>No jewellery found</h2><p>Try another search or category.</p></div>}</section>
}

function ProductVisual({p}){
 const [three,setThree]=useState(false),[rotation,setRotation]=useState(0),[drag,setDrag]=useState(false),[start,setStart]=useState(0)
 const canModel=!!p.modelUrl
 const down=e=>{if(!canModel){setDrag(true);setStart(e.clientX-rotation)}}
 const move=e=>{if(drag&&!canModel)setRotation(e.clientX-start)}
 const up=()=>setDrag(false)
 return <div className="visualPanel">
  <div className="visualToolbar"><button className={!three?'active':''} onClick={()=>setThree(false)}>Photo</button><button className={three?'active':''} onClick={()=>setThree(true)}><Box size={15}/> 3D View</button></div>
  {three&&canModel?<model-viewer src={p.modelUrl} camera-controls auto-rotate shadow-intensity="1" alt={p.name}></model-viewer>:three?<div className="fake3d" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} style={{transform:`perspective(900px) rotateY(${rotation/5}deg) rotateX(${Math.max(-8,Math.min(8,-rotation/35))}deg)`}}><img src={p.imageUrl||'/assets/pink-square-logo.png'}/><span>Drag to rotate · Add a 3D model URL from Admin for true 3D</span></div>:<div className="mainPhoto"><img src={p.imageUrl||'/assets/pink-square-logo.png'}/>{p.modelUrl&&<span className="modelHint"><Box size={15}/> 3D available</span>}</div>}
 </div>
}

function ProductDetail({store}){
 const {pathname}=useLocation();const id=pathname.split('/').pop();const [p,setP]=useState(null)
 useEffect(()=>{getProduct(id).then(r=>setP(r.data)).catch(()=>{setP(fallback.find(x=>String(x.id)===id))})},[id])
 if(!p)return <div className="empty"><h2>Loading product...</h2></div>
 const sale=p.salePrice&&p.salePrice<p.price?p.salePrice:p.price
 return <section className="section detailPage"><div className="crumb"><Link to="/">Home</Link> / <Link to="/collection">Collection</Link> / {p.name}</div><div className="detailGrid"><ProductVisual p={p}/><div className="detailInfo"><small>{p.category}</small><h1>{p.name}</h1><div className="rating"><Star size={18} fill="currentColor"/> {p.rating||4.5}</div><div className="detailPrice">₹{sale} {sale<p.price&&<del>₹{p.price}</del>}</div><p>{p.description||'Elegant artificial jewellery designed for easy styling, gifting and celebrations.'}</p><ul><li>Premium artificial jewellery finish</li><li>Lightweight and comfortable</li><li>Gift-ready presentation</li><li>Secure delivery across India</li></ul><div className="detailActions"><button className="cta" onClick={()=>store.add(p)}><ShoppingBag size={17}/> Add to Cart</button><button className="wishLarge" onClick={()=>store.toggle(p)}><Heart fill={store.wish.some(x=>x.id===p.id)?'currentColor':'none'}/> Wishlist</button></div><div className="stock"><ShieldCheck size={17}/> {p.stock>0?`${p.stock} in stock`:'Currently out of stock'}</div></div></div></section>
}

function Cart({store}){const total=store.cart.reduce((s,x)=>s+(x.salePrice||x.price)*x.qty,0);return <section className="section"><h1>Your Cart</h1>{!store.cart.length?<Empty text="Your cart is waiting for something beautiful." to="/collection"/>:<><div className="cart">{store.cart.map(x=><div className="cartRow" key={x.id}><img src={x.imageUrl}/><div><h3>{x.name}</h3><p>₹{x.salePrice||x.price}</p><div className="counter"><button onClick={()=>store.qty(x.id,-1)}><Minus/></button>{x.qty}<button onClick={()=>store.qty(x.id,1)}><Plus/></button></div></div><button className="iconBtn" onClick={()=>store.remove(x.id)}><Trash2/></button></div>)}</div><div className="summary"><h2>Total: ₹{total}</h2><button className="cta">Proceed to Checkout</button></div></>}</section>}
function Wishlist({store}){return <section className="section"><h1>Wishlist</h1>{!store.wish.length?<Empty text="Save your favourite pieces here." to="/collection"/>:<div className="grid">{store.wish.map(p=><ProductCard key={p.id} p={p} store={store}/>)}</div>}</section>}
function Empty({text,to}){return <div className="empty"><h2>{text}</h2><Link className="cta" to={to}>Continue Shopping</Link></div>}

function Login(){const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[msg,setMsg]=useState('');const nav=useNavigate();return <section className="auth"><form onSubmit={async e=>{e.preventDefault();setMsg('');try{const r=await login({email,password});localStorage.setItem('psa_token',r.data.token);localStorage.setItem('psa_role',r.data.role);localStorage.setItem('psa_name',r.data.name);nav(r.data.role==='ADMIN'?'/admin':'/')}catch{setMsg('Login failed. Check your email and password.')}}}><img className="authLogo" src="/assets/pink-square-logo.png"/><h1>Welcome back</h1><p>Customer and admin login</p>{msg&&<p className="error">{msg}</p>}<input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/><button className="cta">Login</button><p>New customer? <Link to="/register">Create account</Link></p></form></section>}
function Register(){const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[msg,setMsg]=useState('');const nav=useNavigate();return <section className="auth"><form onSubmit={async e=>{e.preventDefault();try{const r=await register({name,email,password});localStorage.setItem('psa_token',r.data.token);localStorage.setItem('psa_role',r.data.role);localStorage.setItem('psa_name',r.data.name);nav('/')}catch{setMsg('Registration failed. Email may already exist.')}}}><img className="authLogo" src="/assets/pink-square-logo.png"/><h1>Create customer account</h1>{msg&&<p className="error">{msg}</p>}<input required placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/><input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input required minLength="6" type="password" placeholder="Password (6+ characters)" value={password} onChange={e=>setPassword(e.target.value)}/><button className="cta">Register</button><p>Already registered? <Link to="/login">Login</Link></p></form></section>}

const blank={name:'',description:'',price:'',salePrice:'',imageUrl:'',modelUrl:'',category:'Necklaces',stock:0,rating:4.5,featured:false,active:true}
function Admin(){const [products,setProducts]=useState([]),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[msg,setMsg]=useState(''),[loading,setLoading]=useState(true);const nav=useNavigate()
 const load=()=>{setLoading(true);getAdminProducts().then(r=>setProducts(r.data)).catch(()=>{localStorage.removeItem('psa_token');nav('/login')}).finally(()=>setLoading(false))}
 useEffect(()=>{if(localStorage.getItem('psa_role')!=='ADMIN'){nav('/login');return}load()},[])
 const change=(k,v)=>setForm(f=>({...f,[k]:v}))
 const save=async e=>{e.preventDefault();setMsg('');const payload={...form,price:Number(form.price),salePrice:form.salePrice===''?null:Number(form.salePrice),stock:Number(form.stock),rating:Number(form.rating)};try{if(editing)await updateProduct(editing,payload);else await createProduct(payload);setMsg(editing?'Product updated successfully.':'Product added successfully.');setEditing(null);setForm(blank);load()}catch(err){setMsg(err?.response?.data?.message||'Could not save product. Check admin login and backend.')}}
 const edit=p=>{setEditing(p.id);setForm({...p,salePrice:p.salePrice??''});window.scrollTo({top:0,behavior:'smooth'})}
 const remove=async id=>{if(!confirm('Delete this product?'))return;try{await deleteProduct(id);load()}catch{setMsg('Delete failed.')}}
 return <section className="section adminPage"><div className="adminHeader"><div><small>ADMIN PANEL</small><h1>Pink Square Artifex Store Manager</h1><p>Add products, change prices, replace images and attach 3D model URLs.</p></div><button className="ghostBtn" onClick={()=>{localStorage.removeItem('psa_token');localStorage.removeItem('psa_role');window.location.href='/login'}}><LogOut size={16}/> Logout</button></div>{msg&&<div className="notice">{msg}</div>}
 <div className="adminLayout"><form className="adminForm" onSubmit={save}><div className="formTitle"><h2>{editing?'Edit product':'Add new product'}</h2>{editing&&<button type="button" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div><label>Product name<input required value={form.name} onChange={e=>change('name',e.target.value)}/></label><label>Description<textarea rows="3" value={form.description||''} onChange={e=>change('description',e.target.value)}/></label><div className="two"><label>Price (₹)<input required type="number" min="0" value={form.price} onChange={e=>change('price',e.target.value)}/></label><label>Sale price (₹)<input type="number" min="0" value={form.salePrice} onChange={e=>change('salePrice',e.target.value)}/></label></div><div className="two"><label>Category<select value={form.category} onChange={e=>change('category',e.target.value)}><option>Necklaces</option><option>Earrings</option><option>Bracelets</option><option>Rings</option><option>Bridal</option><option>Other</option></select></label><label>Stock<input type="number" min="0" value={form.stock} onChange={e=>change('stock',e.target.value)}/></label></div><label><span className="labelWithIcon"><ImageIcon size={15}/> Direct image URL / path</span><input required placeholder="https://.../image.jpg or /products/item.jpg" value={form.imageUrl} onChange={e=>change('imageUrl',e.target.value)}/></label><small className="help">For Vercel, use a public image URL or put the image in frontend/public/products and enter /products/filename.jpg.</small><label><span className="labelWithIcon"><Box size={15}/> 3D model URL (optional)</span><input placeholder="https://.../jewellery.glb" value={form.modelUrl||''} onChange={e=>change('modelUrl',e.target.value)}/></label><small className="help">If you add a .glb/.gltf URL, customers get a real interactive 3D viewer. Without it, the site shows a 3D-style photo mode.</small><div className="checks"><label><input type="checkbox" checked={!!form.featured} onChange={e=>change('featured',e.target.checked)}/> Featured</label><label><input type="checkbox" checked={form.active!==false} onChange={e=>change('active',e.target.checked)}/> Visible in store</label></div>{form.imageUrl&&<div className="adminPreview"><img src={form.imageUrl} onError={e=>e.currentTarget.style.display='none'} /><span>Image preview</span></div>}<button className="cta fullBtn"><Save size={17}/> {editing?'Update Product':'Add Product'}</button></form>
 <div className="adminProducts"><div className="listHead"><h2>Products</h2><span>{products.length}</span></div>{loading?<p>Loading products...</p>:products.map(p=><div className="adminRow" key={p.id}><img src={p.imageUrl||'/assets/pink-square-logo.png'}/><div className="rowInfo"><b>{p.name}</b><small>{p.category} · ₹{p.salePrice||p.price} · stock {p.stock}</small><span>{p.modelUrl?'3D model added':'Photo only'}</span></div><button title="Edit" onClick={()=>edit(p)}><Edit3 size={17}/></button><button title="Delete" onClick={()=>remove(p.id)}><Trash size={17}/></button></div>)}</div></div></section>
}

function Simple({title,children}){return <section className="section page"><small>PINK SQUARE ARTIFEX</small><h1>{title}</h1>{children}</section>}

function App(){const store=useStore();const [user,setUser]=useState(null)
 useEffect(()=>{if(localStorage.getItem('psa_token')){me().then(r=>setUser(r.data)).catch(()=>{localStorage.removeItem('psa_token');localStorage.removeItem('psa_role')})}},[])
 return <><Header user={user} store={store}/><Routes><Route path="/" element={<Home store={store}/>}/><Route path="/collection" element={<Collection store={store}/>}/><Route path="/product/:id" element={<ProductDetail store={store}/>}/><Route path="/cart" element={<Cart store={store}/>}/><Route path="/wishlist" element={<Wishlist store={store}/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/admin" element={<Admin/>}/><Route path="/offers" element={<Simple title="Offers"><p>Seasonal offers, coupon codes and sale campaigns can be managed from the admin panel.</p></Simple>}/><Route path="/about" element={<Simple title="About Us"><p>Pink Square Artifex is a jewellery experience inspired by the logo and premium pink aesthetic shown in your brand poster.</p></Simple>}/><Route path="/contact" element={<Simple title="Contact Us"><p>Email: pinksquareartifex@gmail.com</p><p>Phone: +91 7014694812</p><p>Jaipur, Rajasthan, India</p></Simple>}/></Routes><footer><b>PINK SQUARE ARTIFEX</b><p>More than just Jewellery... It's a part of your story.</p><small>© 2026 Pink Square Artifex</small></footer></>
}
export default App
