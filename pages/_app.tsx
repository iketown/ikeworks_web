import { useRenderCount } from "../hooks/useRenderCount";
import "../styles/googFonts.css";
import "../styles/globals.css";
import "../components/BlockContent/prism.css";
import "../components/BlockContent/highlightPrism.css";
import DarkNav from "@components/Layout/DarkNav";
import { AppProps } from "next/app";
import { useEffect } from "react";
import * as gtag from "@utils/gtag";

function MyApp({ Component, pageProps, router }: AppProps) {
  useRenderCount("_app");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const handleRouteChange = (url: URL) => {
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  const { layoutInfo } = pageProps;
  if (!layoutInfo) return <Component {...pageProps} />;
  return (
    <DarkNav {...{ layoutInfo }}>
      <Component {...pageProps} />
    </DarkNav>
  );
}

export default MyApp;
