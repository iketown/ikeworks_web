import { CodeSelection } from "./DynamicHLTypes";

export const createLineNumberId = (lineNumber: number) =>
  `${lineNumber * 1000}`;
export const createWordId = (lineNumber: number, wordIndex: number): string =>
  `${lineNumber * 1000 + wordIndex + 1}`;

export const isWordSelected = (
  codeSelections: CodeSelection[],
  currentSelection: CodeSelection,
  wordId: number | string
): { isSelected: boolean; selectionIndex: number; isTempSelected: boolean } => {
  let isSelected = false;
  let isTempSelected = false;
  let selectionIndex = -1;
  if (!codeSelections) return { isSelected, selectionIndex, isTempSelected };
  const { start: tempStart, end: tempEnd } = currentSelection;
  if (tempStart <= Number(wordId) && Number(wordId) <= tempEnd) {
    isTempSelected = true;
  }
  codeSelections.forEach((codeSelection, index) => {
    const { start, end } = codeSelection;
    if (start <= Number(wordId) && Number(wordId) <= end) {
      isSelected = true;
      selectionIndex = index;
    }
  });

  return { isSelected, selectionIndex, isTempSelected };
};

export const isWordSelectedSimple = (
  codeSelections: CodeSelection[],
  wordId: number | string
) => {
  let isSelected = false;
  if (!codeSelections) return isSelected;
  codeSelections.forEach((codeSelection, index) => {
    const { start, end } = codeSelection;
    if (start <= Number(wordId) && Number(wordId) <= end) {
      isSelected = true;
    }
  });
  return isSelected;
};
