import { Card, Button } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsReducer";
import { getStatus } from "../../../redux/statusReducer";
import { IMG_URL } from "../../../config";
import styles from "./Product.module.scss";
import Loader from "./../../common/Loader/Loader";
import { useState, useEffect } from "react";
import AmountForm from "../../features/AmountForm/AmountForm";
import WeightsForm from "../../features/WeightsForm/WeightsForm";

const Product = () => {
    const {id} = useParams();
    const product = useSelector(state => getProductById(state, id));
    const status = useSelector(getStatus);
    const [actionStatus, setActionStatus] = useState(status);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeight, setCurrentWeight] = useState(1);

    useEffect(() => {
        setActionStatus(status);
    }, [status]);

    useEffect(() => {
        if(actionStatus === 'success' && product) setCurrentPrice((product.price * currentWeight).toFixed(0));
    }, [currentWeight, product, actionStatus]);
    
    return(
        <>
            {actionStatus === "pending" && !product && <Loader />}
            {actionStatus === "success" && !product && <Navigate to='/' />}
            {actionStatus === "success" && product && <Card className="col-11 col-sm-9 col-md-7 m-4 px-0 py-3 px-sm-3 p-md-4 mx-auto shadow">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
                    {product.image && (
                        <Card.Img className={styles.cardImage} src={IMG_URL + product.image} />
                    )}
                   <div className="px-3 px-sm-5 py-4">
                        <div className="d-flex justify-content-between align-items-center">
                            {currentPrice !== null  && <Card.Text className={styles.price}>${currentPrice}</Card.Text>}
                            <WeightsForm setCurrentWeight={setCurrentWeight} />
                        </div>
                        <Card.Text className="fst-italic">{product.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Text><b className={styles.label}>Variety: </b><span className="fst-italic">{product.variety}</span></Card.Text>
                                <Card.Text><b className={styles.label}>Origin: </b><span className="fst-italic">{product.origin}</span></Card.Text>
                            </div>
                            <AmountForm />
                        </div>
                   </div>
                </Card.Body>
                <Button variant="outline-light" className="btn text-uppercase w-50 mx-auto">
                    Add to cart
                </Button>
            </Card>}
        </>
    );
}

export default Product;