import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import productsReducer from "./productsReducer";
import cartItemReducer from "./cartItemReducer";
import statusReducer from "./statusReducer";
import weightsReducer from "./weightsReducer";

const subreducers = {
    products: productsReducer,
    weights: weightsReducer,
    cartItems: cartItemReducer,
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