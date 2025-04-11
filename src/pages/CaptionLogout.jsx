import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { captionLogout } from '../features/captionAuthSlice';

const CaptionLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      const response = await dispatch(captionLogout());
      console.log("🚀 ~ logout ~ response:", response)
      if (userLogin.fulfilled.match(response)) {
        navigate('/caption-home');
      }
    }
    logout();
  }, [])
  return (
    <div>
      CaptionLogout
    </div>
  )
}

export default CaptionLogout 
