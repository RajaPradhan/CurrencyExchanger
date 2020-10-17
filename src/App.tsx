import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { theme, ThemeMode } from './shared/theme';
import Layout from './shared/Layout';

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <Layout>
        <div></div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
