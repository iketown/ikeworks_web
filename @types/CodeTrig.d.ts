interface CodeSelection {
  start: number;
  end: number;
}

interface TargetTriggerMarkI {
  block_key: string;
  codeSelections: CodeSelection[];
  _key: string;
  _type: "target_trigger";
}
