import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { captionProfile } from "../features/captionAuthSlice";
import { useDispatch } from "react-redux";

const CaptionProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/caption-login");
        }
        const getProfile = async () => {
            const resultAction = await dispatch(captionProfile());
            if (captionProfile.rejected.match(resultAction)) {
                navigate("/caption-login")
            }
        }
        getProfile()
    }, [navigate, dispatch]); // Ensuring navigate is stable

    return <>{children}</>;
};

export default CaptionProtectWrapper;
