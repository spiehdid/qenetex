import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TTransaction, TUser } from "../../@types/transactions"

export interface TransactionsInterface {
  users: TUser[]
  transactions: TTransaction[]
}

const transactionsInitialState: TransactionsInterface = {
  users: [],
  transactions: []
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionsInitialState,
  reducers: {
    setTransactionsProperties: function <T extends keyof TransactionsInterface>(
      state: TransactionsInterface,
      {
        payload
      }: PayloadAction<{
        name: T
        value: TransactionsInterface[T]
      }>
    ) {
      state[payload.name] = payload.value
    }
  }
})

export const { setTransactionsProperties } = transactionsSlice.actions

export default transactionsSlice.reducer
