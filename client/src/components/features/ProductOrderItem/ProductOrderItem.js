import { ListGroup } from "react-bootstrap";
import styles from "./ProductOrderItem.module.scss";
import { getProductById } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ProductOrderItem = ({productId, productName, productPrice, productSinglePrice, weightId, productWeight, optionalMessage, productAmount}) => {
    const product = useSelector(state => getProductById(state, productId));
    const weights = product ? product.weights : [];
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    
    const multiplier = weights.length > 0 ? weights.find(weight => weight.id === weightId).multiplier : null;

     useEffect(() => {
            setCurrentWeightMultiplier(multiplier);
        }, [multiplier]);

    return(
        <ListGroup.Item className={styles.productsSumary}>
            <div className="d-flex flex-column flex-sm-row d-flex justify-content-around align-items-center">
                <div className="co-sm-4 text-center"><span className={styles.productName}>{productName}</span></div>
                <div className="col-12 col-sm-8 d-flex flex-column justify-content-around align-items-center">
                    <div className="col-12 d-flex justify-content-around align-items-center">
                        <div >{productWeight}g</div>
                        <div >{productAmount} x {(productSinglePrice*currentWeightMultiplier).toFixed(2)} $</div>
                        <div >{productPrice.toFixed(2)} $</div>
                    </div>
                    {optionalMessage && <div className="pt-3 col-11 d-flex justify-content-center justify-content-sm-start align-items-center">
                        <span className={styles.messageLabel}>Message:</span> 
                        <i className="px-1 fw-normal">"{optionalMessage}"</i>
                    </div>}
                </div>
            </div>
        </ListGroup.Item>
    );
}

ProductOrderItem.propTypes = {
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productSinglePrice: PropTypes.number.isRequired,
    productWeight: PropTypes.number.isRequired,
    optionalMessage: PropTypes.string,
    productAmount: PropTypes.number.isRequired,
}

export default ProductOrderItem;