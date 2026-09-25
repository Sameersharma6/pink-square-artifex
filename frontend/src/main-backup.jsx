import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    useNavigate,
    useLocation,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import {
    Search,
    Heart,
    ShoppingBag,
    User,
    Menu,
    X,
    ChevronRight,
    Star,
    Trash2,
    Plus,
    Minus,
    LogOut,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Truck,
    ShieldCheck,
    RotateCcw,
    Gift,
    Eye,
    Pencil,
    Package,
    Image as ImageIcon,
    ExternalLink,
    Lock,
    Save,
    LayoutDashboard
} from 'lucide-react';

import './styles.css';

/* =========================================================
   ADMIN LOGIN
========================================================= */

const ADMIN_EMAIL = 'admin@pinksquareartifex.com';
const ADMIN_PASSWORD = 'Admin@12345';

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Rose Gold Pearl Necklace',
        category: 'Necklaces',
        price: 899,
        old: 1499,
        rating: 4.8,
        stock: 20,
        img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80',
        tag: 'Bestseller',
        model3d: ''
    },
    {
        id: 2,
        name: 'Crystal Drop Earrings',
        category: 'Earrings',
        price: 499,
        old: 799,
        rating: 4.7,
        stock: 25,
        img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=700&q=80',
        tag: 'New',
        model3d: ''
    },
    {
        id: 3,
        name: 'Kundan Bridal Choker Set',
        category: 'Bridal',
        price: 1699,
        old: 2499,
        rating: 4.9,
        stock: 10,
        img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80',
        tag: 'Bridal',
        model3d: ''
    },
    {
        id: 4,
        name: 'Golden Hoop Earrings',
        category: 'Earrings',
        price: 399,
        old: 699,
        rating: 4.6,
        stock: 30,
        img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
        tag: 'Trending',
        model3d: ''
    },
    {
        id: 5,
        name: 'Floral CZ Bracelet',
        category: 'Bracelets',
        price: 649,
        old: 999,
        rating: 4.7,
        stock: 18,
        img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80',
        tag: 'Popular',
        model3d: ''
    },
    {
        id: 6,
        name: 'Meenakari Jhumka Pair',
        category: 'Earrings',
        price: 549,
        old: 899,
        rating: 4.8,
        stock: 15,
        img: 'https://images.unsplash.com/photo-1627293509201-cd6a1d5b3a2a?auto=format&fit=crop&w=700&q=80',
        tag: 'New',
        model3d: ''
    },
    {
        id: 7,
        name: 'Layered Pearl Mala',
        category: 'Necklaces',
        price: 1199,
        old: 1799,
        rating: 4.9,
        stock: 12,
        img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80',
        tag: 'Premium',
        model3d: ''
    },
    {
        id: 8,
        name: 'Minimal Rose Bracelet',
        category: 'Bracelets',
        price: 449,
        old: 699,
        rating: 4.5,
        stock: 22,
        img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80',
        tag: 'Everyday',
        model3d: ''
    },
    {
        id: 9,
        name: 'Statement Bridal Earrings',
        category: 'Bridal',
        price: 999,
        old: 1499,
        rating: 4.8,
        stock: 14,
        img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=80',
        tag: 'Bridal',
        model3d: ''
    },
    {
        id: 10,
        name: 'Classic Gold Pendant',
        category: 'Necklaces',
        price: 749,
        old: 1199,
        rating: 4.7,
        stock: 16,
        img: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=700&q=80',
        tag: 'Classic',
        model3d: ''
    },
    {
        id: 11,
        name: 'Pearl Stud Earrings',
        category: 'Earrings',
        price: 299,
        old: 499,
        rating: 4.6,
        stock: 35,
        img: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f2f?auto=format&fit=crop&w=700&q=80',
        tag: 'Everyday',
        model3d: ''
    },
    {
        id: 12,
        name: 'Vintage Cocktail Ring',
        category: 'Rings',
        price: 599,
        old: 999,
        rating: 4.8,
        stock: 12,
        img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=700&q=80',
        tag: 'Statement',
        model3d: ''
    }
];

const CATS = [
    'All',
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Rings',
    'Bridal'
];

const money = n =>
    '₹' + Number(n || 0).toLocaleString('en-IN');

const get = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return defaultValue;
        }

        return JSON.parse(value);
    } catch {
        return defaultValue;
    }
};

/* =========================================================
   APP
========================================================= */

