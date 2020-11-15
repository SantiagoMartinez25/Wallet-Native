import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../User";
import colorReducer from "../Estilos";
import cardsReducer from "../CardActions";

const rootReducer = combineReducers({
  user: userReducer,
  color: colorReducer,
  cardsReducer: cardsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
