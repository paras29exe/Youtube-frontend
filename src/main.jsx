import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/displayContext'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ContextProvider>
    </Router>
  </React.StrictMode>
)
