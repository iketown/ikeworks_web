import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import React, { useEffect, useRef, useState } from "react";
import { CodeContentI, CodeSelection } from "./DynamicHLTypes";
import {
  isWordSelected,
  createLineNumberId,
  createWordId,
} from "./dynamicHLHelpers";
// import JTree from "react-json-tree";

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
    const [currentSelection, setCurrentSelection] = useState({
      start: 0,
      end: 0,
    });

    const registerSelection = () => {
      let { start, end } = currentSelection;
      if (end < start) [start, end] = [end, start];
      onSelect({ start, end });
      setCurrentSelection({ start: 0, end: 0 });
    };
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          overflow: "scroll",
          width: "50rem",
        }}
      >
        {recordSelections && (
          <div style={{ display: "flex" }}>
            <button
              style={{
                padding: "8px",
                background: "white",
                border: "1px solid blue",
                borderRadius: "10px",
              }}
              onClick={() => {
                registerSelection();
              }}
            >
              save selection
            </button>
            <button
              style={{
                marginLeft: "1rem",
                padding: "8px",
                background: deleteMode ? "red" : "white",
                border: "1px solid red",
                borderRadius: "10px",
                color: deleteMode ? "white" : "red",
              }}
              onClick={() => {
                setDeleteMode((old) => !old);
              }}
            >
              X
            </button>
          </div>
        )}

        <Highlight
          {...defaultProps}
          code={codeString}
          language="jsx"
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style }}>
              {tokens.map((line, lineIndex) => {
                const lineNumber = lineIndex + 1;
                const { style, key, className } = getLineProps({
                  line,
                  key: lineIndex,
                });
                const {
                  isSelected: lineNumberSelected,
                  isTempSelected: lineNumberTempSelected,
                } = isWordSelected(
                  codeSelections,
                  currentSelection,
                  lineNumber * 1000
                );
                const lineSelectedStyle = lineNumberSelected
                  ? { opacity: 1 }
                  : {};
                const lineTempStyle = lineNumberTempSelected
                  ? { opacity: 1, color: "#00FF0088" }
                  : {};
                return (
                  <div
                    className={className}
                    key={key}
                    style={{ ...style, display: "table-row" }}
                  >
                    <span
                      onMouseDown={() => {
                        if (!recordSelections) return;
                        setCurrentSelection({
                          start: lineNumber * 1000,
                          end: -1,
                        });
                      }}
                      onMouseUp={() => {
                        if (!recordSelections) return;
                        const lineId = lineNumber * 1000;
                        setCurrentSelection((old) => ({
                          start: old.start,
                          end: lineId + 999,
                        }));
                      }}
                      style={{
                        display: "table-cell",
                        textAlign: "right",
                        paddingRight: "1em",
                        opacity: 0.5,
                        cursor: recordSelections ? "pointer" : "",
                        ...lineSelectedStyle,
                        ...lineTempStyle,
                      }}
                    >
                      {lineNumber}
                    </span>

                    {line.map((token, wordIndex) => {
                      const wordId = createWordId(lineNumber, wordIndex);
                      const {
                        isSelected,
                        selectionIndex,
                        isTempSelected,
                      } = isWordSelected(
                        codeSelections,
                        currentSelection,
                        wordId
                      );
                      const { children, className, key, style } = getTokenProps(
                        {
                          token,
                          key: wordIndex,
                        }
                      );
                      const addSelectedStyle = isSelected ? selectedStyle : {};
                      const addTempStyle = isTempSelected
                        ? { background: "#00FF0088" }
                        : {};
                      const addDeleteStyle =
                        isSelected && deleteMode
                          ? {
                              background: "#F00",
                              filter: "invert(0%)",
                              boxShadow: "none",
                            }
                          : {};

                      const addClassName = isSelected ? selectedClassName : "";
                      return (
                        <span
                          id={wordId}
                          onClick={() => {
                            if (isSelected && deleteMode)
                              onDeleteSelection(selectionIndex);
                          }}
                          onMouseDown={() => {
                            if (!recordSelections) return;
                            setCurrentSelection({
                              start: Number(wordId),
                              end: -1,
                            });
                          }}
                          onMouseUp={() => {
                            if (!recordSelections) return;
                            setCurrentSelection((old) => ({
                              start: old.start,
                              end: Number(wordId),
                            }));
                          }}
                          {...{ children, key }}
                          style={{
                            ...style,
                            transition: ".5s all",
                            cursor:
                              isSelected && deleteMode ? "not-allowed" : "",
                            ...addSelectedStyle,
                            ...addTempStyle,
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
