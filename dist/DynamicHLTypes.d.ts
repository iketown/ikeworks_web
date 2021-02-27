export interface CodeContentI {
    codeString: string;
    theme?: any;
    onSelect?: ({ start, end }: {
        start: number;
        end: number;
    }) => void;
    codeSelections?: CodeSelection[];
    selectedClassName?: string;
    selectedStyle?: any;
    recordSelections?: boolean;
    onDeleteSelection?: (selectionIndex: number) => void;
}
export interface CodeSelection {
    start: number;
    end: number;
}
