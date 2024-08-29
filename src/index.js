import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import 'react-day-picker/dist/style.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();


Kommunicate.init("APP_ID", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});
