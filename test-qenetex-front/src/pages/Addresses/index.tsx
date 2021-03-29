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
import { CREATE_USER, GET_USERS } from "../../redux/transactions/actions"
import { push } from "connected-react-router"

interface Column {
  id: "address" | "incoming_transactions" | "outgoing_transactions"
  label: ReactNode
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
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

export const Addresses = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const users = useSelector(state => state.transactions.users)

  useEffect(() => {
    dispatch({ type: GET_USERS })
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
      id: "address",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          Adress <AddCircleOutlineIcon style={{ cursor: "pointer" }} onClick={() => dispatch({ type: CREATE_USER })} />
        </div>
      )
    },
    { id: "incoming_transactions", label: "Incoming Transactions" },
    {
      id: "outgoing_transactions",
      label: "Outgoing Transactions"
    }
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
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(push("/transactions/" + user.address))}
                >
                  {columns.map(column => {
                    const value = user[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? column.format(value) : value}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Addresses
