import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../features/userAuthSlice";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        dispatch(userProfile())
            .unwrap()
            .catch(() => {
                navigate("/login");
            });
    }, [dispatch, navigate]);


    return <>{children}</>;
};

export default UserProtectWrapper;
