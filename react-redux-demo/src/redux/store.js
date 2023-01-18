import {createStore} from "redux"
import cakeReducer  from './cake/cakeReducer'
import icecreamReducer  from './icecream/icecreamReducer'
import rootReducer from './rootReducer'

const store = createStore(rootReducer);


export default store;