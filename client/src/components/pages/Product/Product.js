import { Card, Button } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../../redux/productsReducer";
import { getStatus } from "../../../redux/statusReducer";
import { getWeights } from './../../../redux/weightsReducer';
import { IMG_URL } from "../../../config";
import styles from "./Product.module.scss";
import Loader from "./../../common/Loader/Loader";
import { useState, useEffect } from "react";
import AmountForm from "../../features/AmountForm/AmountForm";
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import { addCartProductThunk } from "./../../../redux/cartProductsReducer";


const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => getProductById(state, id));
    const status = useSelector(getStatus);
    const weights = useSelector(getWeights);

    const [actionStatus, setActionStatus] = useState(status);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(1);
    const [currentWeight, setCurrentWeight] = useState(null);


    useEffect(() => {
        setActionStatus(status);
    }, [status]);

    useEffect(() => {
        if(weights.length > 0 && currentWeight === null && currentWeightMultiplier === null ) {
            setCurrentWeight(weights[0].value);
            setCurrentWeightMultiplier(weights[0].multiplier);
        }
    }, [weights, currentWeight, currentWeightMultiplier]);

    useEffect(() => {
        if(actionStatus !== 'pending' && product) setCurrentPrice(product.price * currentWeightMultiplier * currentAmount);
    }, [currentWeightMultiplier, product, actionStatus, currentAmount]);

    const addToCart = () => {
        const price = Number(currentPrice);
        const amount = Number(currentAmount);
        const weight = Number(currentWeight);
        const weightValues = weights.map(weight => weight.value);
        const isValidWeight = weightValues.includes(weight);
        if (product?.id && product?.name && !isNaN(price) && !isNaN(amount) && amount > 0 && amount <=10 && !isNaN(weight) && isValidWeight){
            const cartProduct = {
                productId: product.id,
                productName: product.name,
                productWeight: weight,
                productPrice: price,
                productAmount: amount,
            } 
            dispatch(addCartProductThunk(cartProduct));
        } else console.log('Invalid product data');
    }
    
    return(
        <>
            {actionStatus === "pending" && !product && <Loader />}
            {actionStatus !== "pending" && !product && <Navigate to='/' />}
            {actionStatus !== "pending" && product && <Card className="col-11 col-sm-9 col-md-7 m-4 py-3 px-sm-3 p-md-4 mx-auto shadow">
                <Card.Body className="d-flex p-0 flex-column justify-content-center align-items-center">
                    {product.image && (
                        <Card.Img className={styles.cardImage} src={IMG_URL + product.image} />
                    )}
                   <div className="px-3 px-5 py-4">
                        <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
                        <div className="d-flex pb-3 justify-content-around align-items-center">
                            {currentPrice !== null  && <Card.Text className={styles.price}>${currentPrice.toFixed(2)}</Card.Text>}
                            <WeightsForm weights={weights} setCurrentWeightMultiplier={setCurrentWeightMultiplier} activeWeight={currentWeight} setActiveWeight={setCurrentWeight} />
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
                <Button variant="outline-light" className="btn-one text-uppercase w-50 mx-auto" onClick={addToCart}>
                    Add to cart
                </Button>
            </Card>}
        </>
    );
}

export default Product;