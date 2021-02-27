import classnames from "classnames";
import Link from "next/link";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";

const nextPrevAnchorClass =
  " pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer";

interface NextPrevBtnI {
  href: string;
  as: string;
  title?: string;
  disabled?: boolean;
}

export const PreviousButton: React.FC<NextPrevBtnI> = ({
  href,
  as,
  disabled,
  title,
}) => {
  return (
    <div className="-mt-px flex-1 flex ">
      {!disabled && (
        <div>
          <div className={nextPrevAnchorClass}>
            <HiArrowNarrowLeft className="mx-2 h-5 w-5 text-gray-400" />
            {title}
          </div>
        </div>
      )}
    </div>
  );
};

export const NextButton: React.FC<NextPrevBtnI> = ({
  href,
  as,
  disabled,
  title,
}) => {
  return (
    <div className="-mt-px flex-1  ">
      {!disabled && (
        <div
          className="flex flex-col align- "
          style={{ alignItems: "flex-end" }}
        >
          <div className={`${nextPrevAnchorClass}  `}>
            <small className="text-gray-400 mr-3">next:</small>
            {title}
            <HiArrowNarrowRight className="mx-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};
