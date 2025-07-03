import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { useSelector } from "react-redux";
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
    const [singleProductPrice, setSingleProductPrice] = useState(null);
    
    const itemsPrices = cartProducts.map(item => item.productPrice).reduce((acc, item) => {
        return acc + item;
    }, 0);

    useEffect(() => {
        if(cartProducts.length > 0) setCurrentCartPrice(itemsPrices);
    }, [cartProducts, itemsPrices, singleProductPrice]);

    return(
        <div>
            {status === "pending" && <Loader />}
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
                    <CartItem key={cartProduct.productId} {...cartProduct} />)
                }
                <ListGroup.Item className={clsx(styles.cartSummaryPrice, "d-flex justify-content-around align-items-center")}>
                    <div >Cart price: <span className="px-2">${currentCartPrice}</span></div>
                    <Button variant="outline-light" className="btn-two" as={NavLink} to='/order/form'>Add order </Button>
                </ListGroup.Item>
            </ListGroup>}
        </div>
    );
}

export default Cart;