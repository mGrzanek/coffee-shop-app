import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './ProductItem.module.scss';
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import AmountForm from "../../features/AmountForm/AmountForm";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ProductItem = ({id, name, image, price, variety}) => {
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeight, setCurrentWeight] = useState(1);
    const [currentAmount, setCurrentAmount] = useState(1);

    useEffect(() => {
        setCurrentPrice((price * currentWeight * currentAmount).toFixed(2));
    }, [currentWeight, price, currentAmount]);

    return(
        <Col xs={10} sm={6} md={4} lg={3} className="pb-3 p-md-2">
            <Card className={clsx(styles.card)}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Img variant="top" src={IMG_URL + image} className={styles.cardImage} />
                <div className="d-flex flex-column align-items-center justify-content-center" as={NavLink} to={`/products/${id}`}>
                    <Card.Title className={clsx(styles.cardTitle, "mt-3 text-center")} as={NavLink} to={`/products/${id}`}>{name}</Card.Title>
                    <Card.Text className={styles.price}>${currentPrice}</Card.Text>          
                </div>
                 <WeightsForm setCurrentWeight={setCurrentWeight} />
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <AmountForm currentAmount={currentAmount} setCurrentAmount={setCurrentAmount} />
                    <Button variant="outline-light" size="sm" className="btn-one mx-2">
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
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}

export default ProductItem;