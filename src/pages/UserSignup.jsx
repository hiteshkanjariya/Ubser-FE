import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../features/userAuthSlice';

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const selector = useSelector((state) => state.user);
  const { error, isLoading } = selector;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!data.firstname) tempErrors.firstname = "First name is required";
    if (!data.lastname) tempErrors.lastname = "Last name is required";
    if (!data.email) {
      tempErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      tempErrors.email = "Invalid email address";
    }
    if (!data.password) {
      tempErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const resultAction = await dispatch(userRegister(data));
    if (userRegister.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>What is your name?</h3>
          <div className='flex gap-4 mb-7'>
            <input
              type="text"
              onChange={handleChange}
              name='firstname'
              placeholder='First name'
              className='bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm'
            />
            {errors.firstname && <p className='text-red-500 text-sm'>{errors.firstname}</p>}
            <input
              type="text"
              onChange={handleChange}
              name='lastname'
              placeholder='Last name'
              className='bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm'
            />
            {errors.lastname && <p className='text-red-500 text-sm'>{errors.lastname}</p>}
          </div>
          <h3 className='text-lg font-medium mb-2'>What is your email?</h3>
          <input
            type="email"
            onChange={handleChange}
            name='email'
            placeholder='email@example.com'
            className='bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-base placeholder:text-sm'
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder='Password'
            className='bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-base placeholder:text-sm'
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className='w-full bg-black text-white py-3 rounded mt-5' disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p className='text-center mt-2'>
          Already have an account? <Link to="/login" className='text-blue-600'>Login here</Link>
        </p>
      </div>
      <p className='text-[10px] leading-tight'>
        This site is protected by reCAPTCHA and the <span className='underline'>Google privacy</span> and <span className='underline'>terms of service apply</span>.
      </p>
    </div>
  );
};

export default UserSignUp;
