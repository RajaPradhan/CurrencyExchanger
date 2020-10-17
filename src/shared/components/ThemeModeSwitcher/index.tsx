import React, { useState, useCallback, ChangeEvent } from 'react';
import { makeStyles, FormControlLabel, Switch } from '@material-ui/core';

import { useTheme } from '../../theme';

const useStyles = makeStyles((theme) => ({}));

const ThemeModeSwitcher = () => {
  const classes = useStyles();
  const { setThemeMode, ThemeMode } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      setChecked(checked);
      setThemeMode(ThemeMode.Dark);
    },
    [checked],
  );

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} name="mode" />}
      label="mode"
    />
  );
};

export default ThemeModeSwitcher;
