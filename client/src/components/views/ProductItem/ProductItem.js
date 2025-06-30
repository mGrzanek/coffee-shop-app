import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './ProductItem.module.scss';
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import { getWeights } from './../../../redux/weightsReducer';
import { addCartProductThunk } from "../../../redux/cartProductsReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import AmountForm from "../../features/AmountForm/AmountForm";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ProductItem = ({id, name, image, price}) => {
    const dispatch = useDispatch();
    const weights = useSelector(getWeights);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeight, setCurrentWeight] = useState(null);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(1);

    useEffect(() => {
        if(weights.length > 0 && currentWeight === null && currentWeightMultiplier === null ) {
            setCurrentWeight(weights[0].value);
            setCurrentWeightMultiplier(weights[0].multiplier);
        }
    }, [weights, currentWeight, currentWeightMultiplier]);

    useEffect(() => {
        setCurrentPrice(price * currentWeightMultiplier * currentAmount);
    }, [currentWeightMultiplier, price, currentAmount]);

    const addToCart = () => {
        const newPrice = Number(currentPrice);
        const amount = Number(currentAmount);
        const weight = Number(currentWeight);
        const weightValues = weights.map(weight => weight.value);
        const isValidWeight = weightValues.includes(weight);
        if (id && name && !isNaN(price) && !isNaN(amount) && amount > 0 && amount <=10 && !isNaN(weight) && isValidWeight){
            const cartProduct = {
                productId: id,
                productName: name,
                productWeight: weight,
                productPrice: newPrice,
                productAmount: amount,
                productSinglePrice: price,
                optionalMessage: '',
            } 
            dispatch(addCartProductThunk(cartProduct));
        } else console.log('Invalid product data');
    }

    return(
        <Col xs={10} sm={6} md={4} lg={3} className="pb-3 p-md-2">
            <Card className={clsx(styles.card)}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Img variant="top" src={IMG_URL + image} className={styles.cardImage} />
                <div className="d-flex flex-column align-items-center justify-content-center" as={NavLink} to={`/products/${id}`}>
                    <Card.Title className={clsx(styles.cardTitle, "mt-3 text-center")} as={NavLink} to={`/products/${id}`}>{name}</Card.Title>
                    {currentPrice !== null && !isNaN(currentPrice) &&<Card.Text className={styles.price}>${currentPrice.toFixed(2)}</Card.Text>}          
                </div>
                 <WeightsForm weights={weights} setCurrentWeightMultiplier={setCurrentWeightMultiplier} activeWeight={currentWeight} setActiveWeight={setCurrentWeight} />
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <AmountForm currentAmount={currentAmount} setCurrentAmount={setCurrentAmount} />
                    <Button variant="outline-light" size="sm" className="btn-one mx-2">
                        <FontAwesomeIcon className={styles.cart} icon={faCartShopping} onClick={addToCart} />
                    </Button>
                </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}

export default ProductItem;