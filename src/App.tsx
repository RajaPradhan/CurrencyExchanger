import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { useTheme } from './shared/theme';
import Layout from './shared/components/Layout';
import Header from './shared/components/Header';
import Exchanger from './modules/Exchanger';
import { ExchangeProvider } from './modules/Exchanger/providers/ExchangeProvider';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Header />
        <ExchangeProvider>
          <Exchanger />
        </ExchangeProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
