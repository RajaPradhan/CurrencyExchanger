import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import ExchangeIcon from './ExchangeIcon';

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    padding: '0 15px',
  },
  itemContainer: {
    display: 'flex',
  },
  headerText: {
    paddingRight: '5px',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.headerContainer}>
      <Grid item xs={6} className={classes.itemContainer}>
        <Typography
          variant="h1"
          color="textPrimary"
          className={classes.headerText}
        >
          Exchange
        </Typography>
        <ExchangeIcon />
      </Grid>
    </Grid>
  );
};

export default Header;
