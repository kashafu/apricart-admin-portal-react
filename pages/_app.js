import { Slide, ToastContainer } from 'react-toastify'
import Cookies from 'universal-cookie';
import axios from 'axios'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  axios.defaults.headers.common['Authorization'] = 'Bearer' + cookies.get('cookies-token');
  return (
    <>
  <Component {...pageProps} />
  <ToastContainer/>
  </>
  )
}

export default MyApp
