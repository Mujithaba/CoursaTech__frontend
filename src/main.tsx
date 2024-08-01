import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './redux/store.ts';
import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
    {/* <React.StrictMode> */}
      <App />
      <ToastContainer />
    {/* </React.StrictMode> */}
    </GoogleOAuthProvider>
  </Provider>
  </NextUIProvider>
)
