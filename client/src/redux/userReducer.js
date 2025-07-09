import { API_URL } from "../config";

//selectors
export const getUser = ({user}) => user;


// actions
const createActionName = actionName => `app/user/${actionName}`;
const SET_USER = createActionName("SET_USER");
const LOG_OUT = createActionName("LOG_OUT");

// action creators
export const setUser = payload => ({type: SET_USER, payload});
export const logOut = payload => ({type: LOG_OUT, payload});

export const fetchUser = () => {
    return(dispatch) => {
        fetch(`${API_URL}/api/auth/profile`, {
            credentials: 'include',
        })
        .then(res => {
            if (res.ok) return res.json();
            else dispatch(setUser(null));
        })
        .then(data => {
            dispatch(setUser( data.userId ));
        })
        .catch(err => {
            console.error(err);
        });
    }
}

const userReducer = (statePart = null, action) => {
    switch(action.type){
        case SET_USER:
            return action.payload;
        case LOG_OUT: 
            return null;
        default: 
            return statePart;
    }
}

export default userReducer;