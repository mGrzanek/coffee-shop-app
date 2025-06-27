import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

// selectors
export const getAllCartItems = ({cartItems}) => cartItems;

// actions
const createActionName = (name) => `app/cart-items/${name}`;

const UPDATE_CART_ITEMS = createActionName('UPDATE_CART_ITEMS');


// action creators
export const updateCartItem = payload => ({ type: UPDATE_CART_ITEMS, payload});

export const fetchCartItems = () => {
    return(dispatch) => {
        try {
            dispatch(updateStatus("pending"));
            fetch(`${API_URL}/cart/:cartId/cart-items`)
            .then(res => res.json())
            .then(cartItems => {
                dispatch(updateCartItem(Array.isArray(cartItems) ? cartItems : []));
                dispatch(updateStatus("success"));
            });
        } catch (err) {
            console.error("Fetch cart items: ", err);
        }
    }
}

const cartItemReducer = (statePart = [], action) => {
    switch(action.type){
        case UPDATE_CART_ITEMS: 
        return [ ...action.payload ];
        default:
            return statePart;
    }
}

export default cartItemReducer;