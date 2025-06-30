import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

// selectors
export const getWeights = ({weights}) => weights.sort((a, b) => {
    return a.value - b.value;
});

// actions
const createActionName = (actionName) => `app/weights/${actionName}`;

const UPDATE_WEIGHTS = createActionName('UPDATE_WEIGHTS');

// action creators
export const updateWeights = payload => ({type: UPDATE_WEIGHTS, payload});

export const fetchWeights = () => {
    return(dispatch) => {
        try {
            dispatch(updateStatus("pending"));
            fetch(`${API_URL}/api/weight`)
                .then(res => res.json())
                .then(weights => {
                    dispatch(updateWeights(weights));
                    dispatch(updateStatus("success"));
                });
                    
        } catch(err) {
            console.error('Fetch products error: ', err);
        }
        
    }
}

const weightsReducer = (statePart = [], action) => {
    switch(action.type){
        case UPDATE_WEIGHTS:
            return [ ...action.payload ];
        default:
            return statePart;
    }
}

export default weightsReducer;