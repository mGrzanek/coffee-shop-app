import { Card, Button } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsReducer";
import { getStatus } from "../../../redux/statusReducer";
import { IMG_URL } from "../../../config";
import styles from "./Product.module.scss";
import Loader from "./../../common/Loader/Loader";
import { useState, useEffect } from "react";
import WeightForm from "../../features/WeightForm/WeightForm";

const Product = () => {
    const {id} = useParams();
    const product = useSelector(state => getProductById(state, id));
    const status = useSelector(getStatus);
    const [actionStatus, setActionStatus] = useState(status);

    useEffect(() => {
        setActionStatus(status);
    }, [status]);
    
    return(
        <>
            {actionStatus === "pending" && !product && <Loader />}
            {actionStatus === "success" && !product && <Navigate to='/' />}
            {actionStatus === "success" && product && <Card className="col-11 col-sm-8 col-md-6 m-4 px-0 py-3 px-sm-3 p-md-4 mx-auto shadow">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
                    {product.image && (
                        <Card.Img className={styles.cardImage} src={IMG_URL + product.image} />
                    )}
                   <div className="px-3 px-sm-5 py-4">
                        <div>
                            <Card.Text className={styles.price}>${product.price}</Card.Text>
                        </div>
                        <Card.Text className="fst-italic">{product.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Text><b className={styles.label}>Variety: </b><span className="fst-italic">{product.variety}</span></Card.Text>
                                <Card.Text><b className={styles.label}>Origin: </b><span className="fst-italic">{product.origin}</span></Card.Text>
                            </div>
                            <WeightForm />
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