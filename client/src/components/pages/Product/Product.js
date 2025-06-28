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

    const sortedWeights = weights.sort((a, b) => {
        return a.value - b.value;
    });

    const [actionStatus, setActionStatus] = useState(status);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [currentAmount, setCurrentAmount] = useState(1);
    const [currentWeight, setCurrentWeight] = useState(null);


    useEffect(() => {
        setActionStatus(status);
    }, [status]);

    useEffect(() => {
        if(sortedWeights.length > 0 && currentWeight === null && currentWeightMultiplier === null ) {
            setCurrentWeight(sortedWeights[0].value);
            setCurrentWeightMultiplier(sortedWeights[0].multiplier);
        }
    }, [sortedWeights, currentWeight, currentWeightMultiplier]);

    useEffect(() => {
        if(actionStatus === 'success' && product) setCurrentPrice((product.price * currentWeightMultiplier * currentAmount).toFixed(2));
    }, [currentWeightMultiplier, product, actionStatus, currentAmount]);

    const addToCart = () => {
        const cartProduct = {
            productId: product.id,
            productName: product.name,
            productWeight: +currentWeight,
            productPrice: +currentPrice,
        }
        dispatch(addCartProductThunk(cartProduct));
    }
    
    return(
        <>
            {actionStatus === "pending" && !product && <Loader />}
            {actionStatus === "success" && !product && <Navigate to='/' />}
            {actionStatus === "success" && product && <Card className="col-11 col-sm-9 col-md-7 m-4 py-3 px-sm-3 p-md-4 mx-auto shadow">
                <Card.Body className="d-flex p-0 flex-column justify-content-center align-items-center">
                    {product.image && (
                        <Card.Img className={styles.cardImage} src={IMG_URL + product.image} />
                    )}
                   <div className="px-3 px-5 py-4">
                        <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
                        <div className="d-flex pb-3 justify-content-around align-items-center">
                            {currentPrice !== null  && <Card.Text className={styles.price}>${currentPrice}</Card.Text>}
                            <WeightsForm sortedWeights={sortedWeights} setCurrentWeightMultiplier={setCurrentWeightMultiplier} activeWeight={currentWeight} setActiveWeight={setCurrentWeight} />
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