import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/root-reducer";
import createSagaMiddleware from "redux-saga";
import { handleSaga } from "./handle-saga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(handleSaga);
