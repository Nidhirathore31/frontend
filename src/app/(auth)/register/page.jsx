'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { registerUser } from '@/app/redux/slice/authSlice';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/ui/Spinner';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const router = useRouter();
  const initialValues = {
    userName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    await dispatch(registerUser(values));
    setSubmitting(false);
    router.push('/login'); // Redirect to login after successful registration
  };

  return (
    <>
      {/* <Header /> */}
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '80vh', background: '#fef8f8' }}
      >
        <div
          className="card shadow p-4 border-0"
          style={{
            maxWidth: 500,
            width: '100%',
            borderRadius: '1rem',
            animation: 'fadeIn 0.8s ease',
          }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: 600, color: '#dc3545' }}>
            Create Your Account 🛍️
          </h2>

          <div className="card-header bg-danger text-white text-center rounded-3">
            <h4>Register</h4>
          </div>

          <div className="card-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <Field
                      type="text"
                      name="userName"
                      className={`form-control ${touched.userName && errors.userName ? 'is-invalid' : ''}`}
                      placeholder="Enter username"
                    />
                    <ErrorMessage component="div" name="userName" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <Field
                      type="email"
                      name="email"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter email"
                    />
                    <ErrorMessage component="div" name="email" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter password"
                    />
                    <ErrorMessage component="div" name="password" className="invalid-feedback" />
                  </div>

                  {error && <p className="text-danger">{error}</p>}

                  <button
                    type="submit"
                    className="btn filled-button w-100 mb-2"
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? <Spinner/> : 'Register'}
                  </button>

                  <div className="text-center my-2 text-muted">or</div>

                  <button type="button" className="btn btn-outline-danger w-100 mb-3">
                    <i className="fa fa-google me-2"></i> Register with Google
                  </button>

                  <div className="text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-danger fw-semibold" style={{ textDecoration: 'underline' }}>
                      Login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}


