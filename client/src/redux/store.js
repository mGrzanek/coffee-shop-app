import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import productsReducer from "./productsReducer";
import statusReducer from "./statusReducer";
import weightsReducer from "./weightsReducer";
import cartProductsReducer from "./cartProductsReducer";
import clientReducer from "./clientReducer";

const subreducers = {
    products: productsReducer,
    weights: weightsReducer,
    cartProducts: cartProductsReducer,
    client: clientReducer,
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