import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import productsReducer from "./productsReducer";
import statusReducer from "./statusReducer";
import cartProductsReducer from "./cartProductsReducer";
import deliveryReducer from "./deliveryReducer";
import clientReducer from "./clientReducer";
import userReducer from "./userReducer";

const subreducers = {
    products: productsReducer,
    cartProducts: cartProductsReducer,
    client: clientReducer,
    deliveries: deliveryReducer,
    status: statusReducer,
    user: userReducer,
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