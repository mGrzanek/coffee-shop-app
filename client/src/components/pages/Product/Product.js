import { Card, Button, Carousel } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/userReducer";
import { getProductById, fetchLikedProduct, fetchUnlikedProduct } from "../../../redux/productsReducer";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { IMG_URL } from "../../../config";
import AlertMessage from './../../common/AlertMessage/AlertMessage';
import styles from "./Product.module.scss";
import Loader from "./../../common/Loader/Loader";
import { useState, useEffect } from "react";
import AmountForm from "../../features/AmountForm/AmountForm";
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import { addCartProductThunk, getAllCartProducts, updateCartProductThunk } from "./../../../redux/cartProductsReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import clsx from "clsx";

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const product = useSelector(state => getProductById(state, id));
    const cartProducts = useSelector(getAllCartProducts);
    const status = useSelector(getStatus);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(1);
    const [currentWeight, setCurrentWeight] = useState(null);
    const [sorterdImages, setSortedImages] = useState([]);
    const [animate, setAnimate] = useState(false);
    const liked = !!(user && product.users.some(u => u.id === user.id));

    useEffect(() => {
        if(product && product.images.length > 0) {
            const sorterdImages = [...product.images].sort((a, b) => {
                const image1 = a.image.includes('other') ? 1 : 0;
                const image2 = b.image.includes('other') ? 1 : 0;
                return image1 - image2;
            });   
            setSortedImages(sorterdImages);
        }
    }, [product]);

    useEffect(() => {
        if(product && product.weights.length > 0 && currentWeight === null && currentWeightMultiplier === null ) {
            setCurrentWeight(product.weights[0].value);
            setCurrentWeightMultiplier(product.weights[0].multiplier);
        }
    }, [product, currentWeight, currentWeightMultiplier]);

    useEffect(() => {
        if(status !== 'pending' && product) setCurrentPrice(product.price * currentWeightMultiplier * currentAmount);
    }, [currentWeightMultiplier, product, status, currentAmount]);


    const addToCart = () => {
        const price = Number(currentPrice);
        const amount = Number(currentAmount);
        const weight = Number(currentWeight);
        const weightId = product.weights.find(weight => weight.value === currentWeight).id;
        if (product?.id && product?.name && !isNaN(price) && !isNaN(amount) && amount > 0 && amount <=10 && !isNaN(weight) && weightId){
            const cartProductExist = cartProducts.find( cartProduct => cartProduct.productId === product.id && cartProduct.weightId === weightId);
            if(cartProductExist) {
                if(cartProductExist.productAmount > 0 && cartProductExist.productAmount < 10 && (cartProductExist.productAmount + amount) <= 10 ){
                    const cartProduct = {
                        ...cartProductExist,
                        productPrice: cartProductExist.productPrice + price,
                        productAmount: cartProductExist.productAmount + amount,
                    } 
                    dispatch(updateCartProductThunk(cartProduct));
                } else dispatch(updateStatus("clientConflict"));
            } else {
                const cartProduct = {
                    productId: product.id,
                    productWeight: weight,
                    weightId,
                    productName: product.name,
                    productPrice: price,
                    productAmount: amount,
                    productSinglePrice: product.price,
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
                    productId: product.id, 
                    userId: user.id
                }));
            }
            else {
                dispatch(fetchLikedProduct({
                    productId: product.id, userId: user.id
                })); 
            }    
        } else {
            dispatch(updateStatus("authError"));
            console.log('auth error');
        }
    }
    
    return(
        <>
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Invalid params." />}
            {status === "authError" && <AlertMessage variant="warning" alertTitle="Only for logged users" alertContent="This action is possible only after logged" />}
            {status === "clientConflict" && <AlertMessage variant="warning" alertTitle="Product limit" alertContent="You can add to cart max 10 pieces of selected product" />}
            {status === "pending" && !product && <Loader />}
            {status === "success" && !product && <Navigate to='/' />}
            {status !== "pending" && product && <Card className="col-11 col-sm-9 col-md-7 m-4 py-3 px-sm-3 p-md-4 mx-auto shadow">
                <Card.Body className="d-flex p-0 flex-column justify-content-center align-items-center">
                    {product.images.length > 0 && (
                        <Carousel interval={null} slide={false}>
                            {sorterdImages.map(image => 
                            <Carousel.Item key={image.id}>
                                <FontAwesomeIcon onClick={toggleToFavorites} className={clsx(styles.heart, animate && styles.glow)} 
                                icon={liked ? solidHeart : regularHeart} />
                                <Card.Img className={styles.cardImage} src={`${IMG_URL}/${image.image}`} />
                            </Carousel.Item>)}
                        </Carousel>
                    )}
                   <div className="px-3 px-5 py-4">
                        <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
                        <div className="d-flex pb-3 justify-content-around align-items-center">
                            {currentPrice !== null  && <Card.Text className={styles.price}>{currentPrice.toFixed(2)}$</Card.Text>}
                            <WeightsForm weights={product.weights} setCurrentWeightMultiplier={setCurrentWeightMultiplier} activeWeight={currentWeight} setActiveWeight={setCurrentWeight} />
                        </div>
                        <Card.Text className="fst-italic px-lg-5 text-center">{product.description}</Card.Text>
                        <div className="d-flex justify-content-around align-items-center">    
                            <div>
                                <Card.Text className="p-0 my-0"><b className={styles.label}>Variety: </b><span className="fst-italic">{product.variety}</span></Card.Text>
                                <Card.Text className="p-0 my-0"><b className={styles.label}>Origin: </b><span className="fst-italic">{product.origin}</span></Card.Text>
                            </div>
                            <AmountForm currentAmount={currentAmount} setCurrentAmount={setCurrentAmount} />
                        </div>
                   </div>
                </Card.Body>
                <Button variant="outline-light" className="btn-one w-50 mx-auto" onClick={addToCart}>
                    Add to cart
                </Button>
            </Card>}
        </>
    );
}

export default Product;