import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App.jsx'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

console.log('Starting application...');
console.log('Clerk key:', clerkPubKey ? 'Present' : 'Missing');
console.log('Store:', store.getState());

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found!');
} else {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <ClerkProvider publishableKey={clerkPubKey}>
          <App />
        </ClerkProvider>
      </Provider>
    </StrictMode>,
  );
  console.log('Application rendered');
}
