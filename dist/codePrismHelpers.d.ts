import { CodeSelection } from "./CodePrismTypes";
export declare const createWordId: (lineNumber: any, wordIndex: any) => string;
export declare const createLineNumberId: (lineNumber: any) => string;
export declare const isWordSelected: (codeSelections: CodeSelection[], lineNumber: number, wordIndex: number) => {
    isSelected: boolean;
    selectionIndex: number;
};
