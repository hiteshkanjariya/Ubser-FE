import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { captionRegister } from '../features/captionAuthSlice';

const CaptionSignUp = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    color: '',
    plate: '',
    capacity: '',
    vehicleType: '',
  });
  const [errors, setErrors] = useState({});
  const selector = useSelector((state) => state.caption);
  const { error, isLoading } = selector;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!data.firstname) tempErrors.firstname = 'First name is required';
    if (!data.lastname) tempErrors.lastname = 'Last name is required';
    if (!data.email) {
      tempErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!data.password) {
      tempErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long';
    }
    if (!data.color) tempErrors.color = 'Vehicle color is required';
    if (!data.plate) tempErrors.plate = 'Plate is required';
    if (!data.capacity) tempErrors.capacity = 'Capacity is required';
    if (!data.vehicleType) tempErrors.vehicleType = 'Type is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  console.log('🚀 ~ CaptionSignUp ~ data:', data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const resultAction = await dispatch(captionRegister(data));
    if (captionRegister.fulfilled.match(resultAction)) {
      navigate("/caption-home");
    }
    console.log('Form submitted:', data);
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-8 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's our caption's name?</h3>
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-1/2">
              <input
                type="text"
                onChange={handleChange}
                name="firstname"
                placeholder="First name"
                className="bg-[#eeeeee] rounded px-2 py-2 border text-base placeholder:text-sm"
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>
            <div className="flex flex-col w-1/2">
              <input
                type="text"
                onChange={handleChange}
                name="lastname"
                placeholder="Last name"
                className="bg-[#eeeeee] rounded px-2 py-2 border text-base placeholder:text-sm"
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">What's our caption's email?</h3>
          <div className='mb-4'>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="email@example.com"
              className="bg-[#eeeeee]  rounded px-2 py-2 border w-full text-base placeholder:text-sm"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <div className='mb-4'>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="bg-[#eeeeee] rounded px-2 py-2 border w-full text-base placeholder:text-sm"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <h3 className="text-lg font-medium mb-2">Vehicle information</h3>
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-1/2">
              <input
                type="text"
                name="color"
                onChange={handleChange}
                placeholder="Vehicle color"
                className="bg-[#eeeeee] rounded px-2 py-2 border text-base placeholder:text-sm"
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
            </div>
            <div className='flex flex-col w-1/2'>
              <input
                type="text"
                name="plate"
                onChange={handleChange}
                placeholder="Vehicle plate"
                className="bg-[#eeeeee] rounded px-2 py-2 border text-base placeholder:text-sm"
              />
              {errors.plate && <p className="text-red-500 text-sm">{errors.plate}</p>}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className='flex flex-col w-1/2'>
              <input
                type="text"
                name="capacity"
                onChange={handleChange}
                placeholder="Vehicle capacity"
                className="bg-[#eeeeee] rounded px-2 py-2 border text-base placeholder:text-sm"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
            </div>
            <div className='flex flex-col w-1/2'>
              <select
                name="vehicleType"
                className="bg-[#eeeeee] rounded px-2 py-2 border text-base"
                onChange={handleChange}
              >
                <option value=""> Vehicle type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Moto</option>
              </select>
              {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
            </div>
          </div>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          <button type="submit" className="w-full bg-black text-white py-3 rounded mt-5" disabled={isLoading}>
            {isLoading ? " Create caption account ... " : " Create caption account"}
          </button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <Link to="/caption-login" className="text-blue-600">Login here</Link>
        </p>
      </div>
      <p className="text-[10px] leading-tight">
        This site is protected by reCAPTCHA and the <span className="underline">Google privacy</span> and{' '}
        <span className="underline">terms of service apply</span>.
      </p>
    </div>
  );
};

export default CaptionSignUp;
