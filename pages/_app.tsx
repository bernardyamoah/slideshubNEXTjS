// pages/_app.js

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
function App({ Component, pageProps }: AppProps) {
	return (
	  <>
		<Component {...pageProps} />
		<ToastContainer />
	  </>
	);
  }
  export default App;
