import { ListGroup, Button } from "react-bootstrap";
import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { getClient } from "../../../redux/clientReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductOrderItem from "../ProductOrderItem/ProductOrderItem";
import ClientOrderItem from "../../views/ClientOrderItem/ClientOrderItem";
import { useEffect, useState } from "react";
import styles from "./OrderSummary.module.scss";
import { updateClientThunk } from "../../../redux/clientReducer";
import { removeAllCartProductsThunk } from "../../../redux/cartProductsReducer";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client = useSelector(getClient);
    const deliveryCost = 10;
    const products = useSelector(getAllCartProducts);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentProducts, setCurrentProducts] = useState(null);

    useEffect(() => {
        setCurrentClient(client);
        setCurrentProducts(products)
    }, [client, products]);

    const productsPrice = products.map(product => product.productPrice).reduce((acc, productPrice) => {
        return acc + productPrice;
    }, 0);

    const totalPrice = productsPrice + deliveryCost;

    const orderSubmit = e => {
        e.preventDefault();
        const newOrder = {
            products,
            clientName: client.firstName,
            clientSurname: client.lastName,
            clientPhone: client.phone,
            clientEmail: client.email,
            clientAddress: client.address,
        }
        console.log(newOrder);
        dispatch(updateClientThunk(null));
        dispatch(removeAllCartProductsThunk());
        navigate('/');
    }

    return(
        <>
            {(!currentClient || !currentProducts || currentProducts.length === 0) && <div>Summary not available</div>}
            {currentClient && currentProducts.length > 0 && <ListGroup>
                <ListGroup.Item className="summaryLabel d-flex justify-content-center">
                    <div>Order summary:</div>
                </ListGroup.Item>
                    {products.map(product => <ProductOrderItem key={product.productId} {...product} />)}
                <ClientOrderItem {...client} />
                <ListGroup.Item>
                    <div className="d-flex justify-content-between align-items-center col-11">
                        <div className={styles.delivery}>Delivery price:</div> 
                        <span className=" mx-md-4 mx-lg-5">{deliveryCost.toFixed(2)} $</span>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className="summaryLabel px-sm-5 d-flex justify-content-center justify-content-sm-end align-items-center">
                    <div className="mx-sm-4" >Total price: <span className="px-2">{totalPrice.toFixed(2)} $</span></div>
                    <Button variant="outline-light" className="btn-two" onClick={orderSubmit}>Order </Button>
                </ListGroup.Item>
            </ListGroup>}
        </>

    );
}

export default OrderSummary;