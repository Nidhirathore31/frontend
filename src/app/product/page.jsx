"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchProducts } from "../redux/slice/productSlice";
import AddProductForm from "@/components/AddProductForm";
import { addToCart, addToCartAPI, initializeCart } from "../redux/slice/cartSlice";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(initializeCart()); // Initialize cart when page loads
  }, [dispatch]);

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product)); // Update local cart
  //   dispatch(addToCartAPI(product)); // Optional: Persist to backend
  //   alert(`Added ${product.title} to cart!`);
  // };
  

const handleAddToCart = (product) => {
  const payload = {
    userId: user?._id, // This is required by the backend
    productId: product._id, // Assuming MongoDB _id is the productId
    name: product.title,
    price: product.price,
    quantity: 1
  };

  dispatch(addToCart(product));        // Update local state
  dispatch(addToCartAPI(payload));     // Send proper payload to backend
  toast.success(`Added ${product.title} to cart!`);
};

  

  return (
    <>
      <Header />

      {/* Page Heading */}
      <div className="page-heading products-heading header-text">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-10">
              <div className="text-content">
                <h4>new arrivals</h4>
                <h2>Sixteen Clothing products</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="products">
        <div className="container">
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}

          <div className="row">
            <div className="col-md-12">
              <div className="filters">
                <ul>
                  <li className="active" data-filter="*">
                    All Products
                  </li>
                  <li data-filter=".des">Featured</li>
                  <li data-filter=".dev">Flash Deals</li>
                  <li data-filter=".gra">Last Minute</li>
                </ul>

                <button onClick={() => setShowForm(true)}>Add Product</button>

                {showForm && (
                  <div className="mt-6">
                    <AddProductForm onClose={() => setShowForm(false)} />
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-md-12">
              <div className="filters-content">
                <div className="row grid">
                  {products.map((product) => (
                    <div
                      className="col-lg-4 col-md-4 all des"
                      key={product._id}
                    >
                      <div className="product-item">
                        <a href="#">
                          <img
                            src={`http://localhost:3001/${product.image}`}
                            alt={product.title}
                            style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </a>
                        <div className="down-content">
                          <a href="#">
                            <h4>{product.title}</h4>
                          </a>
                          <h6>₹{product.price}</h6>
                          <p>{product.description}</p>
                          <ul className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <li key={star}>
                                <i
                                  className={`fa fa-star${
                                    product.ratings >= star ? "" : "-o"
                                  }`}
                                />
                              </li>
                            ))}
                          </ul>
                          <span>Rating: {product.ratings}</span>
                          <button
                            className="filled-button w-100 mt-3"
                            style={{ background: '#f33f3f', color: '#fff', border: 'none', borderRadius: 5, fontWeight: 500, fontSize: 15 }}
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="fa fa-cart-plus me-2"></i> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="col-md-12">
              <ul className="pages">
                <li>
                  <a href="#">1</a>
                </li>
                <li className="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-double-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
