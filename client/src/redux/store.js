import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import productsReducer from "./productsReducer";
import statusReducer from "./statusReducer";
import weightsReducer from "./weightsReducer";
import cartProductsReducer from "./cartProductsReducer";

const subreducers = {
    products: productsReducer,
    weights: weightsReducer,
    cartProducts: cartProductsReducer,
    status: statusReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
);

export default store;