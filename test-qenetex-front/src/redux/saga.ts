import { all } from "redux-saga/effects"

import transactionsSaga from "./transactions/sagas"

function* saga() {
  yield all([transactionsSaga()])
}

export default saga
