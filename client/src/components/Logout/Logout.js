import { getStatus, updateStatus } from "../../redux/statusReducer";
import { fetchUser } from "../../redux/userReducer";
import { API_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../common/Loader/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const status = useSelector(getStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: "DELETE",
            credentials: "include"
        }
        updateStatus("pending");
        fetch(`${API_URL}/api/auth/logout`, options)
            .then(res => { 
                if(res.ok) res.json();
            })
            .then(() => {
                dispatch(fetchUser());
                //dispatch(updateStatus('success'));
                navigate("/");
            })
    }, [dispatch, navigate]);

    return status === "pending" ?<><Loader /><div>Logout process...</div></>: null;
}

export default Logout;