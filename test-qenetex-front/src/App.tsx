import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";


import { store, history } from "./redux";
import Routes from "./routes";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
