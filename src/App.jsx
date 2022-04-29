import React from 'react';

import { Container } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MainPage } from './components/pages/main-page'

function App() {
  return (
    <Container maxWidth="md">
      <MainPage />
    </Container>
  );
}

export default App;