function App() {
    const [products, setProducts] = useState(() =>
        get('psa_products', DEFAULT_PRODUCTS)
    );

    const [cart, setCart] = useState(() =>
        get('psa_cart', [])
    );

    const [wish, setWish] = useState(() =>
        get('psa_wish', [])
    );

    const [user, setUser] = useState(() =>
        get('psa_user', null)
    );

    const [admin, setAdmin] = useState(() =>
        get('psa_admin', null)
    );

    /* Save products */

    useEffect(() => {
        localStorage.setItem(
            'psa_products',
            JSON.stringify(products)
        );
    }, [products]);

    /* Save cart */

    useEffect(() => {
        localStorage.setItem(
            'psa_cart',
            JSON.stringify(cart)
        );
    }, [cart]);

    /* Save wishlist */

    useEffect(() => {
        localStorage.setItem(
            'psa_wish',
            JSON.stringify(wish)
        );
    }, [wish]);

    /* Save customer */

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                'psa_user',
                JSON.stringify(user)
            );
        } else {
            localStorage.removeItem('psa_user');
        }
    }, [user]);

    /* Save admin */

    useEffect(() => {
        if (admin) {
            localStorage.setItem(
                'psa_admin',
                JSON.stringify(admin)
            );
        } else {
            localStorage.removeItem('psa_admin');
        }
    }, [admin]);

    /* =====================================================
       CART
    ===================================================== */

    const add = product => {
        if (Number(product.stock || 0) <= 0) {
            alert('This product is currently out of stock.');
            return;
        }

        setCart(current => {
            const existing = current.find(
                item => item.id === product.id
            );

            if (existing) {
                if (
                    existing.qty >= Number(product.stock || 999999)
                ) {
                    alert('Maximum available stock reached.');
                    return current;
                }

                return current.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            ...product,
                            qty: item.qty + 1
                        }
                        : item
                );
            }

            return [
                ...current,
                {
                    ...product,
                    qty: 1
                }
            ];
        });
    };

    const toggle = product => {
        setWish(current =>
            current.some(item => item.id === product.id)
                ? current.filter(item => item.id !== product.id)
                : [...current, product]
        );
    };

    const remove = id => {
        setCart(current =>
            current.filter(item => item.id !== id)
        );
    };

    const qty = (id, change) => {
        setCart(current =>
            current.map(item => {
                if (item.id !== id) {
                    return item;
                }

                const product = products.find(
                    p => p.id === id
                );

                const maxStock = product
                    ? Number(product.stock || 999999)
                    : 999999;

                const newQty = Math.max(
                    1,
                    Math.min(maxStock, item.qty + change)
                );

                return {
                    ...item,
                    qty: newQty
                };
            })
        );
    };

    /* =====================================================
       ADMIN PRODUCT FUNCTIONS
    ===================================================== */

    const addProduct = product => {
        const newProduct = {
            ...product,
            id: Date.now(),
            price: Number(product.price),
            old: Number(product.old),
            rating: Number(product.rating),
            stock: Number(product.stock)
        };

        setProducts(current => [
            newProduct,
            ...current
        ]);
    };

    const updateProduct = updatedProduct => {
        setProducts(current =>
            current.map(product =>
                product.id === updatedProduct.id
                    ? {
                        ...updatedProduct,
                        price: Number(updatedProduct.price),
                        old: Number(updatedProduct.old),
                        rating: Number(updatedProduct.rating),
                        stock: Number(updatedProduct.stock)
                    }
                    : product
            )
        );

        /* Update product information in cart */

        setCart(current =>
            current.map(item =>
                item.id === updatedProduct.id
                    ? {
                        ...item,
                        ...updatedProduct
                    }
                    : item
            )
        );

        /* Update wishlist */

        setWish(current =>
            current.map(item =>
                item.id === updatedProduct.id
                    ? {
                        ...item,
                        ...updatedProduct
                    }
                    : item
            )
        );
    };

    const deleteProduct = id => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this product?'
        );

        if (!confirmed) {
            return;
        }

        setProducts(current =>
            current.filter(product => product.id !== id)
        );

        setCart(current =>
            current.filter(item => item.id !== id)
        );

        setWish(current =>
            current.filter(item => item.id !== id)
        );
    };

    return (
        <>
            <Header
                cartCount={cart.reduce(
                    (total, item) => total + item.qty,
                    0
                )}
                wishCount={wish.length}
                user={user}
                admin={admin}
            />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            products={products}
                            add={add}
                            toggle={toggle}
                            wish={wish}
                        />
                    }
                />

                <Route
                    path="/collection"
                    element={
                        <Collection
                            products={products}
                            add={add}
                            toggle={toggle}
                            wish={wish}
                        />
                    }
                />

                <Route
                    path="/offers"
                    element={
                        <Offers
                            products={products}
                            add={add}
                            toggle={toggle}
                            wish={wish}
                        />
                    }
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            remove={remove}
                            qty={qty}
                        />
                    }
                />

                <Route
                    path="/wishlist"
                    element={
                        <Wishlist
                            wish={wish}
                            toggle={toggle}
                            add={add}
                        />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login
                            user={user}
                            setUser={setUser}
                        />
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <ProductDetail
                            products={products}
                            add={add}
                            toggle={toggle}
                            wish={wish}
                        />
                    }
                />

                <Route
                    path="/search"
                    element={
                        <SearchPage
                            products={products}
                            add={add}
                            toggle={toggle}
                            wish={wish}
                        />
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminPage
                            admin={admin}
                            setAdmin={setAdmin}
                            products={products}
                            addProduct={addProduct}
                            updateProduct={updateProduct}
                            deleteProduct={deleteProduct}
                        />
                    }
                />

                <Route
                    path="*"
                    element={
                        <Home
                            products={products}
                            add={add}
                            toggle={toggle}
                            wish={wish}
                        />
                    }
                />

            </Routes>

            <Footer />
        </>
    );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
                    cartCount,
                    wishCount,
                    user,
                    admin
                }) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');

    const nav = useNavigate();

    const submit = e => {
        e.preventDefault();

        if (q.trim()) {
            nav(
                '/search?q=' +
                encodeURIComponent(q)
            );
        }
    };

    return (
        <header className="header">

            <div className="top">
                ✨ Free shipping above ₹999
                <span>•</span>
                Easy 7-day returns
            </div>

            <div className="nav">

                <button
                    className="mobile-menu"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X /> : <Menu />}
                </button>

                <Link
                    to="/"
                    className="logo"
                >
                    <span>PS</span>

                    <div>
                        Pink Square
                        <small>
                            ARTIFEX • JEWELS
                        </small>
                    </div>
                </Link>

                <form
                    className="search"
                    onSubmit={submit}
                >
                    <Search size={18} />

                    <input
                        value={q}
                        onChange={e =>
                            setQ(e.target.value)
                        }
                        placeholder="Search jewellery, earrings, necklaces..."
                    />

                    <button>
                        Search
                    </button>
                </form>

                <div className="actions">

                    <Link
                        to="/wishlist"
                        className="icon-link"
                    >
                        <Heart />

                        <b>{wishCount}</b>

                        <span>
              Wishlist
            </span>
                    </Link>

                    <Link
                        to="/login"
                        className="icon-link"
                    >
                        <User />

                        <span>
              {user
                  ? 'Hi, ' +
                  user.name.split(' ')[0]
                  : 'Account'}
            </span>
                    </Link>

                    <Link
                        to="/cart"
                        className="icon-link"
                    >
                        <ShoppingBag />

                        <b>{cartCount}</b>

                        <span>
              Cart
            </span>
                    </Link>

                </div>
            </div>

            <nav
                className={
                    'links ' +
                    (open ? 'show' : '')
                }
            >

                <Link to="/collection">
                    Collection
                </Link>

                <Link to="/collection?cat=Necklaces">
                    Necklaces
                </Link>

                <Link to="/collection?cat=Earrings">
                    Earrings
                </Link>

                <Link to="/collection?cat=Bridal">
                    Bridal
                </Link>

                <Link
                    to="/offers"
                    className="offer"
                >
                    Offers
                </Link>

                <Link to="/about">
                    About Us
                </Link>

                <Link to="/contact">
                    Contact Us
                </Link>

                <Link
                    to="/admin"
                    style={{
                        fontWeight: 700
                    }}
                >
                    <LayoutDashboard
                        size={15}
                        style={{
                            verticalAlign: 'middle',
                            marginRight: 4
                        }}
                    />
                    Admin
                </Link>

            </nav>

        </header>
    );
}

/* =========================================================
   HOME
========================================================= */

