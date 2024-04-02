import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from "@utils/nhost";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <NhostProvider nhost={nhost}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </NhostProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
