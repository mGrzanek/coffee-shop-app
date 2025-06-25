import { Card, Col, Button } from "react-bootstrap";
import clsx from 'clsx';
import styles from './ProductItem.module.scss';
import { NavLink } from "react-router-dom";

const ProductItem = ({id, name, price, variety}) => {
    return(
        <Col xs={12} md={6} lg={3} className="pt-4">
            <Card className={clsx(styles.card, "p-3")}>
                <Card.Body>
                {/* <Card.Img variant="top" src={IMG_URL + image} className={styles.cardImage} /> */}
                <Card.Title className={clsx(styles.cardTitle, "text-warning py-2")}>{name}</Card.Title>
                <Card.Text className="py-1"><b>Price: </b> {price}</Card.Text>
                <Card.Text className="py-1">{variety}</Card.Text>
                <Button variant="outline-warning"  size="sm" className=" text-lowercase fw-bold" as={NavLink} to={`/products/${id}`}>
                    Read more
                </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductItem;