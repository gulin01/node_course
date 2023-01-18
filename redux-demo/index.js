const redux = require("redux");
const { createLogger } = require("redux-logger");
const { createStore, combineReducers, applyMiddleware } = require("redux");

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAMS";
const applyMiddleWare = applyMiddleware;

// Logger middleware keeps track of every action by tracking prev state and Initial state
const logger = createLogger();

// action is an object with type property
// action creator function that return a function
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function buyIceCreams() {
  return {
    type: BUY_ICECREAM,
    info: "ice cream redux action",
  };
}

// Reducers accepts state and type as an unput (prevState, action)=>return newState
// state of application
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamsState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamsState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// Redux store =>>
// one Store for the entire application
//  Holds Application state
// Allows access to state via getStat()
// Allows state to be updated via dispatch
// registers Listeners via subscribe
// handle unregistering of listeners via the function returned by subscribe(listener)

//  combineReducers combines multiple reducers into one
const rootReducer = combineReducers({
  cakeReducer,
  iceCreamReducer,
});
// store
// create redux store rootReducer as one reducer
// you can add applyMiddleWare as many as you want
const store = createStore(rootReducer, applyMiddleWare(logger));

console.log("Initial state", store.getState());
// setting up a listener to the store
// any time store updates we log the state to the console, subscribed to the state ,
// function fires of when state is updates
const unsubscribe = store.subscribe(() => {});

// store.subscribe() will run every time state is updated
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());
unsubscribe();