function Home({
                  products,
                  add,
                  toggle,
                  wish
              }) {
    return (
        <main>

            <Hero />

            <section className="features">

                <Feature
                    icon={<Truck />}
                    t="Free Shipping"
                    s="Above ₹999"
                />

                <Feature
                    icon={<ShieldCheck />}
                    t="Quality Assured"
                    s="Premium finish"
                />

                <Feature
                    icon={<RotateCcw />}
                    t="Easy Returns"
                    s="7-day returns"
                />

                <Feature
                    icon={<Gift />}
                    t="Gift Ready"
                    s="Beautiful packaging"
                />

            </section>

            <section className="section">

                <SectionHead
                    title="Shop by Category"
                    sub="Find your perfect sparkle"
                />

                <div className="cat-grid">

                    {CATS
                        .slice(1)
                        .map((category, index) => {

                            const image =
                                products[index + 1]?.img ||
                                products[0]?.img;

                            return (
                                <Link
                                    to={
                                        '/collection?cat=' +
                                        category
                                    }
                                    className="cat"
                                    key={category}
                                >

                                    <img
                                        src={image}
                                        alt={category}
                                    />

                                    <span>
                    {category}
                  </span>

                                    <small>
                                        Explore →
                                    </small>

                                </Link>
                            );
                        })}

                </div>

            </section>

            <section className="section soft">

                <SectionHead
                    title="Trending Now"
                    sub="Customer favourites, just for you"
                    link="/collection"
                />

                <div className="product-grid">

                    {products
                        .slice(0, 4)
                        .map(product => (
                            <Card
                                key={product.id}
                                p={product}
                                add={add}
                                toggle={toggle}
                                wished={wish.some(
                                    item =>
                                        item.id === product.id
                                )}
                            />
                        ))}

                </div>

            </section>

            <section className="banner">

                <div>

                    <p className="eyebrow">
                        BRIDAL COLLECTION
                    </p>

                    <h2>
                        Your big day deserves
                        <br />
                        a little more sparkle.
                    </h2>

                    <Link
                        className="btn"
                        to="/collection?cat=Bridal"
                    >
                        Shop Bridal Edit
                    </Link>

                </div>

                <img
                    src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80"
                    alt="Bridal jewellery"
                />

            </section>

            <section className="section">

                <SectionHead
                    title="Best Sellers"
                    sub="Loved, reviewed and reordered"
                />

                <div className="product-grid">

                    {products
                        .slice(4, 8)
                        .map(product => (
                            <Card
                                key={product.id}
                                p={product}
                                add={add}
                                toggle={toggle}
                                wished={wish.some(
                                    item =>
                                        item.id === product.id
                                )}
                            />
                        ))}

                </div>

            </section>

        </main>
    );
}

function Hero() {
    return (
        <section className="hero">

            <div className="hero-text">

                <p className="eyebrow">
                    THE NEW JEWELLERY EDIT
                </p>

                <h1>
                    Little details.
                    <br />
                    <em>Big sparkle.</em>
                </h1>

                <p>
                    Discover elegant artificial jewellery
                    made to make every outfit feel unforgettable.
                </p>

                <div>

                    <Link
                        className="btn"
                        to="/collection"
                    >
                        Shop Collection
                        <ChevronRight size={18} />
                    </Link>

                    <Link
                        className="btn ghost"
                        to="/offers"
                    >
                        View Offers
                    </Link>

                </div>

            </div>

            <div className="hero-art">

                <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
                    alt="Jewellery"
                />

                <div className="floating">
                    Up to
                    <strong>50% OFF</strong>
                    <small>
                        on selected styles
                    </small>
                </div>

            </div>

        </section>
    );
}

function Feature({
                     icon,
                     t,
                     s
                 }) {
    return (
        <div className="feature">

            {icon}

            <div>
                <b>{t}</b>
                <small>{s}</small>
            </div>

        </div>
    );
}

