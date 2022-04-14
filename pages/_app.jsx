import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { nhost } from "@utils/nhost";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
