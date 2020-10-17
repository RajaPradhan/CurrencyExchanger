import React from 'react';
import { makeStyles } from '@material-ui/core';

import SwitchIcon from './SwitchIcon';
import { themeVariables } from '../../theme';

const useStyles = makeStyles(() => ({
  switcherContainer: {
    position: 'absolute',
    top: '214px',
    left: '23px',
    border: `1px solid ${themeVariables.colors.lightGrey}`,
    borderRadius: '50%',
    height: '30px',
    width: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

type Props = {
  onClick: () => void;
};

const CurrencySwitcher = ({ onClick }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.switcherContainer} onClick={onClick}>
      <SwitchIcon fill={themeVariables.colors.blue} />
    </div>
  );
};

export default CurrencySwitcher;
