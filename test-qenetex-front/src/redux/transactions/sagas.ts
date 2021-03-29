import { call, put, takeEvery } from "redux-saga/effects"

import * as reportsAPI from "./requests"
import { CREATE_TRANSACTION, CREATE_USER, GET_TRANSACTIONS, GET_USERS } from "./actions"
import { setTransactionsProperties } from "./slice"
import { TUser } from "../../@types/transactions"
import { PayloadAction } from "@reduxjs/toolkit"

function* getAddresses() {
  try {
    const response: TUser[] = yield call(reportsAPI.getAddresses)
    yield put(setTransactionsProperties({ name: "users", value: response }))
  } catch (error) {
    console.log(error)
  }
}

function* createAddress() {
  try {
    yield call(reportsAPI.createAddress)
    yield call(getAddresses)
  } catch (error) {
    console.log(error)
  }
}

function* getTransactions({ payload }: PayloadAction<{ userAddress: undefined | string }>) {
  try {
    const response: TUser[] = yield call(reportsAPI.getTransactions, payload.userAddress)
    yield put(setTransactionsProperties({ name: "transactions", value: response }))
  } catch (error) {
    console.log(error)
  }
}

function* createTransaction({ payload }: PayloadAction<{ userAddress: undefined | string }>) {
  try {
    yield call(reportsAPI.createTransaction, payload.userAddress)
    yield put({ type: GET_TRANSACTIONS, payload })
  } catch (error) {
    console.log(error)
  }
}

export default function* transactionsSaga() {
  yield takeEvery(GET_USERS, getAddresses)
  yield takeEvery(CREATE_USER, createAddress)
  yield takeEvery(GET_TRANSACTIONS, getTransactions)
  yield takeEvery(CREATE_TRANSACTION, createTransaction)
}
