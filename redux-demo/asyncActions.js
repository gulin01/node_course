const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => dispatch(fetchUsersFailure(err.message)));
  };
};

// for an action creator thunkMiddleware enables to return an function that returns an object
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
