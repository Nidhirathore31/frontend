"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/app/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(loginUser(values));
    setSubmitting(false);
    router.push("/product");
  };

  return (
    <>
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh", background: "#fef8f8" }}
      >
        <div
          className="card shadow p-4 border-0"
          style={{
            maxWidth: 500,
            width: "100%",
            borderRadius: "1rem",
            animation: "fadeIn 0.8s ease",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{ fontWeight: 600, color: "#dc3545" }}
          >
            Welcome Back 👋
          </h2>

          <div
            className="card-header text-center"
            style={{ backgroundColor: "#fef8f8", borderBottom: "none" }}
          >
            <h4>Login</h4>
          </div>

          <div className="card-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter email"
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="bg-danger text-white text-center px-6 py-2 rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>

                  <div className="text-center my-2 text-muted">or</div>

                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 mb-3"
                  >
                    <i className="fa fa-google me-2"></i> Login with Google
                  </button>

                  <div className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-danger fw-semibold"
                      style={{ textDecoration: "underline" }}
                    >
                      Sign up
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
