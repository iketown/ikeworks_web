import React, { useState, useRef } from "react";
import DynamicHL from "./DynamicHL";
import { useProjectCtx } from "../../context/ProjectCtx";
import JTree from "../../utils/JTree";
import SuperCode2 from "./DynamicHL/SuperCode";

interface CodePrismContainerI {
  id: string;
  codeString: string;
  filename?: string;
}

const CodePrismContainer: React.FC<CodePrismContainerI> = ({
  codeString,
  id,
  filename,
}) => {
  const {
    blockRefs,
    codeSelections,
    selectedCodeId,
    cancelHoldSelection,
  } = useProjectCtx();

  return (
    <div className="flex justify-center" onClick={cancelHoldSelection}>
      <div>
        {filename && (
          <div className="text-gray-400 font-mono text-right prose-sm mb-0">
            {filename}
          </div>
        )}
        <SuperCode2
          {...{ codeString, id }}
          ref={(r) => {
            blockRefs.current[id] = r;
          }}
          codeSelections={selectedCodeId === id ? codeSelections : null}
        />
      </div>
    </div>
  );
};

export default CodePrismContainer;
