import { useRenderCount } from "../hooks/useRenderCount";
import "../styles/googFonts.css";
import "../styles/globals.css";
import "../components/BlockContent/prism.css";
import "../components/BlockContent/highlightPrism.css";
import DarkNav from "@components/Layout/DarkNav";
// import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { GA_TRACKING_ID, pageview, event } from "@utils/gtag";

function MyApp({ Component, pageProps, router }: AppProps) {
  useRenderCount("_app");

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      console.log("handleRouteChange", url);
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
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
