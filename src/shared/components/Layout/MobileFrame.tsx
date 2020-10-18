import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';

import { themeVariables } from '../../theme';

const useStyles = makeStyles(() => ({
  mobileFrame: {
    position: 'relative',
    width: '360px',
    height: '640px',
    border: `16px ${themeVariables.colors.black} solid`,
    borderTopWidth: '60px',
    borderBottomWidth: '60px',
    borderRadius: '36px',

    '&:before': {
      content: '""',
      display: 'block',
      width: '60px',
      height: '5px',
      position: 'absolute',
      top: '-30px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#333',
      borderRadius: '10px',
    },

    '&:after': {
      content: '""',
      display: 'block',
      width: '35px',
      height: '35px',
      position: 'absolute',
      left: '50%',
      bottom: '-65px',
      transform: 'translate(-50%, -50%)',
      background: '#333',
      borderRadius: '50%',
    },
  },
}));

type Props = {
  children: ReactNode;
};

const MobileFrame = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.mobileFrame}>{children}</div>;
};

export default MobileFrame;
