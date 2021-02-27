import React, { useEffect, useMemo, useRef, useState } from "react";

import { useBlockCtx } from "../../context/BlockCtx";

interface TargetTriggerI {
  mark: TargetTriggerMarkI;
}

const TargetTrigger: React.FC<TargetTriggerI> = ({ mark, children }) => {
  const { setSelection, removeSelection } = useBlockCtx();

  const triggerRef = useRef<HTMLAnchorElement>(null);

  const onFocus = () => {
    setSelection(mark);
  };
  const onBlur = () => {
    removeSelection();
  };
  const handleMouseOut = () => {
    const inFocus = document.activeElement === triggerRef.current;
    if (!inFocus) onBlur();
  };

  return (
    <a
      ref={triggerRef}
      tabIndex={1}
      className="hover:underline cursor-pointer font-semibold tooltip relative "
      style={{ color: "teal" }}
      onMouseOver={onFocus}
      onMouseOut={handleMouseOut}
      {...{ onFocus, onBlur }}
    >
      {children}
    </a>
  );
};

export default TargetTrigger;
