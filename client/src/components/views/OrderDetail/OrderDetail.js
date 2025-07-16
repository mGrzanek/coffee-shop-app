import { ListGroup } from "react-bootstrap";
import styles from './OrderDetail.module.scss';

const OrderDetail = ({productName, productWeight, productAmount, currentProductPrice, productPrice, optionalMessage }) => {
    return(
        <ListGroup.Item className={styles.productsSumary}>
            <div className="d-flex flex-column flex-sm-row justify-content-around align-items-center">
                <div className="col-12 col-sm-4 text-center">
                    <span className={styles.productName}>{productName}</span>
                </div>
                <div className="col-12 col-sm-8 d-flex flex-column justify-content-around align-items-center">
                    <div className="w-100 col-12 d-flex align-items-center justify-content-around">
                        <div>{productWeight}g</div>
                        <div>
                            {productAmount} x $ {currentProductPrice.toFixed(2)}
                        </div>
                        <div>$ {productPrice.toFixed(2)}</div>
                    </div>
                    {optionalMessage && (
                        <div className="pt-3 col-10 d-flex justify-content-center justify-content-sm-start align-items-center">
                            <span className={styles.messageLabel}>Message:</span>
                            <i className="px-1 fw-normal">"{optionalMessage}"</i>
                        </div>
                    )}
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default OrderDetail;