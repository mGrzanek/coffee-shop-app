import { API_URL } from "../config";
import { updateStatus } from "./statusReducer";

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
  return (dispatch) => {
    dispatch(updateStatus('pending'));
    fetch(`${API_URL}/api/auth/user`, {
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data));
        } else {
          dispatch(setUser(null));
        }
      })
      .catch((err) => {
        console.error('Fetch user error:', err);
        dispatch(setUser(null));
        dispatch(updateStatus('serverError'));
        dispatch(updateStatus('serverError'));
      });
  };
};

export const fetchUpdateUserData = (dataUser) => {
  return (dispatch) => {
    dispatch(updateStatus('pending'));
    const options = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    };
    fetch(`${API_URL}/api/auth/user/data`, options)
      .then(async res => {
        if(res.ok) {
          const data = await res.json();
          dispatch(setUser(data));
          dispatch(updateStatus('success'));
        } else if (res.status >= 400 && res.status < 500) dispatch(updateStatus('clientError'));
        else dispatch(updateStatus('serverError'));
      })
      .catch((err) => {
        console.error('fetchUpdateUserData error:', err);
        dispatch(updateStatus('serverError'));
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