import { useEffect, useState, ReactNode } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"

import { useSelector } from "../../redux"
import { useDispatch } from "react-redux"
import { CREATE_TRANSACTION, CREATE_USER, GET_TRANSACTIONS, GET_USERS } from "../../redux/transactions/actions"
import { TTransaction } from "../../@types/transactions"
import moment from "moment"
import { useParams } from "react-router"

interface Column {
  id: keyof TTransaction
  label: ReactNode
  minWidth?: number
  align?: "right"
  format?: (value: number | Date | string) => string
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh"
  },
  container: {
    height: "calc(100vh - 52px)"
  }
})

export const Transactions = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const transactions = useSelector(state => state.transactions.transactions)

  const { userAddress } = useParams<{ userAddress: undefined | string }>()

  useEffect(() => {
    dispatch({ type: GET_TRANSACTIONS, payload: { userAddress } })
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const columns: Column[] = [
    {
      id: "id",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          ID{" "}
          <AddCircleOutlineIcon
            style={{ cursor: "pointer" }}
            onClick={() => dispatch({ type: CREATE_TRANSACTION, payload: { userAddress } })}
          />
        </div>
      )
    },
    { id: "address_from", label: "From" },
    { id: "address_to", label: "To" },
    { id: "date", label: "Date", format: value => moment(value).format("DD/MM/YYYY h:mm:ss A") },
    { id: "amount", label: "Amount" }
  ]

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map(column => {
                    const value = transaction[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Transactions
