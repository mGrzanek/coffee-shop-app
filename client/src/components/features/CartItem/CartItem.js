import { ListGroup, Accordion, Form, Button } from "react-bootstrap";
import styles from "./CartItem.module.scss";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import WeightsForm from "../../features/WeightsForm/WeightsForm";
import AmountForm from "../../features/AmountForm/AmountForm";
import MessageToggler from "../../common/MessageToggler/MessageToggler";
import { getWeights } from "../../../redux/weightsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeCartProductThunk, updateCartProductThunk } from "../../../redux/cartProductsReducer";

const CartItem = ({productId, productName, productWeight, productAmount, productPrice, productSinglePrice, optionalMessage}) => {
    const weights = useSelector(getWeights);
    const dispatch = useDispatch();
     const [currentAmount, setCurrentAmount] = useState(productAmount);
    const [currentWeight, setCurrentWeight] = useState(productWeight);
    const [currentPrice, setCurrentPrice] = useState(productPrice);
    const [currentWeightMultiplier, setCurrentWeightMultiplier] = useState(null);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const multiplier = useCallback((newWeight) => weights.find(weight => weight.value === newWeight).multiplier, [weights]);

    useEffect(() => {
        if(weights.length > 0) setCurrentWeightMultiplier(multiplier(currentWeight));
    }, [weights, currentWeight, multiplier])

    const updateWeight = (newWeight) => {
        const newMultiplier = multiplier(newWeight);

        setCurrentWeight(newWeight);
        setCurrentWeightMultiplier(newMultiplier);

        const newPrice = productSinglePrice * newMultiplier * currentAmount;
        setCurrentPrice(newPrice);

        if(newPrice && !isNaN(newPrice) && !isNaN(newMultiplier) && !isNaN(newWeight)){
            dispatch(updateCartProductThunk({
                productId,
                productName,
                productAmount,
                productWeight: newWeight,
                productPrice: newPrice,
                productSinglePrice,
                optionalMessage,
            }));
        } else {
            setShowAlert(true);
            console.log("Wrong params!");
        }
    };

    const updateAmount = (amount) => {
        const newAmount = +amount;
        setCurrentAmount(newAmount);

        const newPrice = productSinglePrice * newAmount * currentWeightMultiplier;
        setCurrentPrice(newPrice);

        if(newPrice && !isNaN(newPrice) && currentWeightMultiplier && currentWeight && !isNaN(currentAmount) && currentAmount > 0 && currentAmount <= 10)
            dispatch(updateCartProductThunk({
                productId,
                productName,
                productAmount: amount,
                productWeight,
                productPrice: newPrice,
                productSinglePrice,
                optionalMessage,
            }));
    };

    const addMessage = () => {
        if(message && message.length > 0 && message.length < 100) 
            dispatch(updateCartProductThunk({
                productId,
                productName,
                productAmount,
                productWeight,
                productPrice,
                productSinglePrice,
                optionalMessage: message
            }));
        else {
            setShowAlert(true);
            console.log('Messege must be between 1 - 100 chars');
        }
    }

    const remove = () => {
        dispatch(removeCartProductThunk(productId));
    };

    return(
        <Accordion>
            <ListGroup.Item className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                <div className="d-flex justify-content-around align-items-center col-10 col-md-5 py-1">
                    <NavLink className={clsx(styles.cartTitle, "col-11 col-sm-10")} to={`/products/${productId}`}>{productName}</NavLink>
                    <div className={styles.price}>${currentPrice.toFixed(2)}</div>
                </div>
               <div className="d-flex justify-content-around align-items-center col-12 col-md-5 py-1">
                    <AmountForm className="col-5" currentAmount={currentAmount} setCurrentAmount={updateAmount} />
                    <WeightsForm weights={weights} activeWeight={currentWeight} setActiveWeight={updateWeight} />
                    <MessageToggler eventKey="0" />
                    <FontAwesomeIcon className="cartItemBtn" icon={faTrash} onClick={remove} />
               </div>
            </ListGroup.Item>
            <Accordion.Collapse eventKey="0">
                <Form.Group className="col-11 col-sm-8 col-md-6 p-0 mb-2 mx-auto">
                    <Form.Control 
                        as="textarea" 
                        rows={3} className="p-3" 
                        placeholder="Add your message here..." 
                        onChange={(e) => setMessage(e.target.value)} />
                    <Button variant="outline-light" className="btn-one w-100" onClick={addMessage}>Save</Button>
                </Form.Group>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default CartItem;