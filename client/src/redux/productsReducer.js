import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

// selectors
export const getAllProducts = ({products}) =>  products;
export const getProductById = ({products}, productId) => products.find(product => product.id === productId);

// actions
const createActionName = actionName => `app/products/${actionName}`;

const GET_PRODUCTS = createActionName('GET_PRODUCTS');
const LIKED_PRODUCT = createActionName('LIKED_PRODUCT');
const UNLIKED_PRODUCT = createActionName('UNLIKED_PRODUCT');

export const getProducts = payload => ({type: GET_PRODUCTS, payload});
export const likedProduct = payload => ({ type: LIKED_PRODUCT, payload});
export const unlikedProduct = payload => ({ type: UNLIKED_PRODUCT, payload});

export const fetchProducts = () => {
    return(dispatch) => {
        try {
            dispatch(updateStatus("pending"));
            fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(products => {
                dispatch(getProducts(Array.isArray(products) ? products : []));
                dispatch(updateStatus(null));
            });
        } catch (err) {
            console.error('Fetch products error: ', err);
            dispatch(updateStatus("serverError"));
        }
    }
}

export const fetchLikedProduct = (productData) => {
    return(dispatch) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(productData),
            };
            fetch(`${API_URL}/api/products/product/like`, options)
                .then(res => {
                    if(res.ok) dispatch(likedProduct(productData));
                })
        } catch (err) {
            console.err('Fetch liked products error: ', err);
            dispatch(updateStatus('serverError'));
        }
    }
}

export const fetchUnlikedProduct = (productData) => {
    return(dispatch) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(productData),
            };
            fetch(`${API_URL}/api/products/product/like`, options)
                .then(res => {
                    if(res.ok) dispatch(unlikedProduct(productData));
                })
        } catch (err) {
            console.err('Fetch unliked products error: ', err);
            dispatch(updateStatus('serverError'));
        }
    }
}

// action creators
const productsReducer = (statePart = [], action) => {
    switch(action.type){
        case GET_PRODUCTS: 
            return [...action.payload];
        case LIKED_PRODUCT:
            return statePart.map(product => product.id === action.payload.productId ? { ...product, users: [ ...product.users, { id: action.payload.userId}]} : product);
        case UNLIKED_PRODUCT:
            return statePart.map(product => 
                product.id === action.payload.productId ? { ...product, users: product.users.filter(user => user.id !== action.payload.userId)} : product);
        default: 
            return statePart;
    }
}


export default productsReducer;