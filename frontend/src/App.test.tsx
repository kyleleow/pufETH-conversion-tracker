import { render } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('renders main app', () => {
  const queryClient = new QueryClient();
  const renderApp = () => render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );  
  expect(() => renderApp()).not.toThrow();
});
