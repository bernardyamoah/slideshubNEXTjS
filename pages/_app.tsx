import toast, { Toaster } from 'react-hot-toast';
import { AppProps } from 'next/app';
function App({ Component, pageProps }: AppProps) {
	return (
	  <>
		<Component {...pageProps} />
		<Toaster />
	  </>
	);
  }
  export default App;
