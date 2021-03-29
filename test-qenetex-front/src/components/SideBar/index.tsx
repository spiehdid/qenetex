import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { useHistory } from "react-router"

const drawerWidth = 240

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
})

const SideBar = () => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <List>
        <ListItem button onClick={() => history.push("/addresses")}>
          <ListItemText primary="Addresses" />
        </ListItem>
        <ListItem button onClick={() => history.push("/transactions")}>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default SideBar
