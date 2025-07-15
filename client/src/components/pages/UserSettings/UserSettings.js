import { NavLink, Navigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import { ListGroup, Nav } from "react-bootstrap";
import styles from './UserSettings.module.scss';
import { updateStatus, getStatus } from "../../../redux/statusReducer";
import { getUser } from "../../../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const UserSettings = () => {
    const user = useSelector(getUser);
    const status = useSelector(getStatus);
    const dispatch = useDispatch();
     useEffect(() => {
            if(user );
            else setTimeout(() => {
                if(!user) dispatch(updateStatus('authError'));
                else dispatch(updateStatus(null));
            }, 400 )
        }, [ user, dispatch]);
    return(
        <>
            <PageTitle>Settings:</PageTitle>
            {!user && status === 'authError' && <Navigate to='/' />}
            {user && status === null && <ListGroup className="col-10 mx-auto text-center">
                <ListGroup.Item><Nav.Link className={styles.settingLink} as={NavLink} to="/user/settings/address">Update adress data</Nav.Link></ListGroup.Item>
                <ListGroup.Item><Nav.Link className={styles.settingLink} as={NavLink}>Update login or password</Nav.Link></ListGroup.Item>
            </ListGroup>}
        </>
       
    );
}

export default UserSettings;