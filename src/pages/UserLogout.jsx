import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userLogin, userLogout } from '../features/userAuthSlice';

const UserLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            const response = await dispatch(userLogout());
            console.log("🚀 ~ logout ~ response:", response)
            if(userLogin.fulfilled.match(response)){
                navigate('/home');
            }
        } 
        logout();
    },[])
  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout
