import { API_URL } from "../config";

// selectors
export const getAllDeliveries = ({deliveries}) => deliveries;
export const getDeliveryById = ({deliveries}, id) => deliveries.find(delivery => delivery.id === id);

// actions
const createActionName = actionName => `app/deliveries/${actionName}`;
const GET_DELIVERIES = createActionName("GET_DELIVERIES");

// action creators
export const getDeliveries = payload => ({ type: GET_DELIVERIES, payload });
export const getDeliveriesThunk = () => {
    return(dispatch) => {
        try{
            fetch(`${API_URL}/api/deliveries`)
                .then(res => res.json())
                .then(deliveries => dispatch(getDeliveries(Array.isArray(deliveries) ? deliveries : [])));
        } catch (err) {
            console.error('getDeliveriesThunk: ', err);
        }
    }
}

// reducer
const deliveryReducer = (statePart = [], action) => {
    switch(action.type) {
        case GET_DELIVERIES:
            return action.payload;
        default:
            return statePart;
    }
}

export default deliveryReducer;