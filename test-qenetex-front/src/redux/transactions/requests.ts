import axios from "axios"

const userAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/users"
})

const transactionAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/transactions"
})

export const getAddresses = async () => (await userAPI.get(`/addresses`)).data

export const createAddress = async () => await userAPI.post(`/create`)

export const getTransactions = async (userAddress: undefined | string) =>
  (await transactionAPI.get(`/${userAddress ? `?address=${userAddress}` : ""}`)).data

export const createTransaction = async (userAddress: undefined | string) =>
  await transactionAPI.post(`/create${userAddress ? `?address=${userAddress}` : ""}`)
