import { CodeSelection } from "./CodePrismTypes";

export const createWordId = (lineNumber, wordIndex) =>
  `${lineNumber}-${wordIndex}`;

export const createLineNumberId = (lineNumber) => `${lineNumber}-wholeLine`;

export const isWordSelected = (
  codeSelections: CodeSelection[],
  lineNumber: number,
  wordIndex: number
): { isSelected: boolean; selectionIndex: number } => {
  let isSelected = false;
  let selectionIndex = -1;
  if (!codeSelections) return { isSelected, selectionIndex };

  codeSelections.forEach((codeSelection, index) => {
    const { startLine, startWord, endLine, endWord } = codeSelection;
    if (lineNumber < startLine || lineNumber > endLine) return;
    if (startLine === endLine) {
      // selection is on one line
      if (startWord <= wordIndex && wordIndex <= endWord) {
        selectionIndex = index;
        isSelected = true;
      }
      return;
    }
    // selection is multi-line
    if (startLine === lineNumber) {
      // word is on first line of selection
      if (wordIndex >= startWord) {
        selectionIndex = index;
        isSelected = true;
      }
      return;
    }
    if (endLine === lineNumber) {
      // word is on the last line of the selection;
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
