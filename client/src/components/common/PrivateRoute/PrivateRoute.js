import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/userReducer";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const user = useSelector(getUser);
    const status = useSelector(getStatus);
    const dispatch = useDispatch();
     useEffect(() => {
        setTimeout(() => {
            if(!user) dispatch(updateStatus('authError'));
            else dispatch(updateStatus(null));
        }, 300 );
    }, [ user, dispatch]);
    return(
        <>
            {!user && status === 'pending' && <Loader />}
            {!user && status === 'authError' && <Navigate to='/' />}
            {user && <span>{children}</span>}
        </>
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute