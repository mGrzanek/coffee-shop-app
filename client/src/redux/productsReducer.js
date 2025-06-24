import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

// selectors


// actions
const createActionName = actionName => `app/request/${actionName}`;

const UPDATE_PRODUCTS = createActionName('UPDATE_PRODUCTS');

export const updateProducts = payload => ({type: UPDATE_PRODUCTS, payload});

export const fetchProducts = () => {
    return(dispatch) => {
        try {
            dispatch(updateStatus("pending"));
            fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(products => {
                dispatch(updateProducts(Array.isArray(products) ? products : []));
                dispatch(updateStatus(null));
            });
        } catch (err) {
            console.error('Fetch products error: ', err);
        }
    }
}


// action creators
const productsReducer = (statePart = [], action) => {
    switch(action.type){
        case UPDATE_PRODUCTS: 
        return [...action.payload];
        default: 
        return statePart;
    }
}


export default productsReducer;