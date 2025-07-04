import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { useSelector } from "react-redux";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { getStatus} from "../../../redux/statusReducer";
import Loader from "../../common/Loader/Loader";
import { Button, ListGroup } from "react-bootstrap";
import PageTitle from "../../common/PageTitle/PageTitle";
import CartItem from "../../features/CartItem/CartItem";
import styles from "./Cart.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const cartProducts = useSelector(getAllCartProducts);
    const status = useSelector(getStatus);
    const [currentCartPrice, setCurrentCartPrice] = useState(null);
    
    const itemsPrices = cartProducts.map(item => item.productPrice).reduce((acc, item) => {
        return acc + item;
    }, 0);

    useEffect(() => {
        if(cartProducts.length > 0) setCurrentCartPrice(itemsPrices.toFixed(2));
    }, [cartProducts, itemsPrices]);

    return(
        <div>
            {status === "pending" && <Loader />}
            {status === 'clientError' && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Invalid params" />}
            {status === 'clientConflict' && <AlertMessage variant="warning" alertTitle="This product exist in cart" alertContent="This product with the same weight exist in cart" />}
            {cartProducts.length === 0 && status !== "pending" 
                && <div className="p-5 d-flex flex-column justify-content-center">
                        <PageTitle>Empty cart...</PageTitle> 
                        <PageTitle>Add first product</PageTitle>
                    </div>}
            {cartProducts.length > 0 && status !== "pending" && <ListGroup>
                <ListGroup.Item className={styles.cartSummaryPrice}>
                    <div className="text-center">Your cart:</div>
                </ListGroup.Item>
                {cartProducts.map(cartProduct => 
                    <CartItem key={cartProduct.id} cartProducts={cartProducts} {...cartProduct} />)
                }
                <ListGroup.Item className={clsx(styles.cartSummaryPrice, "d-flex flex-column flex-sm-row justify-content-around align-items-center")}>
                    <div className="py-1">Cart price: <span className="px-2">${currentCartPrice}</span></div>
                    <Button variant="outline-light" className="btn-two" as={NavLink} to='/order/form'>Order form </Button>
                </ListGroup.Item>
            </ListGroup>}
        </div>
    );
}

export default Cart;