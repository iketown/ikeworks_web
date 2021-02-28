import { useRef } from "react";

export const useRenderCount = (moduleName: string) => {
  const renderCount = useRef(0);
  if (process.env.NODE_ENV === "development") {
    console.log(moduleName, "render", renderCount.current++);
  }
};
