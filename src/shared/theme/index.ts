import { createMuiTheme, Theme } from '@material-ui/core';

import themeVariables from './themeVariables';
import { ThemeMode } from './types';

const theme = (themeMode: ThemeMode): Theme => {
  const muiTheme = createMuiTheme({
    palette: {
      type: themeMode,
    },
  });

  return muiTheme;
};

export { theme, ThemeMode, themeVariables };
