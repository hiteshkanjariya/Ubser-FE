import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { captionLogin } from '../features/captionAuthSlice';

const CaptionLogin = () => {
    const [data, setData] = useState({
        email: "caption@gmail.com",
        password: "caption",
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.caption);

    const handleChnage = (e) => {
        const { name, value } = e.target;
        setData((prv) => ({
            ...prv,
            [name]: value
        }))
        // Live validation
        validateField(name, value);
    }
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

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const resultAction = await dispatch(captionLogin(data));
        if (captionLogin.fulfilled.match(resultAction)) {
            navigate('/caption-home');
        }
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-8 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <form onSubmit={hanldeSubmit}>
                    <h3 className='text-lg font-medium mb-2'>What is your email</h3>
                    <input type="email" onChange={handleChnage} name='email' placeholder='email@example.com' className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg  placeholder:text-base' />
                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <input type="password" name="password" onChange={handleChnage} placeholder='password' id="" className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg  placeholder:text-base' />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button type="submit" className='w-full bg-black text-white py-3 rounded mt-5' disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className='text-center mt-2'>Join a fleet? <Link to="/caption-signup" className='text-blue-600'> Register as a caption </Link></p>

            </div>
            <Link
                to='/login'
                className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded py-3'
            >
                Signin as User Login
            </Link>
        </div>
    )
}

export default CaptionLogin
