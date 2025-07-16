import { ListGroup } from "react-bootstrap";
import styles from "./ClientOrderItem.module.scss";
import PropTypes from 'prop-types';

const ClientOrderItem = ({firstName, lastName, phone, email, address}) => {
     return(
        <ListGroup.Item>
            <div className="mx-auto col-10 d-flex flex-column flex-sm-row justify-content-sm-start align-items-center align-items-sm-start">
                <div className="col-6 col-sm-4 py-3">
                    <div className={styles.label}>Client:</div>
                    <div>{firstName} {lastName}</div>
                    <div>{email}</div>
                    <div>{phone}</div>
                </div>
                <div className="col-6 py-3">
                    <div className={styles.label}>Delivery address:</div>
                    <div>{address[0]} {address[1]}</div>
                    <div>{address[2]}</div>
                </div>
            </div>
        </ListGroup.Item>
     );
}

ClientOrderItem.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.array.isRequired,
}

export default ClientOrderItem;