function SectionHead({
                         title,
                         sub,
                         link
                     }) {
    return (
        <div className="section-head">

            <div>
                <h2>{title}</h2>
                <p>{sub}</p>
            </div>

            {link && (
                <Link to={link}>
                    View All
                    <ChevronRight size={16} />
                </Link>
            )}

        </div>
    );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function Card({
                  p,
                  add,
                  toggle,
                  wished
              }) {
    const stock =
        Number(p.stock ?? 0);

    return (
        <article className="card">

            <div className="pic">

                <img
                    src={p.img}
                    alt={p.name}
                    onError={e => {
                        e.currentTarget.src =
                            'https://via.placeholder.com/700x700?text=Pink+Square+Artifex';
                    }}
                />

                <span className="tag">
          {p.tag}
        </span>

                <button
                    className={
                        'heart ' +
                        (wished ? 'on' : '')
                    }
                    onClick={() => toggle(p)}
                >
                    <Heart
                        fill={
                            wished
                                ? 'currentColor'
                                : 'none'
                        }
                    />
                </button>

                <Link
                    to={'/product/' + p.id}
                    className="quick"
                >
                    <Eye size={15} />
                    Quick View
                </Link>

            </div>

            <div className="info">

                <Link
                    to={'/product/' + p.id}
                    className="pname"
                >
                    {p.name}
                </Link>

                <div className="rating">

                    <Star
                        fill="currentColor"
                        size={14}
                    />

                    {p.rating}

                    <span>•</span>

                    {Math.floor(
                        Number(p.rating || 4.5) * 37
                    )}{' '}
                    reviews

                </div>

                <div className="price">

                    {money(p.price)}

                    <del>
                        {money(p.old)}
                    </del>

                    {Number(p.old) > Number(p.price) && (
                        <span>
              {Math.round(
                  (1 -
                      p.price /
                      p.old) *
                  100
              )}
                            % off
            </span>
                    )}

                </div>

                <small
                    style={{
                        display: 'block',
                        marginBottom: 8,
                        color:
                            stock > 0
                                ? '#777'
                                : '#c62828'
                    }}
                >
                    {stock > 0
                        ? `${stock} available`
                        : 'Out of stock'}
                </small>

                <button
                    className="add"
                    disabled={stock <= 0}
                    onClick={() => add(p)}
                >
                    <ShoppingBag size={17} />

                    {stock > 0
                        ? 'Add to Cart'
                        : 'Out of Stock'}
                </button>

            </div>

        </article>
    );
}

/* =========================================================
   COLLECTION
========================================================= */

function Collection({
                        products,
                        add,
                        toggle,
                        wish
                    }) {
    const loc = useLocation();

    const params =
        new URLSearchParams(
            loc.search
        );

    const [cat, setCat] =
        useState(
            params.get('cat') || 'All'
        );

    const [sort, setSort] =
        useState('featured');

    const [view, setView] =
        useState(12);

    useEffect(() => {
        setCat(
            params.get('cat') || 'All'
        );
    }, [loc.search]);

    let list = products.filter(
        product =>
            cat === 'All' ||
            product.category === cat
    );

    if (sort === 'low') {
        list.sort(
            (a, b) =>
                Number(a.price) -
                Number(b.price)
        );
    }

    if (sort === 'high') {
        list.sort(
            (a, b) =>
                Number(b.price) -
                Number(a.price)
        );
    }

    if (sort === 'rating') {
        list.sort(
            (a, b) =>
                Number(b.rating) -
                Number(a.rating)
        );
    }

    return (
        <main className="page">

            <div className="crumb">
                <Link to="/">
                    Home
                </Link>{' '}
                / Collection
            </div>

            <div className="collection-title">

                <div>

                    <p className="eyebrow">
                        CURATED FOR YOU
                    </p>

                    <h1>
                        Our Collection
                    </h1>

                    <p>
                        From everyday elegance
                        to statement bridal pieces.
                    </p>

                </div>

                <span>
          {list.length} products
        </span>

            </div>

            <div className="toolbar">

                <div className="chips">

                    {CATS.map(category => (
                        <button
                            className={
                                cat === category
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setCat(category)
                            }
                            key={category}
                        >
                            {category}
                        </button>
                    ))}

                </div>

                <select
                    value={sort}
                    onChange={e =>
                        setSort(e.target.value)
                    }
                >
                    <option value="featured">
                        Sort: Featured
                    </option>

                    <option value="low">
                        Price: Low to High
                    </option>

                    <option value="high">
                        Price: High to Low
                    </option>

                    <option value="rating">
                        Top Rated
                    </option>

                </select>

            </div>

            <div className="product-grid">

                {list
                    .slice(0, view)
                    .map(product => (
                        <Card
                            key={product.id}
                            p={product}
                            add={add}
                            toggle={toggle}
                            wished={wish.some(
                                item =>
                                    item.id === product.id
                            )}
                        />
                    ))}

            </div>

            {view < list.length && (
                <button
                    className="load"
                    onClick={() =>
                        setView(v => v + 12)
                    }
                >
                    Load More
                </button>
            )}

        </main>
    );
}

/* =========================================================
   OFFERS
========================================================= */

function Offers({
                    products,
                    add,
                    toggle,
                    wish
                }) {
    return (
        <main className="page">

            <div className="offer-head">

                <p className="eyebrow">
                    SPECIAL SAVINGS
                </p>

                <h1>
                    Offers & Deals
                </h1>

                <p>
                    More sparkle, less spend.
                    Grab your favourites before
                    the offer ends.
                </p>

            </div>

            <div className="deal-grid">

                <div>
                    <strong>
                        50% OFF
                    </strong>

                    <span>
            Selected bridal jewellery
          </span>

                    <Link to="/collection?cat=Bridal">
                        Shop Now
                    </Link>
                </div>

                <div>
                    <strong>
                        ₹200 OFF
                    </strong>

                    <span>
            On orders above ₹1499
          </span>

                    <Link to="/collection">
                        Explore
                    </Link>
                </div>

                <div>
                    <strong>
                        10% OFF
                    </strong>

                    <span>
            New customer welcome offer
          </span>

                    <Link to="/login">
                        Sign Up
                    </Link>
                </div>

            </div>

            <SectionHead
                title="Deals of the Day"
                sub="Limited-time prices"
            />

            <div className="product-grid">

                {products
                    .filter(
                        product =>
                            Number(product.price) < 1000
                    )
                    .map(product => (
                        <Card
                            key={product.id}
                            p={product}
                            add={add}
                            toggle={toggle}
                            wished={wish.some(
                                item =>
                                    item.id === product.id
                            )}
                        />
                    ))}

            </div>

        </main>
    );
}

/* =========================================================
   ABOUT
========================================================= */

function About() {
    return (
        <main className="page">

            <div className="about">

                <div>

                    <p className="eyebrow">
                        OUR STORY
                    </p>

                    <h1>
                        Jewellery that feels like{' '}
                        <em>you.</em>
                    </h1>

                    <p>
                        Pink Square Artifex is a
                        jewellery shopping experience
                        built around one simple idea:
                        beautiful jewellery should be
                        easy to discover, fun to style
                        and accessible for every occasion.
                    </p>

                    <p>
                        Our edit brings together classic
                        pearls, contemporary crystals,
                        festive Kundan, delicate everyday
                        pieces and statement bridal styles.
                    </p>

                    <Link
                        to="/collection"
                        className="btn"
                    >
                        Explore Collection
                        <ChevronRight size={18} />
                    </Link>

                </div>

                <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80"
                    alt="Jewellery"
                />

            </div>

            <div className="values">

                <Feature
                    icon={<Star />}
                    t="Thoughtful Designs"
                    s="Curated for Indian occasions"
                />

                <Feature
                    icon={<ShieldCheck />}
                    t="Quality First"
                    s="Premium-looking finishes"
                />

                <Feature
                    icon={<Gift />}
                    t="Made to Gift"
                    s="Packaging that feels special"
                />

            </div>

        </main>
    );
}

/* =========================================================
   CONTACT
========================================================= */

function Contact() {
    const [sent, setSent] =
        useState(false);

    return (
        <main className="page">

            <div className="contact-head">

                <p className="eyebrow">
                    WE'RE HERE FOR YOU
                </p>

                <h1>
                    Contact Us
                </h1>

                <p>
                    Questions about an order,
                    product or styling?
                    Send us a message.
                </p>

            </div>

            <div className="contact-grid">

                <form
                    className="contact-form"
                    onSubmit={e => {
                        e.preventDefault();
                        setSent(true);
                    }}
                >

                    {sent ? (

                        <div className="success">

                            <span>✓</span>

                            <h3>
                                Message received!
                            </h3>

                            <p>
                                Thanks for reaching out.
                                This demo frontend does not
                                store messages on a server.
                            </p>

                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    setSent(false)
                                }
                            >
                                Send Another
                            </button>

                        </div>

                    ) : (

                        <>
                            <label>
                                Name

                                <input
                                    required
                                    placeholder="Your name"
                                />
                            </label>

                            <label>
                                Email

                                <input
                                    required
                                    type="email"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label>
                                Subject

                                <select>
                                    <option>
                                        Order Help
                                    </option>

                                    <option>
                                        Product Question
                                    </option>

                                    <option>
                                        Returns & Exchange
                                    </option>

                                    <option>
                                        Other
                                    </option>
                                </select>
                            </label>

                            <label>
                                Message

                                <textarea
                                    required
                                    rows="6"
                                    placeholder="How can we help?"
                                />
                            </label>

                            <button className="btn">
                                Send Message
                                <ChevronRight size={18} />
                            </button>

                        </>
                    )}

                </form>

                <div className="contact-info">

                    <Info
                        icon={<Mail />}
                        title="Email"
                        text="hello@pinksquareartifex.com"
                    />

                    <Info
                        icon={<Phone />}
                        title="Phone"
                        text="+91 98765 43210"
                    />

                    <Info
                        icon={<MapPin />}
                        title="Studio"
                        text="Jaipur, Rajasthan, India"
                    />

                    <div className="social">
                        <Instagram />
                        <span className="facebook-icon">
              f
            </span>
                        Follow @pinksquareartifex
                    </div>

                </div>

            </div>

        </main>
    );
}

function Info({
                  icon,
                  title,
                  text
              }) {
    return (
        <div className="info-row">

            {icon}

            <div>
                <b>{title}</b>
                <p>{text}</p>
            </div>

        </div>
    );
}

/* =========================================================
   CART
========================================================= */

