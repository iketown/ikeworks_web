import { create } from "domain";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { CodeSelection } from "../components/BlockContent/DynamicHL";

interface ProjectCtxI {
  selectedCodeId: string;
  removeSelection: () => void;
  setSelection: (mark: TargetTriggerMarkI) => void;
  toggleSelection: (mark: TargetTriggerMarkI) => void;
  setHoldSelection: React.Dispatch<React.SetStateAction<boolean>>;
  cancelHoldSelection: () => void;
  blockRefs: React.MutableRefObject<{
    [line_id: string]: HTMLElement | HTMLDivElement;
  }>;
  codeSelections: CodeSelection[];
}

const errorFxn = () => {
  throw new Error("out of Project context!");
};

const ProjectContext = createContext<ProjectCtxI>({
  selectedCodeId: "",
  removeSelection: errorFxn,
  setSelection: errorFxn,
  toggleSelection: errorFxn,
  setHoldSelection: errorFxn,
  blockRefs: null,
  cancelHoldSelection: errorFxn,
  codeSelections: null,
});

export const ProjectCtxProvider: React.FC = ({ children }) => {
  const [selectedCodeId, setSelectedCodeId] = useState("");
  const [codeSelections, setCodeSelections] = useState(null);

  const [holdSelection, setHoldSelection] = useState(false); // clicking keeps the thing selected, prevents unselect onMouseOut

  const blockRefs = useRef<{ [line_id: string]: HTMLDivElement }>({}); // refs to all lines of code under key `${block_id}-${lineNumber}`

  const removeSelection = () => {
    if (holdSelection) return;
    setCodeSelections(null);
    setSelectedCodeId("");
  };
  const setSelection = (mark: TargetTriggerMarkI) => {
    if (holdSelection) return;
    setCodeSelections(mark.codeSelections);
    setSelectedCodeId(mark.block_key);
  };

  const toggleSelection = (mark: TargetTriggerMarkI) => {
    if (holdSelection) {
      cancelHoldSelection();
    } else {
      setHoldSelection(true);
      setSelection(mark);
    }
  };
  const cancelHoldSelection = () => {
    setHoldSelection(false);
    setCodeSelections(null);
    setSelectedCodeId("");
  };
  return (
    <ProjectContext.Provider
      value={{
        selectedCodeId,
        codeSelections,
        blockRefs,
        setSelection,
        removeSelection,
        toggleSelection,
        setHoldSelection,
        cancelHoldSelection,
      }}
      {...{ children }}
    />
  );
};

export const useProjectCtx = () => useContext(ProjectContext);
