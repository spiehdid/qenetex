import createSagaMiddleware from "redux-saga";
import { createBrowserHistory, History } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import transactionsReducer from "./transactions/slice";
import saga from "./saga";

const actionArrayProcessing: Middleware<{}, IRootState> = ({
  dispatch,
}: {
  dispatch: (action: IAction) => void;
}) => (next: (action: IAction) => void) => (action: IAction | IAction[]) => {
  if (Array.isArray(action)) {
    action.map((el) => dispatch(el));
  } else {
    next(action);
  }
};

export const history: History<{}> = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const rootReducer = () =>
  combineReducers({
    router: connectRouter(history),
    transactions: transactionsReducer,
  });

export const store = configureStore({
  reducer: rootReducer(),
  middleware: [actionArrayProcessing, reactRouterMiddleware, sagaMiddleware],
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useSelector: TypedUseSelectorHook<IRootState> = useAppSelector;

sagaMiddleware.run(saga);
