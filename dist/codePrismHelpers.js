export const createWordId = (lineNumber, wordIndex) => `${lineNumber}-${wordIndex}`;
export const createLineNumberId = (lineNumber) => `${lineNumber}-wholeLine`;
export const isWordSelected = (codeSelections, lineNumber, wordIndex) => {
    let isSelected = false;
    let selectionIndex = -1;
    if (!codeSelections)
        return { isSelected, selectionIndex };
    codeSelections.forEach((codeSelection, index) => {
        const { startLine, startWord, endLine, endWord } = codeSelection;
        if (lineNumber < startLine || lineNumber > endLine)
            return;
        if (startLine === endLine) {
            if (startWord <= wordIndex && wordIndex <= endWord) {
                selectionIndex = index;
                isSelected = true;
            }
            return;
        }
        if (startLine === lineNumber) {
            if (wordIndex >= startWord) {
                selectionIndex = index;
                isSelected = true;
            }
            return;
        }
        if (endLine === lineNumber) {
            if (wordIndex <= endWord) {
                selectionIndex = index;
                isSelected = true;
            }
            return;
        }
        if (startLine < lineNumber && lineNumber < endLine) {
            selectionIndex = index;
            isSelected = true;
        }
    });
    return { isSelected, selectionIndex };
};
