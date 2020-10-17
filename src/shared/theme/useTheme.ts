import { useState } from 'react';
import { createMuiTheme, Theme } from '@material-ui/core';

import themeVariables from './themeVariables';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);

  const defaultTheme = createMuiTheme({
    palette: {
      type: mode,
      primary: {
        main: themeVariables.colors.blue,
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: '1.8rem',
        fontWeight: 400,
      },
    },
  });

  const [muiTheme, setMuiTheme] = useState<Theme>(defaultTheme);

  const setTheme = (theme: Theme) => setMuiTheme(theme);
  const setThemeMode = (themeMode: ThemeMode) => setMode(themeMode);

  return {
    theme: muiTheme,
    setTheme,
    themeMode: mode,
    setThemeMode,
    ThemeMode,
  };
};

export default useTheme;
