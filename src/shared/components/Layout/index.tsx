import React, { ReactNode } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import MobileFrame from './MobileFrame';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.mainContainer}>
      <MobileFrame>{children}</MobileFrame>
    </Grid>
  );
};

export default Layout;
