import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import React, { useEffect, useRef, useState } from "react";

import { CodeContentI, CodeSelection } from "./CodePrismTypes";
import {
  isWordSelected,
  createLineNumberId,
  createWordId,
} from "./codePrismHelpers";

const CodePrism = React.forwardRef<HTMLDivElement, CodeContentI>(
  (props, ref) => {
    const {
      codeString,
      onSelect = (object) => {
        console.log(object);
      },
      theme = nightOwl,
      codeSelections,
      selectedStyle = {
        filter: "invert(100%)",
        background: "#223",
        boxShadow: "0 0 1rem #222",
      },
      selectedClassName = "selected",
      recordSelections,
      onDeleteSelection = () => alert("must assign onDeleteSelection function"),
    } = props;
    const [deleteMode, setDeleteMode] = useState(false);
    const selectionRef = useRef({ anchorId: "", focusId: "" });
    const tokenRefs = useRef({});
    const registerSelection = (e): CodeSelection => {
      if (!onSelect || !recordSelections) return;
      if (deleteMode) return;
      const targetId = e.target.id;
      const { anchorId, focusId } = selectionRef.current;
      if (!targetId && anchorId === focusId) return; // click to un-highlight
      if (!anchorId || !focusId) return; // maybe a whole line selection.
      const [anchorLine, anchorWord] = anchorId
        .split("-")
        .map((n) => Number(n));
      const [focusLine, focusWord] = focusId.split("-").map((n) => Number(n));
      if (!anchorWord || !focusWord) return;
      // isBackwards if selection starts at the end
      const isBackwards =
        anchorLine > focusLine ||
        (anchorLine === focusLine && anchorWord > focusWord);
      let startLine = anchorLine as number;
      let endLine = focusLine as number;
      let startWord = anchorWord as number;
      let endWord = focusWord as number;
      if (isBackwards) {
        [startLine, endLine] = [endLine, startLine];
        [startWord, endWord] = [endWord, startWord];
      }
      onSelect({ startLine, startWord, endLine, endWord });
    };

    useEffect(() => {
      // record selection to selectionRef
      if (typeof document === "undefined") return;
      if (!recordSelections) return;
      document.onselectionchange = function () {
        const selection = window.getSelection();
        const anchorId = selection.anchorNode?.parentElement.id;
        const focusId = selection.focusNode?.parentElement.id;
        console.log(selection);
        selectionRef.current = { anchorId, focusId };
      };
    }, []);

    return (
      <div
        ref={ref}
        onMouseUp={registerSelection}
        style={{ position: "relative" }}
      >
        {recordSelections && (
          <button
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 100,
              padding: "8px",
              cursor: "pointer",
              background: "white",
              border: "1px solid blue",
            }}
            onClick={() => setDeleteMode((old) => !old)}
          >
            {deleteMode ? <span>❌</span> : <span>✏️</span>}
          </button>
        )}

        <Highlight
          {...defaultProps}
          code={codeString}
          language="jsx"
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, lineIndex) => {
                const lineNumber = lineIndex + 1;
                const { style, key, className } = getLineProps({
                  line,
                  key: lineIndex,
                });
                const wholeLineSelected =
                  codeSelections?.findIndex(
                    (sel) =>
                      sel.endWord === Infinity && sel.startLine === lineNumber
                  ) > -1;
                return (
                  <div
                    className={className}
                    key={key}
                    style={{ ...style, display: "table-row" }}
                  >
                    <span
                      onClick={(e) => {
                        if (deleteMode) {
                          const selectionIndex = codeSelections?.findIndex(
                            (sel) =>
                              sel.endWord === Infinity &&
                              sel.startLine === lineNumber
                          );
                          onDeleteSelection(selectionIndex);
                        } else {
                          onSelect({
                            startLine: lineNumber,
                            endLine: lineNumber,
                            startWord: 0,
                            endWord: Infinity,
                          });
                        }
                      }}
                      style={{
                        display: "table-cell",
                        textAlign: "right",
                        paddingRight: "1em",
                        opacity: wholeLineSelected ? 1 : 0.5,
                        cursor: recordSelections ? "pointer" : "",
                      }}
                      id={createLineNumberId(lineNumber)}
                    >
                      {lineNumber}
                    </span>
                    {line.map((token, wordIndex) => {
                      const wordId = createWordId(lineNumber, wordIndex);
                      const { isSelected, selectionIndex } = isWordSelected(
                        codeSelections,
                        lineNumber,
                        wordIndex
                      );
                      const { children, className, key, style } = getTokenProps(
                        {
                          token,
                          key: wordIndex,
                        }
                      );
                      const addSelectedStyle = isSelected ? selectedStyle : {};
                      const addDeleteStyle =
                        isSelected && deleteMode
                          ? {
                              background: "#F00",
                              filter: "invert(0%)",
                              boxShadow: "none",
                            }
                          : {};

                      const addClassName = isSelected ? selectedClassName : "";
                      const dataId = lineNumber * 1000 + wordIndex;
                      return (
                        <span
                          id={wordId}
                          data-id={dataId}
                          onClick={() => {
                            if (isSelected && deleteMode)
                              onDeleteSelection(selectionIndex);
                          }}
                          {...{ children, key }}
                          style={{
                            ...style,
                            transition: ".5s all",
                            cursor:
                              isSelected && deleteMode ? "not-allowed" : "",
                            ...addSelectedStyle,
                            ...addDeleteStyle,
                          }}
                          className={`${className} ${addClassName}`}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    );
  }
);

export default CodePrism;
