export type TUser = {
  address: string
  incoming_transactions: number
  outgoing_transactions: number
}

export type TTransaction = {
  id: number
  address_from: string
  address_to: string
  date: Date
  amount: number
}
