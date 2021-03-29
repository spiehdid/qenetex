import { RouterState } from "connected-react-router"

import { TransactionsInterface } from "../redux/transactions/slice"

declare global {
  interface IRootState {
    router: RouterState<{}>
    transactions: TransactionsInterface
  }

  interface IAction<P = any> {
    type: string
    payload?: P
  }
}
