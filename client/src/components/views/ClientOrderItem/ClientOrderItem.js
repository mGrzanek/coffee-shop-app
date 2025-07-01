import { ListGroup } from "react-bootstrap";
import styles from "./ClientOrderItem.module.scss";

const ClientOrderItem = ({firstName, lastName, phone, email, address}) => {
     return(
        <ListGroup.Item>
            <div className="mx-auto col-10 d-flex flex-column flex-sm-row justify-content-sm-around align-items-center align-items-sm-start">
                <div className="col-6 py-3">
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

export default ClientOrderItem;