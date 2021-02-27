import { useRef } from "react";

export const useRenderCount = (moduleName: string) => {
  const renderCount = useRef(0);
  console.log(moduleName, "render", renderCount.current++);
};
