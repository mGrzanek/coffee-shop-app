import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './ProductItem.module.scss';
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ProductItem = ({id, name, image, price, variety}) => {
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentWeight, setCurrentWeight] = useState(1);

    useEffect(() => {
        setCurrentPrice((price * currentWeight).toFixed(2));
    }, [currentWeight, price]);

    return(
        <Col xs={10} sm={6} md={4} lg={3} className="pb-3 p-md-2">
            <Card className={clsx(styles.card)}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Img variant="top" src={IMG_URL + image} className={styles.cardImage} />
                <div>
                    <Card.Title className={clsx(styles.cardTitle, "mt-3 text-center")}>{name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center pb-2">
                        <Card.Text className={styles.price}>${currentPrice}</Card.Text>
                    </div>                 
                    <WeightsForm setCurrentWeight={setCurrentWeight} />
                    <div className="d-flex mt-3 justify-content-between align-items-center">
                        <Button variant="outline-light" size="sm" className="btn" as={NavLink} to={`/products/${id}`}>
                            Read more
                        </Button>
                        <Button variant="outline-light" size="sm" className="btn mx-2">
                           <FontAwesomeIcon className={styles.cart} icon={faCartShopping} />
                        </Button>
                    </div>
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