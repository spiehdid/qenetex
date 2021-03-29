import { Route, Switch, Redirect } from "react-router-dom"

import Transactions from "./pages/Transactions"
import SideBar from "./components/SideBar"
import Addresses from "./pages/Addresses"

const Routes = () => (
  <>
    <SideBar />
    <div style={{ width: "calc(100vw - 240px)", position: "absolute", right: 0 }}>
      <Switch>
        <Route path="/transactions/:userAddress?" component={Transactions} />
        <Route path="/adresses" component={Addresses} />
        <Redirect to="/adresses" />
      </Switch>
    </div>
  </>
)

export default Routes
