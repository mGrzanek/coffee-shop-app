import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './ProductItem.module.scss';
import { NavLink } from "react-router-dom";
import { IMG_URL } from "../../../config";

const ProductItem = ({id, name, image, price, variety}) => {
    return(
        <Col xs={12} md={6} lg={3} className="pt-4">
            <Card className={clsx(styles.card, "p-3")}>
                <Card.Body>
                <Card.Img variant="top" src={IMG_URL + image} className={styles.cardImage} />
                <Card.Title className={clsx(styles.cardTitle, "py-2")}>{name}</Card.Title>
                <Card.Text><b>Price: </b>${price}</Card.Text>
                <Card.Text><b>Variety</b>: {variety}</Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="outline-light" size="sm" className={styles.btn} as={NavLink} to={`/products/${id}`}>
                        Read more
                    </Button>
                    <Button variant="outline-light" size="sm" className={styles.btn}>
                        Add to cart
                    </Button>
                </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductItem;