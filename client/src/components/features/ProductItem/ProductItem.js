import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './ProductItem.module.scss';
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../redux/statusReducer";
import { getUser } from "../../../redux/userReducer";
import { addCartProductThunk, updateCartProductThunk, getAllCartProducts } from "../../../redux/cartProductsReducer";
import { fetchLikedProduct, fetchUnlikedProduct } from "../../../redux/productsReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,  faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import WeightsForm from "../WeightsForm/WeightsForm";
import AmountForm from "../AmountForm/AmountForm";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ProductItem = ({id, name, images, price, weights, users}) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const cartProducts = useSelector(getAllCartProducts);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeight, setCurrentWeight] = useState(null);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(1);
    const [currentImage, setCurrentImage] = useState(null);
    const [animate, setAnimate] = useState(false);
    const liked = !!(user && users.some(u => u.id === user.id));

    useEffect(() => {
        if(images.length > 0) {
            const mainImage = images.find(image => !image?.image.includes('other')).image;
            setCurrentImage(mainImage);
        }
    }, [images]);

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
        const weightId = weights.find(w => w.value === weight).id;
        if (id && name && !isNaN(price) && !isNaN(amount) && amount > 0 && amount <=10 && !isNaN(weight) && weightId){
            const cartProductExist = cartProducts.find( cartProduct => cartProduct.productId === id && cartProduct.productWeight === weight);
                if(cartProductExist) {
                    if(cartProductExist.productAmount > 0 && cartProductExist.productAmount < 10 && (cartProductExist.productAmount + amount) <= 10 ){
                        const cartProduct = {
                            ...cartProductExist,
                            productPrice: cartProductExist.productPrice + newPrice,
                            productAmount: cartProductExist.productAmount + amount,
                        } 
                        dispatch(updateCartProductThunk(cartProduct));
                    } else dispatch(updateStatus("clientConflict"));
                } else {
                const cartProduct = {
                    productId: id,
                    productWeight: weight,
                    weightId,
                    productName: name,
                    productPrice: newPrice,
                    productAmount: amount,
                    productSinglePrice: price,
                    optionalMessage: '',
                } 
                dispatch(addCartProductThunk(cartProduct));
            }
        } else dispatch(updateStatus("clientError"));
    }

    const toggleToFavorites = () => {
        if(user && user.id){
            setAnimate(true);
            setTimeout(() => setAnimate(false), 1000);
            if(liked) { 
                dispatch(fetchUnlikedProduct({
                    productId: id, 
                    userId: user.id
                }));
            }
            else {
                dispatch(fetchLikedProduct({
                    productId: id, userId: user.id
                })); 
            }    
        } else dispatch(updateStatus("authError"))
    }

    return(
        <Col xs={11} sm={6} md={4} lg={3} className="pb-3 p-md-2">
            <Card className={clsx(styles.card)}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <FontAwesomeIcon onClick={toggleToFavorites} className={clsx(styles.heart, animate && styles.glow)} icon={liked ? solidHeart : regularHeart} />
                <Card.Img variant="top" src={`${IMG_URL}/${currentImage}`} className={styles.cardImage} />
                <div className="d-flex flex-column align-items-center justify-content-center" as={NavLink} to={`/products/${id}`}>
                    <Card.Title className={clsx(styles.cardTitle, "mt-3 text-center")} as={NavLink} to={`/products/${id}`}>{name}</Card.Title>
                    {currentPrice !== null && !isNaN(currentPrice) &&<Card.Text className={styles.price}>{currentPrice.toFixed(2)} $</Card.Text>}          
                </div>
                    <WeightsForm weights={weights} setCurrentWeightMultiplier={setCurrentWeightMultiplier} activeWeight={currentWeight} setActiveWeight={setCurrentWeight} />
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <AmountForm currentAmount={currentAmount} setCurrentAmount={setCurrentAmount} />
                    <Button variant="outline-light" size="sm" className="btn-one mx-2" onClick={addToCart}>
                        <FontAwesomeIcon className={styles.cart} icon={faCartShopping} />
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
    images: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    weights: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
}

export default ProductItem;