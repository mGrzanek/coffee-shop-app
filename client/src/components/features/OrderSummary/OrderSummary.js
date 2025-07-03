import { API_URL } from "../../../config";
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
    const products = useSelector(getAllCartProducts);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentProducts, setCurrentProducts] = useState(null);
    const [currentDeliveryPrice, setCurrentDeliveryPrice] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (client && products) {
            setCurrentClient(client);
            setCurrentProducts(products);
            setCurrentDeliveryPrice(client.deliveryPrice);
        }
    }, [client, products]);

    const productsPrice = products.map(product => product.productPrice).reduce((acc, productPrice) => {
        return acc + productPrice;
    }, 0);

    const totalPrice = productsPrice + currentDeliveryPrice;

    const orderSubmit = e => {
        e.preventDefault();
        const newOrder = {
            orderedProducts: products,
            productsPrice,
            deliveryId: client.deliveryMethod,
            totalPrice,
            clientName: client.firstName,
            clientSurname: client.lastName,
            clientPhone: client.phone,
            clientEmail: client.email,
            clientAddress: client.address,
        }
        console.log('newOrder', newOrder);  
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        };

        fetch(`${API_URL}/api/orders`, option)
             .then(async(res) => {
                if (res.ok) return res.json();
                else {
                    const errorText = await res.text(); 
                    console.error('Server validation error:', errorText);
                    throw new Error('Failed to send order');
                } 
                })
            .then(() => {
                dispatch(updateClientThunk(null));
                dispatch(removeAllCartProductsThunk());
                console.log('order sent');
                navigate('/');
            })
            .catch((err) => {
                console.error('Order error:', err);
                setShowAlert(true); 
            });
    }

    return(
        <>
            {( !currentDeliveryPrice || !currentClient || !currentProducts || currentProducts.length === 0) && <div>Summary not available</div>}
            {currentClient && currentProducts.length > 0 && <ListGroup>
                <ListGroup.Item className="summaryLabel d-flex justify-content-center">
                    <div>Order summary:</div>
                </ListGroup.Item>
                    {products.map(product => <ProductOrderItem key={product.productId} {...product} />)}
                <ClientOrderItem {...client} />
                <ListGroup.Item>
                    <div className="d-flex justify-content-between align-items-center col-11">
                        <div className={styles.delivery}>Delivery price:</div> 
                        <span className=" mx-md-4 mx-lg-5">{currentDeliveryPrice.toFixed(2)} $</span>
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