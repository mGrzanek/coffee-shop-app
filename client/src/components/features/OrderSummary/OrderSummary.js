import { API_URL } from "../../../config";
import { ListGroup, Button } from "react-bootstrap";
import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { getStatus } from "../../../redux/statusReducer";
import { getClient } from "../../../redux/clientReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import ProductOrderItem from "../ProductOrderItem/ProductOrderItem";
import ClientOrderItem from "../../views/ClientOrderItem/ClientOrderItem";
import { useEffect, useState } from "react";
import styles from "./OrderSummary.module.scss";
import { updateClientThunk } from "../../../redux/clientReducer";
import { removeAllCartProductsThunk } from "../../../redux/cartProductsReducer";
import { updateStatus } from "../../../redux/statusReducer";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { fetchUser } from "../../../redux/userReducer";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client = useSelector(getClient);
    const products = useSelector(getAllCartProducts);
    const status = useSelector(getStatus);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentProducts, setCurrentProducts] = useState(null);
    const [currentDeliveryPrice, setCurrentDeliveryPrice] = useState(null);

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
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify(newOrder),
        };

        fetch(`${API_URL}/api/orders`, option)
             .then(res => {
                if (res.ok) {
                    dispatch(updateClientThunk(null));
                    dispatch(removeAllCartProductsThunk());
                    dispatch(fetchUser());
                    dispatch(updateStatus('success'));
                    navigate('/');
                } else if(res.status >= 400 && res.status < 500) dispatch(updateStatus("clientError"));
                else dispatch(updateStatus("serverError"))
            })
            .catch((err) => {
                console.error('Order error:', err);
                dispatch(updateStatus('serverError'));
            });
    }

    return(
        <>
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Invalid params." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {( !currentDeliveryPrice || !currentClient || !currentProducts || currentProducts.length === 0) 
                && <div className="p-5"><PageTitle>Summary not available</PageTitle></div>}
            {currentClient && currentProducts.length > 0 && <ListGroup>
                <ListGroup.Item className="summaryLabel d-flex justify-content-center">
                    <div>Order summary:</div>
                </ListGroup.Item>
                    {products.map(product => <ProductOrderItem key={product.id} {...product} />)}
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