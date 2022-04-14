import "../styles/globals.css";
import { NhostAuthProvider } from "@nhost/react-auth";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { nhost } from "utils/nhost";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<NhostAuthProvider nhost={nhost}>
			<NhostApolloProvider nhost={nhost}>
				{getLayout(<Component {...pageProps} />)}
				<Toaster />
			</NhostApolloProvider>
		</NhostAuthProvider>
	);
}

export default MyApp;
