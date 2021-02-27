interface NavInfo {
  pages: {
    page_slug: string;
    title: string;
    _id: string;
  }[];
  project_slug: string;
}

interface NavButton {
  final?: boolean;
  title: string;
  description?: string;
  stage?: PageStage;
  lastVisit?: string | false;
  project_slug: string;
  page_slug: string;
}

type PageStage = "upcoming" | "current" | "completed";

interface ProjectBasicInfo {
  project_slug: string;
  title: string;
}

interface LayoutInfo {
  projects: ProjectBasicInfo[];
  me: {
    avatar: any;
  };
}
