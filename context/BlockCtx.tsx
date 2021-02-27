import { create } from "domain";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { CodeSelection } from "../components/BlockContent/DynamicHL";

interface BlockCtxI {
  selectedCodeId: string;
  codeSelections: CodeSelection[];
  removeSelection: () => void;
  setSelection: (mark: TargetTriggerMarkI) => void;
}

const errorFxn = () => {
  throw new Error("out of Project context!");
};

const BlockContext = createContext<BlockCtxI>({
  selectedCodeId: "",
  codeSelections: null,
  removeSelection: errorFxn,
  setSelection: errorFxn,
});

export const BlockCtxProvider: React.FC = ({ children }) => {
  const [selectedCodeId, setSelectedCodeId] = useState("");
  const [codeSelections, setCodeSelections] = useState(null);

  const removeSelection = () => {
    setCodeSelections(null);
    setSelectedCodeId("");
  };
  const setSelection = (mark: TargetTriggerMarkI) => {
    setCodeSelections(mark.codeSelections);
    setSelectedCodeId(mark.block_key);
  };

  return (
    <BlockContext.Provider
      value={{
        selectedCodeId,
        codeSelections,
        setSelection,
        removeSelection,
      }}
      {...{ children }}
    />
  );
};

export const useBlockCtx = () => useContext(BlockContext);
