import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {App, AppProps} from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';


const apiURL = process.env.REACT_APP_API_URL as string;
const env = process.env.REACT_APP_ENV as string;
const props: AppProps = {
  apiURL: apiURL,
  env: env
};

console.log(apiURL);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
<QueryClientProvider client={queryClient}>
    <App {...props} />
</QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
