import { RouterProvider } from 'react-router'
import './App.css'
import router from './routes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient()

  return (
    <>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer/>
          </QueryClientProvider>
        </CookiesProvider>
    </>
  )
}

export default App
