import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { useSelector } from "react-redux";
import { getStatus} from "../../../redux/statusReducer";
import Loader from "../../common/Loader/Loader";
import { Button, ListGroup } from "react-bootstrap";
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
    const [statusAction, setStatusAction] = useState(status);

    useEffect(() => {
        setStatusAction(status);
    }, [status]);
    
    const itemsPrices = cartProducts.map(item => item.productPrice).reduce((acc, item) => {
        return acc + item;
    }, 0);

    useEffect(() => {
        if(cartProducts.length > 0) setCurrentCartPrice(itemsPrices);
    }, [cartProducts, itemsPrices, singleProductPrice]);

    return(
        <div>
            {statusAction === "pending" && <Loader />}
            {cartProducts.length === 0 && statusAction !== "pending" 
                && <div className="p-5 d-flex flex-column justify-content-center message">
                        <div>Empty cart</div> 
                        <div className="small">Add first product</div>
                    </div>}
            {cartProducts.length > 0 && statusAction !== "pending" && <ListGroup>
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