function Cart({
                  cart,
                  remove,
                  qty
              }) {
    const nav = useNavigate();

    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.price) *
                item.qty,
            0
        );

    const shipping =
        subtotal >= 999 ||
        subtotal === 0
            ? 0
            : 79;

    const total =
        subtotal + shipping;

    return (
        <main className="page">

            <div className="crumb">
                <Link to="/">
                    Home
                </Link>{' '}
                / Cart
            </div>

            <h1>
                Your Cart{' '}
                <small>
                    (
                    {cart.reduce(
                        (a, i) => a + i.qty,
                        0
                    )}{' '}
                    items)
                </small>
            </h1>

            {!cart.length ? (

                <Empty
                    icon={<ShoppingBag size={44} />}
                    title="Your cart is empty"
                    text="Looks like you haven't added any sparkle yet."
                    action="Start Shopping"
                    to="/collection"
                />

            ) : (

                <div className="cart-layout">

                    <div>

                        {cart.map(item => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

                                <img
                                    src={item.img}
                                    alt={item.name}
                                />

                                <div className="ci-main">

                                    <Link
                                        to={
                                            '/product/' +
                                            item.id
                                        }
                                    >
                                        {item.name}
                                    </Link>

                                    <small>
                                        {item.category}
                                    </small>

                                    <button
                                        onClick={() =>
                                            remove(item.id)
                                        }
                                    >
                                        <Trash2 size={15} />
                                        Remove
                                    </button>

                                </div>

                                <div className="ci-qty">

                                    <button
                                        onClick={() =>
                                            qty(
                                                item.id,
                                                -1
                                            )
                                        }
                                    >
                                        <Minus size={15} />
                                    </button>

                                    <b>
                                        {item.qty}
                                    </b>

                                    <button
                                        onClick={() =>
                                            qty(
                                                item.id,
                                                1
                                            )
                                        }
                                    >
                                        <Plus size={15} />
                                    </button>

                                </div>

                                <strong>
                                    {money(
                                        item.price *
                                        item.qty
                                    )}
                                </strong>

                            </div>

                        ))}

                    </div>

                    <aside className="summary">

                        <h2>
                            Order Summary
                        </h2>

                        <div>
              <span>
                Subtotal
              </span>

                            <b>
                                {money(subtotal)}
                            </b>
                        </div>

                        <div>
              <span>
                Shipping
              </span>

                            <b>
                                {shipping
                                    ? '₹79'
                                    : 'FREE'}
                            </b>
                        </div>

                        <hr />

                        <div className="total">

              <span>
                Total
              </span>

                            <b>
                                {money(total)}
                            </b>

                        </div>

                        <button
                            className="btn full"
                            onClick={() =>
                                nav(
                                    '/login?checkout=true'
                                )
                            }
                        >
                            Proceed to Checkout
                        </button>

                        <p>
                            🔒 Secure checkout
                            • Demo frontend
                        </p>

                    </aside>

                </div>

            )}

        </main>
    );
}

/* =========================================================
   WISHLIST
========================================================= */

function Wishlist({
                      wish,
                      toggle,
                      add
                  }) {
    return (
        <main className="page">

            <div className="crumb">
                <Link to="/">
                    Home
                </Link>{' '}
                / Wishlist
            </div>

            <h1>
                My Wishlist{' '}
                <small>
                    ({wish.length})
                </small>
            </h1>

            {!wish.length ? (

                <Empty
                    icon={<Heart size={44} />}
                    title="Your wishlist is waiting"
                    text="Save pieces you love and come back to them later."
                    action="Explore Jewellery"
                    to="/collection"
                />

            ) : (

                <div className="product-grid">

                    {wish.map(product => (
                        <Card
                            key={product.id}
                            p={product}
                            add={add}
                            toggle={toggle}
                            wished={true}
                        />
                    ))}

                </div>

            )}

        </main>
    );
}

function Empty({
                   icon,
                   title,
                   text,
                   action,
                   to
               }) {
    return (
        <div className="empty">

            {icon}

            <h2>
                {title}
            </h2>

            <p>
                {text}
            </p>

            <Link
                className="btn"
                to={to}
            >
                {action}
            </Link>

        </div>
    );
}

/* =========================================================
   CUSTOMER LOGIN / REGISTER
========================================================= */

