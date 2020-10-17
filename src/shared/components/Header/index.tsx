import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import ThemeModeSwitcher from '../ThemeModeSwitcher';

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    padding: '0 15px',
  },
  themeModeSwitcherContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.headerContainer}>
      <Grid item xs={6}>
        <Typography variant="h1" color="textPrimary">
          Exchange
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.themeModeSwitcherContainer}>
        <ThemeModeSwitcher />
      </Grid>
    </Grid>
  );
};

export default Header;
