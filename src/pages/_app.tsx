import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import { AppProps } from "next/dist/shared/lib/router/router";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
