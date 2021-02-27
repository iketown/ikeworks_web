import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import React, { useEffect, useRef, useState } from "react";
import { isWordSelected, createLineNumberId, createWordId, } from "./codePrismHelpers";
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
    const tokenRefs = useRef({});
    const registerSelection = (e) => {
        if (!onSelect || !recordSelections)
            return;
        if (deleteMode)
            return;
        const targetId = e.target.id;
        const { anchorId, focusId } = selectionRef.current;
        if (!targetId && anchorId === focusId)
            return;
        if (!anchorId || !focusId)
            return;
        const [anchorLine, anchorWord] = anchorId
            .split("-")
            .map((n) => Number(n));
        const [focusLine, focusWord] = focusId.split("-").map((n) => Number(n));
        if (!anchorWord || !focusWord)
            return;
        const isBackwards = anchorLine > focusLine ||
            (anchorLine === focusLine && anchorWord > focusWord);
        let startLine = anchorLine;
        let endLine = focusLine;
        let startWord = anchorWord;
        let endWord = focusWord;
        if (isBackwards) {
            [startLine, endLine] = [endLine, startLine];
            [startWord, endWord] = [endWord, startWord];
        }
        onSelect({ startLine, startWord, endLine, endWord });
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
            console.log(selection);
            selectionRef.current = { anchorId, focusId };
        };
    }, []);
    return (React.createElement("div", { ref: ref, onMouseUp: registerSelection, style: { position: "relative" } },
        recordSelections && (React.createElement("button", { style: {
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 100,
                padding: "8px",
                cursor: "pointer",
                background: "white",
                border: "1px solid blue",
            }, onClick: () => setDeleteMode((old) => !old) }, deleteMode ? React.createElement("span", null, "\u274C") : React.createElement("span", null, "\u270F\uFE0F"))),
        React.createElement(Highlight, Object.assign({}, defaultProps, { code: codeString, language: "jsx", theme: theme }), ({ className, style, tokens, getLineProps, getTokenProps }) => (React.createElement("pre", { className: className, style: style }, tokens.map((line, lineIndex) => {
            const lineNumber = lineIndex + 1;
            const { style, key, className } = getLineProps({
                line,
                key: lineIndex,
            });
            const wholeLineSelected = (codeSelections === null || codeSelections === void 0 ? void 0 : codeSelections.findIndex((sel) => sel.endWord === Infinity && sel.startLine === lineNumber)) > -1;
            return (React.createElement("div", { className: className, key: key, style: Object.assign(Object.assign({}, style), { display: "table-row" }) },
                React.createElement("span", { onClick: (e) => {
                        if (deleteMode) {
                            const selectionIndex = codeSelections === null || codeSelections === void 0 ? void 0 : codeSelections.findIndex((sel) => sel.endWord === Infinity &&
                                sel.startLine === lineNumber);
                            onDeleteSelection(selectionIndex);
                        }
                        else {
                            onSelect({
                                startLine: lineNumber,
                                endLine: lineNumber,
                                startWord: 0,
                                endWord: Infinity,
                            });
                        }
                    }, style: {
                        display: "table-cell",
                        textAlign: "right",
                        paddingRight: "1em",
                        opacity: wholeLineSelected ? 1 : 0.5,
                        cursor: recordSelections ? "pointer" : "",
                    }, id: createLineNumberId(lineNumber) }, lineNumber),
                line.map((token, wordIndex) => {
                    const wordId = createWordId(lineNumber, wordIndex);
                    const { isSelected, selectionIndex } = isWordSelected(codeSelections, lineNumber, wordIndex);
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
                    const dataId = lineNumber * 1000 + wordIndex;
                    return (React.createElement("span", Object.assign({ id: wordId, "data-id": dataId, onClick: () => {
                            if (isSelected && deleteMode)
                                onDeleteSelection(selectionIndex);
                        } }, { children, key }, { style: Object.assign(Object.assign(Object.assign(Object.assign({}, style), { transition: ".5s all", cursor: isSelected && deleteMode ? "not-allowed" : "" }), addSelectedStyle), addDeleteStyle), className: `${className} ${addClassName}` })));
                })));
        }))))));
});
export default CodePrism;
