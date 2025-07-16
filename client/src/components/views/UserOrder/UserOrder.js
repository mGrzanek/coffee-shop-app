import { ListGroup, Nav, Accordion } from "react-bootstrap";
import { useState } from "react";
import clsx from "clsx";
import styles from './UserOrder.module.scss';
import MessageToggler from "../../common/MessageToggler/MessageToggler";
import OrderDetail from "../OrderDetail/OrderDetail";
import ClientOrderItem from "../ClientOrderItem/ClientOrderItem";

const UserOrder = ({id, createdAt, totalPrice, status, clientName, clientSurname, clientAddress, clientEmail, clientPhone, ...orders}) => {
    const [activeKey, setActiveKey] = useState(null);
    return(
        <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
            <ListGroup.Item className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                <div className="d-flex justify-content-around align-items-center col-md-5 py-1">
                    <MessageToggler eventKey="0" activeKey={activeKey} setActiveKey={setActiveKey}>
                        <Nav.Link className={styles.orderNumber}>
                            {id}
                        </Nav.Link>
                    </MessageToggler>
                </div>
                <div className={clsx(styles.orderData,'d-flex justify-content-around align-items-center col-12 col-md-5 py-1')}>
                    <div>{createdAt.split('T')[0]}</div>
                    <div>$ {totalPrice}</div>
                    <div className="fst-italic fw-light">{status}</div>
                </div>
            </ListGroup.Item>
            <Accordion.Collapse eventKey="0">
                <div>
                    {orders.orderedProducts.map(orderedProduct => <OrderDetail key={orderedProduct.id} productName={orderedProduct.product.name} productAmount={orderedProduct.productAmount} 
                        productWeight={orderedProduct.weight.value} currentProductPrice={orderedProduct.productPrice} optionalMessage={orderedProduct.optionalMessage} productPrice={orderedProduct.productPrice} />)}
                    <ClientOrderItem firstName={clientName} lastName={clientSurname} phone={clientPhone} email={clientEmail} address={clientAddress.split(' ')} />
                </div>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default UserOrder;