import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import React, { useEffect, useRef, useState } from "react";
import { isWordSelected, createLineNumberId, createWordId, } from "./dynamicHLHelpers";
const CodePrism = React.forwardRef((props, ref) => {
    const { codeString, onSelect = (object) => {
        console.log(object);
    }, theme = nightOwl, codeSelections, selectedStyle = {
        filter: "invert(100%)",
        background: "#223",
        boxShadow: "0 0 1rem #222",
    }, selectedClassName = "selected", recordSelections, onDeleteSelection = () => alert("must assign onDeleteSelection function"), } = props;
    const [deleteMode, setDeleteMode] = useState(false);
    const selectionRef = useRef({ anchorId: "", focusId: "" });
    const registerSelection = () => {
        if (!onSelect || !recordSelections)
            return;
        const { anchorId, focusId } = selectionRef.current;
        if (!anchorId || !focusId)
            return;
        let start = Number(anchorId);
        let end = Number(focusId);
        if (start > end) {
            [start, end] = [end, start];
        }
        onSelect({ start, end });
    };
    useEffect(() => {
        if (typeof document === "undefined")
            return;
        if (!recordSelections)
            return;
        document.onselectionchange = function () {
            var _a, _b;
            const selection = window.getSelection();
            const anchorId = (_a = selection.anchorNode) === null || _a === void 0 ? void 0 : _a.parentElement.id;
            const focusId = (_b = selection.focusNode) === null || _b === void 0 ? void 0 : _b.parentElement.id;
            selectionRef.current = {
                anchorId,
                focusId,
            };
        };
    }, []);
    return (React.createElement("div", { ref: ref, style: { position: "relative" } },
        recordSelections && (React.createElement("div", { style: { display: "flex" } },
            React.createElement("button", { style: {
                    padding: "8px",
                    background: "white",
                    border: "1px solid blue",
                    borderRadius: "10px",
                }, onClick: () => {
                    registerSelection();
                } }, "save selection"),
            React.createElement("button", { style: {
                    marginLeft: "1rem",
                    padding: "8px",
                    background: deleteMode ? "red" : "white",
                    border: "1px solid red",
                    borderRadius: "10px",
                    color: deleteMode ? "white" : "red",
                }, onClick: () => {
                    setDeleteMode((old) => !old);
                } }, "X"))),
        React.createElement(Highlight, Object.assign({}, defaultProps, { code: codeString, language: "jsx", theme: theme }), ({ className, style, tokens, getLineProps, getTokenProps }) => (React.createElement("pre", { className: className, style: style }, tokens.map((line, lineIndex) => {
            const lineNumber = lineIndex + 1;
            const { style, key, className } = getLineProps({
                line,
                key: lineIndex,
            });
            return (React.createElement("div", { className: className, key: key, style: Object.assign(Object.assign({}, style), { display: "table-row" }) },
                React.createElement("span", { id: createLineNumberId(lineNumber), style: {
                        display: "table-cell",
                        textAlign: "right",
                        paddingRight: "1em",
                    } }, lineNumber),
                line.map((token, wordIndex) => {
                    const wordId = createWordId(lineNumber, wordIndex);
                    const { isSelected, selectionIndex } = isWordSelected(codeSelections, wordId);
                    const { children, className, key, style } = getTokenProps({
                        token,
                        key: wordIndex,
                    });
                    const addSelectedStyle = isSelected ? selectedStyle : {};
                    const addDeleteStyle = isSelected && deleteMode
                        ? {
                            background: "#F00",
                            filter: "invert(0%)",
                            boxShadow: "none",
                        }
                        : {};
                    const addClassName = isSelected ? selectedClassName : "";
                    return (React.createElement("span", Object.assign({ id: wordId, onClick: () => {
                            if (isSelected && deleteMode)
                                onDeleteSelection(selectionIndex);
                        } }, { children, key }, { style: Object.assign(Object.assign(Object.assign(Object.assign({}, style), { transition: ".5s all", cursor: isSelected && deleteMode ? "not-allowed" : "" }), addSelectedStyle), addDeleteStyle), className: `${className} ${addClassName}` })));
                })));
        }))))));
});
export default CodePrism;
