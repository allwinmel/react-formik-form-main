import React,{useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Register.css';
import { toast } from 'react-toastify';


const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    useEffect(() => {
        const check = localStorage.getItem('isLoggedin');
        if (check && check==='true') {
          navigate('/dashboard');
        }
      }, [navigate]);

    const onSubmit = async (values) => {
        const { firstName, email, password } = values;

        try {

            // Store user data in local storage
            localStorage.setItem('name', firstName);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            toast.success('Signup Completed!');
            navigate('/login'); 

        } catch (error) {
            toast.error('Error occurred while hashing the password');
            console.error('Error occurred while hashing the password:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        mobileNumber: Yup.string().required('Mobile Number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

  return (
    <div className="container mt-2 d-flex">
    <div className="row">
      <div className="col-md-6">
          <img src="/images/Signup.jpg" className='register-img' alt="Signup" />
          </div>
        <div className="col-md-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            <Form className='text-white p-2 register-bg fw-bold'>
                <h2 className='text-center text-white fw-bold'>Register</h2>
              <div className="mb-3">
                <label htmlFor="firstName">First Name</label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-warning" />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="text-warning" />
              </div>

              <div className="mb-3">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <Field type="text" name="mobileNumber" className="form-control" />
                <ErrorMessage name="mobileNumber" component="div" className="text-warning" />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-warning" />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-warning" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-warning" />
              </div>
              <div className='text-center'>
              <button type="submit" className="btn btn-success w-50">Register</button>
              </div>
            </Form>
          </Formik>
          </div>
      </div>
    </div>
  );
};

export default Register;