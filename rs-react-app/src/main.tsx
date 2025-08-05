import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from '@/App.tsx';
import ThemeProvider from '@/components/theme-provider.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
// import { store } from './redux/store';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.log('Root  element not found');
}
