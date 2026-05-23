import React from 'react'

import ReactDOM from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'

import App from './App'

import { queryClient } from '@/app/queryClient'

import { ThemeContextProvider } from '@/shared/theme/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>

    <ThemeContextProvider>

      <QueryClientProvider client={queryClient}>

        <App />

      </QueryClientProvider>

    </ThemeContextProvider>

  </React.StrictMode>,

)