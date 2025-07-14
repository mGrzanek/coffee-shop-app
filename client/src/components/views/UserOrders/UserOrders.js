import PageTitle from "../../common/PageTitle/PageTitle";
import UserOrder from "../UserOrder/UserOrder";
import { ListGroup } from "react-bootstrap";
import { getUser } from "../../../redux/userReducer";
import { useSelector } from "react-redux";
import clsx from "clsx";
import styles from './UserOrders.module.scss';

const UserOrders = () => {
    const user = useSelector(getUser);
    return(
        <>
            <PageTitle>Orders:</PageTitle>
            <ListGroup>
                <ListGroup.Item className={clsx(styles.ordersHeader, 'd-none d-md-flex justify-content-around align-items-center')}>
                    <div className="d-flex justify-content-around align-items-center col-5  py-1">
                        Order number:
                    </div>
                    <div className="d-flex justify-content-around align-items-center col-12 col-md-5 py-1">
                        <div>Order date:</div>
                        <div>Total:</div>
                        <div>Status:</div>
                    </div>
                </ListGroup.Item>
                {user.orders.map(order => <UserOrder key={order.id} {...order} />)}
            </ListGroup>
        </>
        
    );
}

export default UserOrders;