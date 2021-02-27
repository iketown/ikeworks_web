import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

interface PageLinksI {
  page_numbers: number[];
  project_slug: string;
}
const ProjectPageLinks: React.FC<PageLinksI> = ({ page_numbers }) => {
  const { query } = useRouter();
  const { project_slug, page_num } = query;
  return (
    <div
      className={classnames(
        "max-w-screen-sm mx-auto flex justify-between my-6"
      )}
    >
      {page_numbers
        ?.filter((num, i, arr) => arr.findIndex((_num) => _num === num) === i)
        .map((num) => {
          const isCurrent = num === Number(page_num);
          return (
            <Link
              href="/dev/[project_slug]/[page_num]"
              as={`/dev/${project_slug}/${num}`}
            >
              <a
                className={classnames(
                  "border-blue-200 border p-2 text-sm rounded-md",
                  {
                    "bg-blue-600 text-white": isCurrent,
                    "text-blue-500": !isCurrent,
                  }
                )}
              >
                p.{num}
              </a>
            </Link>
          );
        })}
    </div>
  );
};

export default ProjectPageLinks;
