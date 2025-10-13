'use client';

import { uploadProduct } from '@/app/redux/slice/productSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    ratings: '',
  });
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('price', formData.price);
    form.append('description', formData.description);
    form.append('ratings', formData.ratings);
    if (image) form.append('image', image);

    try {
      const result = await dispatch(uploadProduct(form));

      // If successful
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Product added successfully!');
        setFormData({
          title: '',
          price: '',
          description: '',
          ratings: '',
        });
        setImage(null);
        onClose(); // optional: close modal after success
      } else {
        toast.error(error || 'Failed to add product');
      }
    } catch (err) {
      toast.error('Unexpected error occurred');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.2)',
      }}
    >
      <ToastContainer position="top-center" />

      <div
        className="card shadow p-0 border-0"
        style={{
          maxWidth: 500,
          width: '100%',
          borderRadius: '1rem',
          background: '#fff',
          animation: 'fadeIn 0.8s ease',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="position-absolute top-0 end-0 m-3 fs-4 text-secondary"
          aria-label="Close"
          style={{ background: 'none', border: 'none', fontWeight: 600 }}
        >
          &times;
        </button>

        <div
          className="card-header text-white text-center rounded-top"
          style={{ background: '#f33f3f', borderRadius: '1rem 1rem 0 0' }}
        >
          <h4 className="mb-0" style={{ fontWeight: 600, letterSpacing: 1 }}>
            Add New Product
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="ratings">Ratings</label>
              <input
                type="number"
                name="ratings"
                id="ratings"
                placeholder="Ratings"
                value={formData.ratings}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="image">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger w-100 mt-2"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Uploading...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;


           

