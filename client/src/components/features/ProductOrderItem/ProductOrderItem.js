import OrderDetail from "../../views/OrderDetail/OrderDetail";
import { getProductById } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ProductOrderItem = ({productId, productName, productPrice, productSinglePrice, weightId, productWeight, optionalMessage, productAmount}) => {
    const product = useSelector(state => getProductById(state, productId));
    const weights = product ? product.weights : [];
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    
    const multiplier = weights.length > 0 ? weights.find(weight => weight.id === weightId).multiplier : null;
    const currentProductPrice = productSinglePrice*currentWeightMultiplier;

     useEffect(() => {
            setCurrentWeightMultiplier(multiplier);
        }, [multiplier]);

    return(
       <> 
            <OrderDetail productName={productName} productAmount={productAmount} currentProductPrice={currentProductPrice} 
            productPrice={productPrice} productWeight={productWeight} optionalMessage={optionalMessage} />
        </>
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