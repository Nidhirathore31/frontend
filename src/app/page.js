"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <div className="container-fluid d-flex justify-content-center align-items-center text-center" style={{ minHeight: '80vh', background: 'linear-gradient(to right, #f8f9fa, #ffe9e9)' }}>
        <div className="card shadow-lg p-5 border-0" style={{ maxWidth: 600, width: '100%', borderRadius: '1rem', animation: 'fadeIn 1s ease-in-out' }}>
          <h1 className="mb-3 fw-bold" style={{ color: '#dc3545', fontSize: '2.5rem' }}>Welcome to Sixteen Clothing</h1>
          <p className="mb-4 text-muted" style={{ fontSize: '1.1rem' }}>
            Step into the world of trendy fashion. Discover styles that define you. <br />
            Please login or sign up to start shopping.
          </p>
          <div className="d-grid gap-3 mb-3">
            <Link href="/login" className="btn filled-button btn-lg">Login</Link>
            <Link href="/register" className="btn btn-outline-danger btn-lg">Sign Up</Link>
          </div>
          <div className="text-muted" style={{ fontSize: '0.95rem' }}>
            Your fashion journey starts here.
          </div>
        
        </div>
      </div>
      {/* <Footer /> */}
      

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
