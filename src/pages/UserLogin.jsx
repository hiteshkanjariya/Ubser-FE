import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../features/userAuthSlice';

const UserLogin = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));

        // Live validation
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let tempErrors = { ...errors };

        if (name === 'email') {
            if (!value) tempErrors.email = 'Email is required';
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                tempErrors.email = 'Invalid email address';
            } else delete tempErrors.email;
        }

        if (name === 'password') {
            if (!value) tempErrors.password = 'Password is required';
            else delete tempErrors.password;
        }

        setErrors(tempErrors);
    };

    const validate = () => {
        let tempErrors = {};
        if (!data.email) tempErrors.email = 'Email is required';
        if (!data.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const resultAction = await dispatch(userLogin(data));
        if (userLogin.fulfilled.match(resultAction)) {
            navigate('/home');
        }
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-16 mb-8 top-5'
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <form onSubmit={handleSubmit}>
                    <h3 className='text-lg font-medium mb-2'>What is your email</h3>
                    <input
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        placeholder='email@example.com'
                        className={`bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-lg placeholder:text-base ${errors.email ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

                    <h3 className='text-lg font-medium mt-4 mb-2'>Enter password</h3>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder='password'
                        className={`bg-[#eeeeee] mb-2 rounded px-2 py-2 border w-full text-lg placeholder:text-base ${errors.password ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className='w-full bg-black text-white py-3 rounded mt-5'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className='text-center mt-2'>
                    New here? <Link to="/signup" className='text-blue-600'>Create new Account</Link>
                </p>
            </div>
            <Link
                to='/caption-login'
                className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded py-3'
            >
                Sign in as Caption Login
            </Link>
        </div>
    );
};

export default UserLogin;
