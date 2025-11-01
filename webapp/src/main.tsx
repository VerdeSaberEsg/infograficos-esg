import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './pages/AppShell';
import InputPage from './pages/InputPage';
import AlertsPage from './pages/AlertsPage';
import AllDataPage from './pages/AllDataPage';
import { LookupProvider } from './services/LookupContext';
import './styles/globals.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <InputPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'dados', element: <AllDataPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LookupProvider>
        <RouterProvider router={router} />
      </LookupProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
