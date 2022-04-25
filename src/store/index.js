import { createStore } from "redux";
import defaultReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
//export default createStore(reducer);

export default createStore(defaultReducer, composeWithDevTools());
//[preloadedSt]
