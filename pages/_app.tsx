import { AnimateSharedLayout } from "framer-motion";
import { useRenderCount } from "../hooks/useRenderCount";
import "../styles/googFonts.css";
import "../styles/globals.css";
import "../components/BlockContent/prism.css";
import "../components/BlockContent/highlightPrism.css";
import DarkNav from "@components/Layout/DarkNav";

function MyApp({ Component, pageProps, router }) {
  useRenderCount("_app");
  const { layoutInfo } = pageProps;
  if (!layoutInfo) return <Component {...pageProps} />;
  return (
    // <AnimateSharedLayout>
    <DarkNav {...{ layoutInfo }}>
      <Component {...pageProps} />
    </DarkNav>
    // </AnimateSharedLayout>
  );
}

export default MyApp;
