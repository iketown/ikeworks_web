import { CodeSelection } from "./DynamicHLTypes";
export declare const createLineNumberId: (lineNumber: number) => string;
export declare const createWordId: (lineNumber: number, wordIndex: number) => string;
export declare const isWordSelected: (codeSelections: CodeSelection[], wordId: number | string) => {
    isSelected: boolean;
    selectionIndex: number;
};
