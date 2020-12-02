import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
    footer:{
        backgroundColor:theme.palette.common.blue,
        width:"100%",
        zIndex:1302,
        position:"relative"
    },
    mainContainer:{
        position:"absolute"
    },
    link:{
        color:"white",
        fontFamily:"Arial",
        fontSize:"0.7rem",
        fontWeight:"bold"
    }
   
}))

const Footer=()=>{
    const classes=useStyles();
    return(
        <React.Fragment>
            <footer className={classes.footer}>
                <Grid container justify="center" className={classes.mainContainer}>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item className={classes.link}>
                                Home
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item className={classes.link}>
                                Account
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </footer>

        </React.Fragment>
    )
}

export default Footer;