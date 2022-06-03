import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Component {...pageProps} />
    <ToastContainer position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      toastClassName={
        "relative flex bg-primary-dark shadow-lg p-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer text-white"
      }
    />
  </div>
}

export default MyApp
