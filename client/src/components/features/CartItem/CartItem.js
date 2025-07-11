import { ListGroup, Accordion, Form, Button } from "react-bootstrap";
import styles from "./CartItem.module.scss";
import PropTypes from 'prop-types';
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import AmountForm from "../../features/AmountForm/AmountForm";
import MessageToggler from "../../common/MessageToggler/MessageToggler";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsReducer";
import { useCallback, useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { removeCartProductThunk, updateCartProductThunk } from "../../../redux/cartProductsReducer";
import { getStatus, updateStatus } from "../../../redux/statusReducer";

const CartItem = ({id, productId, productName, weightId, productWeight, productAmount, productPrice, productSinglePrice, optionalMessage}) => {
    const product = useSelector(state => getProductById(state, productId));
    const weights = useMemo(() => product?.weights || [], [product]);
    const status = useSelector(getStatus) 
    const dispatch = useDispatch();
    const [currentAmount, setCurrentAmount] = useState(productAmount);
    const [currentWeight, setCurrentWeight] = useState(productWeight);
    const [currentPrice, setCurrentPrice] = useState(productPrice);
    const [currentWeightId, setCurrentWeightId] = useState(weightId);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [message, setMessage] = useState(optionalMessage);
    const [activeKey, setActiveKey] = useState(null);

    const weight = useCallback((newWeight) => weights.find(item => item.value === newWeight), [weights]);

    useEffect(() => {
        if(weights.length > 0) {
            setCurrentWeightMultiplier(weight(currentWeight).multiplier);
            setCurrentWeight(weight(currentWeight).value);
            setCurrentWeightId(weight(currentWeight).id);
        }
    }, [weights, currentWeight, weight])

    const updateWeight = (newWeight) => {
        const newValue = weight(newWeight);
        const newMultiplier = newValue.multiplier;
        const newWeightId = newValue.id;

        setCurrentWeight(newWeight);
        setCurrentWeightMultiplier(newMultiplier);
        setCurrentWeightId(newWeightId)

        const newPrice = productSinglePrice * newMultiplier * currentAmount;
        setCurrentPrice(newPrice);

        if(newPrice && !isNaN(newPrice) && !isNaN(newMultiplier) && !isNaN(newWeight) && newWeightId){
            dispatch(updateCartProductThunk({
                id,
                productId,
                productAmount,
                weightId: newWeightId,
                productWeight: newWeight,
                productPrice: newPrice,
                productSinglePrice,
                optionalMessage,
            }));
        } else dispatch(updateStatus("clientError"));
    };

    const updateAmount = (amount) => {
        const newAmount = +amount;
        setCurrentAmount(newAmount);

        const newPrice = productSinglePrice * newAmount * currentWeightMultiplier;
        setCurrentPrice(newPrice);

        if(newPrice && !isNaN(newPrice) && currentWeightMultiplier && currentWeight && !isNaN(currentAmount) && currentAmount > 0 && currentAmount <= 10)
            dispatch(updateCartProductThunk({
                id,
                productId,
                productAmount: amount,
                weightId,
                productWeight,
                productPrice: newPrice,
                productSinglePrice,
                optionalMessage,
            }));
        else dispatch(updateStatus("clientError"));
    };

    const addMessage = () => {
        if(message && message.length > 0 && message.length <= 100) {
            dispatch(updateCartProductThunk({
                id,
                productId,
                productName,
                productAmount,
                weightId: currentWeightId,
                productWeight,
                productPrice,
                productSinglePrice,
                optionalMessage: message
            }));
            setActiveKey(null);
        } else dispatch(updateStatus("clientError"));
    }

    const remove = () => {
        dispatch(removeCartProductThunk(id));
    };

    return(
        <>
            {status === 'clientError' && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Invalid params." />}
            <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                <ListGroup.Item className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <div className="d-flex justify-content-around align-items-center col-10 col-md-5 py-1">
                        <NavLink className={clsx(styles.cartTitle, "col-11 col-sm-10")} to={`/products/${productId}`}>{productName}</NavLink>
                        <div className={styles.price}>${currentPrice.toFixed(2)}</div>
                    </div>
                   <div className="d-flex justify-content-around align-items-center col-12 col-md-5 py-1">
                        <AmountForm className="col-5" currentAmount={currentAmount} setCurrentAmount={updateAmount} />
                        <WeightsForm weights={weights} activeWeight={currentWeight} setActiveWeight={updateWeight} />
                        <MessageToggler eventKey="0" activeKey={activeKey} setActiveKey={setActiveKey}>
                            <FontAwesomeIcon className='cartItemBtn' icon={faPen} />
                        </MessageToggler>
                        <FontAwesomeIcon className="cartItemBtn" icon={faTrash} onClick={remove} />
                   </div>
                </ListGroup.Item>
                <Accordion.Collapse eventKey="0">
                    <Form.Group className="col-11 col-sm-8 col-md-6 p-0 mb-2 mx-auto">
                        <Form.Control 
                            as="textarea" 
                            rows={3} className="p-3" 
                            placeholder="Add your message here..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} />
                        <Button variant="outline-light" className="btn-one w-100" onClick={addMessage}>Save</Button>
                        <div className="small px-2 text-muted">Only 1- 100 chars</div>
                    </Form.Group>
                </Accordion.Collapse>
            </Accordion>
        </>
    );
}

CartItem.propTypes = {
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    weightId: PropTypes.string.isRequired,
    productWeight: PropTypes.number.isRequired,
    productAmount: PropTypes.number.isRequired,
    productPrice: PropTypes.number.isRequired,
    productSinglePrice: PropTypes.number.isRequired,
    optionalMessage: PropTypes.string,
}

export default CartItem;