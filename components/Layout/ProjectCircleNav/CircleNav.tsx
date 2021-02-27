import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageFlex from "./PageFlex";
import { InView } from "react-intersection-observer";
import moment from "moment";

const CircleNav: React.FC<NavInfo> = ({ pages, project_slug }) => {
  const { query } = useRouter();
  const { page_slug: current_page_slug } = query;
  const [locStorageAvail, setLocStorageAvail] = useState(false);

  useEffect(() => {
    const noLocStorage = typeof localStorage === "undefined";
    if (noLocStorage) return;
    setLocStorageAvail(true);
  }, []);

  const hasVisited = (pageId: string) => {
    if (!locStorageAvail) return;
    const visitDate = localStorage.getItem(pageId);
    if (!visitDate) return false;
    return moment(visitDate).fromNow();
  };

  const recordVisit = (pageId: string) => {
    if (!locStorageAvail) return;
    const visitDate = moment().format();
    localStorage.setItem(pageId, visitDate);
  };

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {pages?.map(({ page_slug, title, _id }, i) => {
          let stage: PageStage = "upcoming";
          // if there's no page_slug, you're on the first page.
          const isCurrentPage =
            page_slug === current_page_slug || (i === 0 && !current_page_slug);
          const lastVisit = isCurrentPage ? "you are here" : hasVisited(_id);
          if (lastVisit) {
            stage = "completed";
          }
          if (isCurrentPage) stage = "current";
          return (
            <InView
              key={_id}
              onChange={(inView) => {
                if (isCurrentPage && inView) {
                  recordVisit(_id);
                }
              }}
            >
              <div key={_id}>
                <PageFlex
                  stage={stage}
                  title={title}
                  lastVisit={lastVisit}
                  final={i + 1 === pages.length}
                  {...{ stage, title, lastVisit, page_slug, project_slug }}
                />
              </div>
            </InView>
          );
        })}
      </ol>
    </nav>
  );
};

export default CircleNav;
