import React from "react";
import JTree from "../../../utils/JTree";
import SuperCode from "./SuperCode";
import { useBlockCtx } from "../../../context/BlockCtx";

interface SuperCodeContainerI {
  node: {
    _key: string;
    _type: "code_block";
    code: {
      _type: "code";
      code: string;
      language: string;
    };
    dots?: boolean;
    title: string;
    filename?: string;
  };
}

const SuperCodeContainer: React.FC<SuperCodeContainerI> = ({ node }) => {
  const { code, title, filename, _key, dots } = node;
  const { codeSelections, selectedCodeId } = useBlockCtx();
  return (
    <div>
      {filename && (
        <div className="text-gray-400 font-mono text-right prose-sm mb-0">
          {filename}
        </div>
      )}
      <SuperCode
        codeSelections={selectedCodeId === _key ? codeSelections : null}
        codeString={code?.code || "code missing"}
        id={_key}
        dots={dots}
      />
    </div>
  );
};

export default SuperCodeContainer;
