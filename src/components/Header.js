import React, { useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { List, ListItem, ListItemText } from "@material-ui/core";
import {Link} from "react-router-dom";

import routes from "../data/routes.json";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom:"1em",
  },
  title: {
    color: "white",
    textTransform: "none",
    fontFamily: "Roboto",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.drawer,
    opacity: 0.7,
    color:"white"
  },
  drawerItemSelected: {
    ...theme.typography.drawer,
    opacity: 1,
    color:"white",
    "& .MuiListItemText-root":{
      opacity:1
    }
  },
  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  appbar:{
    zIndex:theme.zIndex.modal+1
  }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawer = (
    <React.Fragment>
      <Drawer  open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)} classes={{ paper: classes.drawer }}>
          <div className={classes.toolbarMargin}/>
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              divider
              button
              component={Link}
              to={route.link}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
              selected={value === route.activeIndex}
              classes={{selected:classes.drawerItemSelected}}
            >
              <ListItemText
                className={classes.drawerItem
                }
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          {drawer}
          <Button className={classes.drawerIconContainer}>
            <Typography className={classes.title}>
              FHIR Data Resources
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      </ElevationScroll> 
      <div className={classes.toolbarMargin} />
     
    </React.Fragment>
  );
};

export default Header;