function Login({
                   user,
                   setUser
               }) {
    const [
        register,
        setRegister
    ] = useState(false);

    const [name, setName] =
        useState('');

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const nav =
        useNavigate();

    if (user) {
        return (
            <main className="page">

                <div className="account">

                    <div className="avatar">
                        {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <p className="eyebrow">
                        WELCOME BACK
                    </p>

                    <h1>
                        Hi, {user.name}!
                    </h1>

                    <p>
                        {user.email}
                    </p>

                    <button
                        className="btn"
                        onClick={() => {
                            setUser(null);
                            nav('/');
                        }}
                    >
                        <LogOut size={17} />
                        Logout
                    </button>

                </div>

            </main>
        );
    }

    const submit = e => {
        e.preventDefault();

        setUser({
            name:
                register
                    ? name
                    : email.split('@')[0] ||
                    'Guest',

            email
        });

        nav('/');
    };

    return (
        <main className="page auth-page">

            <div className="auth-card">

                <div className="auth-brand">

          <span>
            PS
          </span>

                    <h2>
                        Pink Square Artifex
                    </h2>

                    <p>
                        Everyday sparkle,
                        beautifully styled.
                    </p>

                </div>

                <h1>
                    {register
                        ? 'Create Account'
                        : 'Welcome Back'}
                </h1>

                <p className="muted">
                    {register
                        ? 'Join us to save your favourites and shop faster.'
                        : 'Sign in to continue your jewellery journey.'}
                </p>

                <form
                    onSubmit={submit}
                >

                    {register && (
                        <label>
                            Full Name

                            <input
                                required
                                value={name}
                                onChange={e =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Your name"
                            />
                        </label>
                    )}

                    <label>
                        Email

                        <input
                            required
                            type="email"
                            value={email}
                            onChange={e =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="you@example.com"
                        />
                    </label>

                    <label>
                        Password

                        <input
                            required
                            minLength="4"
                            type="password"
                            value={password}
                            onChange={e =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="••••••••"
                        />
                    </label>

                    <button className="btn full">
                        {register
                            ? 'Create Account'
                            : 'Login'}

                        <ChevronRight size={18} />
                    </button>

                </form>

                <div className="switch">

                    {register
                        ? 'Already have an account?'
                        : 'New to Pink Square Artifex?'}

                    <button
                        onClick={() =>
                            setRegister(!register)
                        }
                    >
                        {register
                            ? 'Login'
                            : 'Create Account'}
                    </button>

                </div>

                <small className="demo-note">
                    Customer account is stored
                    in browser localStorage.
                </small>

            </div>

        </main>
    );
}

/* =========================================================
   PRODUCT DETAIL
========================================================= */

function ProductDetail({
                           products,
                           add,
                           toggle,
                           wish
                       }) {
    const { id } =
        useParams();

    const product =
        products.find(
            item =>
                item.id === Number(id)
        );

    const [qty, setQty] =
        useState(1);

    if (!product) {
        return <NotFound />;
    }

    const wished =
        wish.some(
            item =>
                item.id === product.id
        );

    const stock =
        Number(product.stock || 0);

    return (
        <main className="page">

            <div className="crumb">

                <Link to="/">
                    Home
                </Link>{' '}

                /

                <Link to="/collection">
                    Collection
                </Link>{' '}

                / {product.name}

            </div>

            <div className="detail">

                <div className="detail-img">

                    <img
                        src={product.img}
                        alt={product.name}
                        onError={e => {
                            e.currentTarget.src =
                                'https://via.placeholder.com/700x700?text=Pink+Square+Artifex';
                        }}
                    />

                    <span>
            {product.tag}
          </span>

                </div>

                <div className="detail-info">

                    <p className="eyebrow">
                        {product.category}
                    </p>

                    <h1>
                        {product.name}
                    </h1>

                    <div className="rating big">

                        <Star fill="currentColor" />

                        {product.rating}

                        <span>•</span>

                        127 verified reviews

                    </div>

                    <div className="detail-price">

                        {money(product.price)}

                        <del>
                            {money(product.old)}
                        </del>

                        {Number(product.old) >
                            Number(product.price) && (
                                <b>
                                    {Math.round(
                                        (1 -
                                            product.price /
                                            product.old) *
                                        100
                                    )}
                                    % OFF
                                </b>
                            )}

                    </div>

                    <p className="tax">
                        Inclusive of all taxes
                    </p>

                    <hr />

                    <p>
                        Designed for easy styling
                        and gifting. Pair it with
                        your favourite outfit for
                        a polished, sparkling finish.
                    </p>

                    <ul>

                        <li>
                            Premium artificial jewellery finish
                        </li>

                        <li>
                            Lightweight and comfortable
                        </li>

                        <li>
                            Gift-ready packaging
                        </li>

                        <li>
                            7-day easy returns
                        </li>

                    </ul>

                    <div className="buy">

                        <div className="qty">

                            <button
                                onClick={() =>
                                    setQty(
                                        Math.max(
                                            1,
                                            qty - 1
                                        )
                                    )
                                }
                            >
                                <Minus />
                            </button>

                            <b>
                                {qty}
                            </b>

                            <button
                                onClick={() =>
                                    setQty(
                                        Math.min(
                                            stock || 1,
                                            qty + 1
                                        )
                                    )
                                }
                            >
                                <Plus />
                            </button>

                        </div>

                        <button
                            className="btn"
                            disabled={stock <= 0}
                            onClick={() => {
                                for (
                                    let i = 0;
                                    i < qty;
                                    i++
                                ) {
                                    add(product);
                                }
                            }}
                        >
                            <ShoppingBag />

                            {stock > 0
                                ? 'Add to Cart'
                                : 'Out of Stock'}
                        </button>

                        <button
                            className={
                                'wish-btn ' +
                                (wished ? 'on' : '')
                            }
                            onClick={() =>
                                toggle(product)
                            }
                        >
                            <Heart
                                fill={
                                    wished
                                        ? 'currentColor'
                                        : 'none'
                                }
                            />
                        </button>

                    </div>

                    <div className="delivery">

                        <Truck />

                        <div>

                            <b>
                                Free delivery above ₹999
                            </b>

                            <small>
                                Estimated delivery in
                                3–6 business days
                            </small>

                        </div>

                    </div>

                    {product.model3d && (
                        <div
                            style={{
                                marginTop: 20,
                                padding: 16,
                                borderRadius: 12,
                                background: '#fff5f8'
                            }}
                        >

                            <b>
                                3D Product View
                            </b>

                            <p>
                                View the 3D model of
                                this product.
                            </p>

                            <a
                                href={product.model3d}
                                target="_blank"
                                rel="noreferrer"
                                className="btn"
                                style={{
                                    display: 'inline-flex'
                                }}
                            >
                                <Eye size={17} />
                                Open 3D Model
                                <ExternalLink size={15} />
                            </a>

                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}

/* =========================================================
   SEARCH
========================================================= */

function SearchPage({
                        products,
                        add,
                        toggle,
                        wish
                    }) {
    const loc =
        useLocation();

    const q =
        new URLSearchParams(
            loc.search
        ).get('q') || '';

    const list =
        products.filter(product =>
            (
                product.name +
                ' ' +
                product.category +
                ' ' +
                product.tag
            )
                .toLowerCase()
                .includes(
                    q.toLowerCase()
                )
        );

    return (
        <main className="page">

            <div className="crumb">

                <Link to="/">
                    Home
                </Link>{' '}

                / Search

            </div>

            <h1>
                Search results
            </h1>

            <p className="search-result">

                {q ? (
                    <>
                        Showing results for{' '}
                        <b>
                            “{q}”
                        </b>
                    </>
                ) : (
                    'Try searching for necklaces, earrings, bridal...'
                )}

            </p>

            {list.length ? (

                <div className="product-grid">

                    {list.map(product => (
                        <Card
                            key={product.id}
                            p={product}
                            add={add}
                            toggle={toggle}
                            wished={wish.some(
                                item =>
                                    item.id === product.id
                            )}
                        />
                    ))}

                </div>

            ) : (

                <Empty
                    icon={<Search size={44} />}
                    title="No matches found"
                    text="Try another keyword like pearl, bridal or earrings."
                    action="View All Jewellery"
                    to="/collection"
                />

            )}

        </main>
    );
}

/* =========================================================
   ADMIN PAGE
========================================================= */

function AdminPage({
                       admin,
                       setAdmin,
                       products,
                       addProduct,
                       updateProduct,
                       deleteProduct
                   }) {
    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [editing, setEditing] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const emptyProduct = {
        name: '',
        category: 'Necklaces',
        price: 499,
        old: 799,
        rating: 4.5,
        stock: 10,
        img: '',
        tag: 'New',
        model3d: ''
    };

    const [form, setForm] =
        useState(emptyProduct);

    const login = e => {
        e.preventDefault();

        if (
            email.trim().toLowerCase() ===
            ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {
            setAdmin({
                email: ADMIN_EMAIL,
                name: 'Administrator'
            });

            setEmail('');
            setPassword('');
        } else {
            alert(
                'Invalid admin email or password.'
            );
        }
    };

    const logout = () => {
        setAdmin(null);
        setEditing(null);
        setShowForm(false);
    };

    const change = (field, value) => {
        setForm(current => ({
            ...current,
            [field]: value
        }));
    };

    const startAdd = () => {
        setEditing(null);
        setForm({
            ...emptyProduct
        });
        setShowForm(true);
    };

    const startEdit = product => {
        setEditing(product.id);
        setForm({
            ...product
        });
        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const submitProduct = e => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert(
                'Please enter product name.'
            );
            return;
        }

        if (!form.img.trim()) {
            alert(
                'Please enter an image URL.'
            );
            return;
        }

        const product = {
            ...form,
            price: Number(form.price),
            old: Number(form.old),
            rating: Number(form.rating),
            stock: Number(form.stock)
        };

        if (editing) {
            updateProduct({
                ...product,
                id: editing
            });

            alert(
                'Product updated successfully.'
            );
        } else {
            addProduct(product);

            alert(
                'Product added successfully.'
            );
        }

        setForm({
            ...emptyProduct
        });

        setEditing(null);
        setShowForm(false);
    };

    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    if (!admin) {
        return (
            <main
                className="page"
                style={{
                    minHeight: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <div
                    style={{
                        width: '100%',
                        maxWidth: 480,
                        padding: 32,
                        background: '#fff',
                        borderRadius: 20,
                        boxShadow:
                            '0 15px 50px rgba(0,0,0,.08)'
                    }}
                >

                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: 25
                        }}
                    >

                        <div
                            style={{
                                width: 70,
                                height: 70,
                                margin: '0 auto 15px',
                                borderRadius: '50%',
                                display: 'grid',
                                placeItems: 'center',
                                background: '#fce4ec',
                                color: '#ad1457'
                            }}
                        >
                            <Lock size={30} />
                        </div>

                        <p className="eyebrow">
                            ADMIN AREA
                        </p>

                        <h1>
                            Pink Square Artifex
                        </h1>

                        <p>
                            Login to manage products,
                            prices, stock and images.
                        </p>

                    </div>

                    <form onSubmit={login}>

                        <label>
                            Admin Email

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="admin@pinksquareartifex.com"
                            />
                        </label>

                        <label>
                            Password

                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Admin password"
                            />
                        </label>

                        <button
                            className="btn full"
                            type="submit"
                        >
                            <Lock size={17} />
                            Admin Login
                        </button>

                    </form>

                    <div
                        style={{
                            marginTop: 20,
                            padding: 15,
                            borderRadius: 10,
                            background: '#fff7f9',
                            fontSize: 13
                        }}
                    >
                        <b>Demo Admin Account</b>

                        <br />

                        Email:
                        {' '}
                        {ADMIN_EMAIL}

                        <br />

                        Password:
                        {' '}
                        {ADMIN_PASSWORD}

                    </div>

                </div>

            </main>
        );
    }

    /* =====================================================
       ADMIN DASHBOARD
    ===================================================== */

    return (
        <main
            className="page"
            style={{
                maxWidth: 1300
            }}
        >

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                    flexWrap: 'wrap',
                    marginBottom: 25
                }}
            >

                <div>

                    <p className="eyebrow">
                        ADMIN DASHBOARD
                    </p>

                    <h1>
                        Product Management
                    </h1>

                    <p>
                        Add, edit, delete and manage
                        your jewellery products.
                    </p>

                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap'
                    }}
                >

                    <button
                        className="btn"
                        onClick={startAdd}
                    >
                        <Plus size={18} />
                        Add Product
                    </button>

                    <button
                        className="btn ghost"
                        onClick={logout}
                    >
                        <LogOut size={17} />
                        Admin Logout
                    </button>

                </div>

            </div>

            {/* =================================================
          STATS
      ================================================= */}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit,minmax(180px,1fr))',
                    gap: 15,
                    marginBottom: 25
                }}
            >

                <AdminStat
                    icon={<Package />}
                    title="Products"
                    value={products.length}
                />

                <AdminStat
                    icon={<ImageIcon />}
                    title="With Images"
                    value={
                        products.filter(
                            p => p.img
                        ).length
                    }
                />

                <AdminStat
                    icon={<Package />}
                    title="Total Stock"
                    value={
                        products.reduce(
                            (total, p) =>
                                total +
                                Number(
                                    p.stock || 0
                                ),
                            0
                        )
                    }
                />

                <AdminStat
                    icon={<Star />}
                    title="Categories"
                    value={
                        new Set(
                            products.map(
                                p => p.category
                            )
                        ).size
                    }
                />

            </div>

            {/* =================================================
          PRODUCT FORM
      ================================================= */}

            {showForm && (
                <div
                    style={{
                        background: '#fff',
                        padding: 25,
                        borderRadius: 18,
                        marginBottom: 30,
                        boxShadow:
                            '0 10px 40px rgba(0,0,0,.07)'
                    }}
                >

                    <div
                        style={{
                            display: 'flex',
                            justifyContent:
                                'space-between',
                            alignItems: 'center',
                            marginBottom: 20
                        }}
                    >

                        <div>

                            <p className="eyebrow">
                                {editing
                                    ? 'EDIT PRODUCT'
                                    : 'NEW PRODUCT'}
                            </p>

                            <h2>
                                {editing
                                    ? 'Edit Product'
                                    : 'Add Product'}
                            </h2>

                        </div>

                        <button
                            className="btn ghost"
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditing(null);
                            }}
                        >
                            <X size={17} />
                            Cancel
                        </button>

                    </div>

                    <form
                        onSubmit={submitProduct}
                    >

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit,minmax(240px,1fr))',
                                gap: 15
                            }}
                        >

                            <label>
                                Product Name

                                <input
                                    required
                                    value={form.name}
                                    onChange={e =>
                                        change(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Rose Gold Necklace"
                                />
                            </label>

                            <label>
                                Category

                                <select
                                    value={form.category}
                                    onChange={e =>
                                        change(
                                            'category',
                                            e.target.value
                                        )
                                    }
                                >

                                    {CATS
                                        .slice(1)
                                        .map(category => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}

                                </select>

                            </label>

                            <label>
                                Selling Price

                                <input
                                    required
                                    type="number"
                                    min="0"
                                    value={form.price}
                                    onChange={e =>
                                        change(
                                            'price',
                                            e.target.value
                                        )
                                    }
                                />
                            </label>

                            <label>
                                Original Price

                                <input
                                    type="number"
                                    min="0"
                                    value={form.old}
                                    onChange={e =>
                                        change(
                                            'old',
                                            e.target.value
                                        )
                                    }
                                />
                            </label>

                            <label>
                                Stock

                                <input
                                    required
                                    type="number"
                                    min="0"
                                    value={form.stock}
                                    onChange={e =>
                                        change(
                                            'stock',
                                            e.target.value
                                        )
                                    }
                                />
                            </label>

                            <label>
                                Rating

                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={form.rating}
                                    onChange={e =>
                                        change(
                                            'rating',
                                            e.target.value
                                        )
                                    }
                                />
                            </label>

                            <label>
                                Tag

                                <input
                                    value={form.tag}
                                    onChange={e =>
                                        change(
                                            'tag',
                                            e.target.value
                                        )
                                    }
                                    placeholder="New / Bestseller / Bridal"
                                />
                            </label>

                            <label>
                                Product Image URL

                                <input
                                    required
                                    value={form.img}
                                    onChange={e =>
                                        change(
                                            'img',
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://example.com/product.jpg"
                                />
                            </label>

                            <label
                                style={{
                                    gridColumn:
                                        '1 / -1'
                                }}
                            >
                                3D Model URL

                                <input
                                    value={form.model3d || ''}
                                    onChange={e =>
                                        change(
                                            'model3d',
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://example.com/product.glb"
                                />

                                <small
                                    style={{
                                        display: 'block',
                                        marginTop: 5
                                    }}
                                >
                                    Optional. Add a URL to your
                                    3D model.
                                </small>

                            </label>

                        </div>

                        {/* IMAGE PREVIEW */}

                        <div
                            style={{
                                marginTop: 20,
                                padding: 20,
                                borderRadius: 14,
                                background: '#fff7f9'
                            }}
                        >

                            <h3>
                                Image Preview
                            </h3>

                            {form.img ? (

                                <img
                                    src={form.img}
                                    alt="Preview"
                                    style={{
                                        width: 220,
                                        height: 220,
                                        objectFit: 'cover',
                                        borderRadius: 14,
                                        display: 'block',
                                        marginTop: 10
                                    }}
                                    onError={e => {
                                        e.currentTarget.style.display =
                                            'none';
                                    }}
                                />

                            ) : (

                                <p>
                                    Enter an image URL above
                                    to preview the product.
                                </p>

                            )}

                        </div>

                        <button
                            className="btn"
                            type="submit"
                            style={{
                                marginTop: 20
                            }}
                        >

                            <Save size={17} />

                            {editing
                                ? 'Save Changes'
                                : 'Add Product'}

                        </button>

                    </form>

                </div>
            )}

            {/* =================================================
          PRODUCTS TABLE / CARDS
      ================================================= */}

            <div
                style={{
                    background: '#fff',
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow:
                        '0 8px 30px rgba(0,0,0,.05)'
                }}
            >

                <div
                    style={{
                        padding: 20,
                        borderBottom:
                            '1px solid #eee'
                    }}
                >

                    <h2>
                        All Products
                    </h2>

                    <p>
                        Changes are saved automatically
                        in this browser.
                    </p>

                </div>

                <div
                    style={{
                        display: 'grid',
                        gap: 0
                    }}
                >

                    {products.map(product => (

                        <AdminProductRow
                            key={product.id}
                            product={product}
                            onEdit={startEdit}
                            onDelete={deleteProduct}
                        />

                    ))}

                </div>

            </div>

            <div
                style={{
                    marginTop: 20,
                    padding: 15,
                    borderRadius: 10,
                    background: '#fff7f9',
                    fontSize: 13
                }}
            >
                <b>Important:</b> Products, prices,
                images and stock are currently stored
                in your browser's localStorage.
                They will remain after refresh on
                the same browser/device, but this is
                not yet a database-backed production
                admin system.
            </div>

        </main>
    );
}

/* =========================================================
   ADMIN STAT
========================================================= */

function AdminStat({
                       icon,
                       title,
                       value
                   }) {
    return (
        <div
            style={{
                background: '#fff',
                borderRadius: 15,
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                boxShadow:
                    '0 6px 25px rgba(0,0,0,.05)'
            }}
        >

            <div
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    background: '#fff0f5',
                    color: '#c2185b'
                }}
            >
                {icon}
            </div>

            <div>

                <small>
                    {title}
                </small>

                <h2
                    style={{
                        margin: 0
                    }}
                >
                    {value}
                </h2>

            </div>

        </div>
    );
}

/* =========================================================
   ADMIN PRODUCT ROW
========================================================= */

function AdminProductRow({
                             product,
                             onEdit,
                             onDelete
                         }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns:
                    '90px 1fr auto',
                gap: 20,
                padding: 18,
                borderBottom:
                    '1px solid #eee',
                alignItems: 'center'
            }}
        >

            <img
                src={product.img}
                alt={product.name}
                style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 12
                }}
                onError={e => {
                    e.currentTarget.src =
                        'https://via.placeholder.com/100?text=Image';
                }}
            />

            <div>

                <h3
                    style={{
                        margin: '0 0 5px'
                    }}
                >
                    {product.name}
                </h3>

                <small>
                    {product.category}
                    {' • '}
                    {product.tag}
                </small>

                <div
                    style={{
                        marginTop: 7
                    }}
                >

                    <b>
                        {money(product.price)}
                    </b>

                    {' '}

                    <del>
                        {money(product.old)}
                    </del>

                    {' • '}

                    <span>
            Stock:
                        {' '}
                        <b>
              {product.stock}
            </b>
          </span>

                </div>

            </div>

            <div
                style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end'
                }}
            >

                <button
                    className="btn"
                    onClick={() =>
                        onEdit(product)
                    }
                >
                    <Pencil size={15} />
                    Edit
                </button>

                <button
                    className="btn"
                    style={{
                        background: '#fff',
                        color: '#c62828',
                        border:
                            '1px solid #ffcdd2'
                    }}
                    onClick={() =>
                        onDelete(product.id)
                    }
                >
                    <Trash2 size={15} />
                    Delete
                </button>

            </div>

        </div>
    );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
    return (
        <footer>

            <div className="footer-main">

                <div className="footer-brand">

                    <Link
                        to="/"
                        className="logo"
                    >
            <span>
              PS
            </span>

                        <div>
                            Pink Square

                            <small>
                                ARTIFEX • JEWELS
                            </small>

                        </div>
                    </Link>

                    <p>
                        Artificial jewellery for every
                        mood, moment and celebration.
                    </p>

                    <div className="social">
                        <Instagram />
                        <span className="facebook-icon">
              f
            </span>
                        <span>
              @pinksquareartifex
            </span>
                    </div>

                </div>

                <div>

                    <h4>
                        Shop
                    </h4>

                    <Link to="/collection">
                        All Jewellery
                    </Link>

                    <Link to="/collection?cat=Necklaces">
                        Necklaces
                    </Link>

                    <Link to="/collection?cat=Earrings">
                        Earrings
                    </Link>

                    <Link to="/collection?cat=Bridal">
                        Bridal
                    </Link>

                    <Link to="/offers">
                        Offers
                    </Link>

                </div>

                <div>

                    <h4>
                        Help
                    </h4>

                    <Link to="/contact">
                        Contact Us
                    </Link>

                    <Link to="/login">
                        My Account
                    </Link>

                    <Link to="/cart">
                        Cart
                    </Link>

                    <Link to="/wishlist">
                        Wishlist
                    </Link>

                </div>

                <div>

                    <h4>
                        Policies
                    </h4>

                    <a href="#">
                        Shipping Policy
                    </a>

                    <a href="#">
                        Returns & Exchange
                    </a>

                    <a href="#">
                        Privacy Policy
                    </a>

                    <a href="#">
                        Terms & Conditions
                    </a>

                </div>

            </div>

            <div className="copyright">
                © 2026 Pink Square Artifex.
                All rights reserved.
            </div>

        </footer>
    );
}

/* =========================================================
   URL PARAMETER HELPER
========================================================= */

function useParams() {
    const loc =
        useLocation();

    return Object.fromEntries(
        loc.pathname
            .split('/')
            .filter(Boolean)
            .map((value, index) => [
                index === 0
                    ? 'section'
                    : 'id',
                value
            ])
    );
}

/* =========================================================
   NOT FOUND
========================================================= */

function NotFound() {
    return (
        <main className="page">

            <Empty
                title="Product not found"
                text="This page doesn't exist."
                action="Back to Collection"
                to="/collection"
            />

        </main>
    );
}

/* =========================================================
   ROUTER
========================================================= */

function AppRoutes() {
    return <App />;
}

/* =========================================================
   START
========================================================= */

createRoot(
    document.getElementById('root')
).render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);