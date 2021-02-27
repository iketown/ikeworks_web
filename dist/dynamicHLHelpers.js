export const createLineNumberId = (lineNumber) => `${lineNumber * 1000}`;
export const createWordId = (lineNumber, wordIndex) => `${lineNumber * 1000 + wordIndex + 1}`;
export const isWordSelected = (codeSelections, wordId) => {
    let isSelected = false;
    let selectionIndex = -1;
    if (!codeSelections)
        return { isSelected, selectionIndex };
    codeSelections.forEach((codeSelection, index) => {
        const { start, end } = codeSelection;
        if (start <= Number(wordId) && Number(wordId) <= end) {
            isSelected = true;
            selectionIndex = index;
        }
    });
    return { isSelected, selectionIndex };
};
