import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

// selectors
export const getAllProducts = ({products}) =>  products;
export const getProductById = ({products}, productId) => products.find(product => product.id === productId);

// actions
const createActionName = actionName => `app/products/${actionName}`;

const GET_PRODUCTS = createActionName('GET_PRODUCTS');

export const getProducts = payload => ({type: GET_PRODUCTS, payload});

export const fetchProducts = () => {
    return(dispatch) => {
        try {
            dispatch(updateStatus("pending"));
            fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(products => {
                dispatch(getProducts(Array.isArray(products) ? products : []));
                dispatch(updateStatus("success"));
            });
        } catch (err) {
            console.error('Fetch products error: ', err);
            dispatch(updateStatus("error"));
        }
    }
}

// action creators
const productsReducer = (statePart = [], action) => {
    switch(action.type){
        case GET_PRODUCTS: 
        return [...action.payload];
        default: 
        return statePart;
    }
}


export default productsReducer;