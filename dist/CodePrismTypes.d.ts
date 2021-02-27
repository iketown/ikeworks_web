export interface CodeContentI {
    codeString: string;
    theme?: any;
    onSelect?: ({ startLine, endLine, startWord, endWord, }: {
        startLine: number;
        endLine: number;
        startWord: number;
        endWord: number;
    }) => void;
    codeSelections?: CodeSelection[];
    selectedClassName?: string;
    selectedStyle?: any;
    recordSelections?: boolean;
    onDeleteSelection?: (selectionIndex: number) => void;
}
export interface CodeSelection {
    startLine: number;
    endLine: number;
    startWord: number;
    endWord: number;
}
