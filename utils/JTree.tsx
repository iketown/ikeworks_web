import JSONTree from "react-json-tree";

interface JTreeI {
  data: any;
  hideRoot?: boolean;
  label?: string;
}

const JTree: React.FC<JTreeI> = ({ data, hideRoot = true, label }) => {
  if (!data) return <div className="bg-red-400">no data</div>;
  return (
    <div className="mx-4 relative">
      {label && (
        <div className="text-sm text-yellow-400 font-code absolute top-0 right-5">
          {label}
        </div>
      )}
      <JSONTree {...{ data, hideRoot }} />
    </div>
  );
};

export default JTree;
