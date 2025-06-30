import { updateLocalStorage } from "./updateLocalStorage";

// selectors
export const getClient = ({client}) =>  client;

// actions
const createActionName = actionName => `app/client/${actionName}`;

const UPDATE_CLIENT = createActionName('UPDATE_CLIENT');

export const updateClient = payload => ({type: UPDATE_CLIENT, payload});

export const updateClientThunk = (client) => {
    return(dispatch, getState) => {
        try {
            dispatch(updateClient(client));
            const updatedClient = getState().client;
            updateLocalStorage("client", updatedClient);
        } catch (err) {
            console.error('addCartProductThunk error: ', err);
        }
    }
}

export const getClientThunk = () => {
    return(dispatch) => {
        try {
            const storedData = localStorage.getItem("cartData");
            if(storedData) {
                const parsedData = JSON.parse(storedData);
                if( parsedData && parsedData.client) dispatch(updateClient(parsedData.client));
            }
        } catch(err) {
            console.error('getClientThunk error: ', err);
        }
    }
}

// action creators
const clientReducer = (statePart = null, action) => {
    switch(action.type){
        case UPDATE_CLIENT: 
            return action.payload;
        default: 
            return statePart;
    }
}


export default clientReducer;