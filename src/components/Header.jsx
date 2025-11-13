"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "./CartModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/app/redux/slice/authSlice";
import { initializeCart } from "@/app/redux/slice/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    // Initialize cart when component mounts or when auth state changes
    dispatch(initializeCart());
  }, [dispatch, token]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Redirect to login page after successful logout
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to login page
      router.push('/login');
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container position-relative">
          <Link className="navbar-brand" href="/">
            <h2>
              Fuxso <em>Clothing</em>
            </h2>
          </Link>

          

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarResponsive"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Main nav links */}
            <ul className="navbar-nav me-auto">
              {/* <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="/product">
                  Our Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Conditionally rendered Auth links */}
            <ul className="navbar-nav ms-auto">
              {/* {user ? (
                <li className="nav-item">
                  <button 
                    className="nav-link login-link" 
                    onClick={() => dispatch(logout())}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Logout ({user.userName || user.email})
                  </button>
                </li>
              ) : (
                <> */}
              <button
                className="nav-link login-link"
                onClick={handleLogout}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>

              {/* {pathname !== "/login" && (
                <li className="nav-item">
                  <Link className="nav-link login-link" href="/login">
                    Login
                  </Link>
                </li>
              )}
              {pathname !== "/register" && (
                <li className="nav-item">
                  <Link className="nav-link login-link" href="/register">
                    Sign Up
                  </Link>
                </li>
              )} */}
              {/* </>
              )} */}
            </ul>

            {/* Cart Icon for Desktop */}
            <div
              style={{
                display: "block",
                marginLeft: "15px",
                visibility: "visible",
                opacity: 1,
                zIndex: 1000,
                position: "relative",
                "@media (maxWidth: 991px)": {
                  display: "none",
                },
              }}
              className="cart-container"
            >
              <button
                onClick={() => setCartOpen(true)}
                style={{
                  backgroundColor: "#fff",
                  border: "2px solid #f33f3f",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Cart"
              >
                <FaShoppingCart style={{ color: "#f33f3f", fontSize: 22 }} />
              </button>
              {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
