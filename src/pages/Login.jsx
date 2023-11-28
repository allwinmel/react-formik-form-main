import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    const check = localStorage.getItem('isLoggedin');
    if (check==='true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = (values) => {
    const { email, password } = values;
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('isLoggedin', true);
      toast.success('Login Successful!');
      navigate('/dashboard');
    } else {
      toast.error('Email or Password Wrong!');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className="container mt-2 mb-5">
      <div className="row ">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/Login.jpg" alt="Signup" className="img-fluid login-image" />
        </div>
        <div className="col-md-6 justify-content-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className='login-bg p-2'>
            <h2 className='text-center text-white fw-bold'>Login</h2>
              <div className="mb-3 mt-5">
                <label htmlFor="email" className='text-white fw-bold mb-2'>Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-warning fw-bold" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className='text-white fw-bold mb-2'>Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-warning fw-bold" />
              </div>
              <div className='text-center mb-3'>
              <button type="submit" className="btn btn-primary w-50">
                Login
              </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      </div>
  );
};

export default Login;
