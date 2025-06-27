import { API_URL } from "../config";

// selectors
export const getWeights = ({weights}) => weights;

// actions
const createActionName = (actionName) => `app/weights/${actionName}`;

const UPDATE_WEIGHTS = createActionName('UPDATE_WEIGHTS');

// action creators
export const updateWeights = payload => ({type: UPDATE_WEIGHTS, payload});

export const fetchWeights = () => {
    return(dispatch) => {
        try {
            fetch(`${API_URL}/api/weight`)
                .then(res => res.json())
                .then(weights => dispatch(updateWeights(weights)));
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