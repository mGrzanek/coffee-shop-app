import { updateLocalStorage } from "./updateLocalStorage";

// selectors 
export const getAllCartProducts = ({cartProducts}) => cartProducts;

// actions
const createActionName  = (actionName) => `app/cart/${actionName}`;

const GET_CART_PRODUCTS = createActionName('GET_CART_PRODUCTS');
const ADD_CART_PRODUCT = createActionName('ADD_CART_PRODUCT');
const UPDATE_CART_PRODUCT = createActionName('UPDATE_CART_PRODUCT');
const REMOVE_CART_PRODUCT = createActionName('REMOVE_CART_PRODUCT');
const REMOVE_ALL_PRODUCTS = createActionName('REMOVE_ALL_PRODUCTS');

// action creators
export const getCartProducts = payload => ({ type: GET_CART_PRODUCTS, payload });
export const addCartProduct = payload => ({ type: ADD_CART_PRODUCT, payload });
export const updateCartProduct = payload => ({ type: UPDATE_CART_PRODUCT, payload });
export const removeCartProduct = payload => ({ type: REMOVE_CART_PRODUCT, payload });
export const removeAllCartProducts = () => ({ type: REMOVE_ALL_PRODUCTS });

export const getCartProductsThunk = () => {
    return(dispatch) => {
        try {
            const storedData = localStorage.getItem("cartData");
            if(storedData) {
                const parsedData = JSON.parse(storedData);
                if (parsedData && Array.isArray(parsedData.cartProducts)) dispatch(getCartProducts(parsedData.cartProducts));
            }
        } catch (err) {
            console.error('getCartProductsThunk error: ', err);
        }     
    }
}

export const addCartProductThunk = (cartProduct) => {
    return(dispatch, getState) => {
        try {
            dispatch(addCartProduct(cartProduct));
            const updatedCartProducts = getState().cartProducts;
            updateLocalStorage(updatedCartProducts);
        } catch (err) {
            console.error('addCartProductThunk error: ', err);
        }
    }
}

export const updateCartProductThunk = (updatedProduct) => {
    return(dispatch, getState) => {
        try {
            dispatch(updateCartProduct(updatedProduct));
            const updatedCartProducts = getState().cartProducts;
            updateLocalStorage(updatedCartProducts);
        } catch (err) {
            console.error('addCartProductThunk error:', err);
        }
    }
}

export const removeCartProductThunk = (productToRemoveId) => {
    return(dispatch, getState) => {
        try {
            dispatch(removeCartProduct(productToRemoveId));
            const updatedCartProducts = getState().cartProducts;
            updateLocalStorage(updatedCartProducts);
        } catch(err)  {
            console.error('removeCartProductThunk error: ', err);
        }
    }
}

export const removeAllCartProductsThunk = () => {
    return(dispatch, getState) => {
        dispatch(removeAllCartProducts());
        try{
           const updatedCartProducts = getState().cartProducts;
            updateLocalStorage(updatedCartProducts);
        } catch(err) {
            console.error('removeAllCartProductsThunk error: ', err);
        }
    }
}

const cartProductsReducer = (statePart = [], action) => {
    switch(action.type) {
        case GET_CART_PRODUCTS:
            return [ ...action.payload ];
        case ADD_CART_PRODUCT:
            return [ ...statePart, { ...action.payload}];
        case UPDATE_CART_PRODUCT:
            return statePart.map(itemCart => itemCart.productId === action.payload.productId ? { ...itemCart, ...action.payload } : itemCart);
        case REMOVE_CART_PRODUCT: 
            return statePart.filter(itemCart => itemCart.productId !== action.payload);
        case REMOVE_ALL_PRODUCTS:
            return [];
        default:
            return statePart;
    }
}

export default cartProductsReducer;