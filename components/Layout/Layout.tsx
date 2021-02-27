import React from "react";

import DarkNav from "./DarkNav";

interface LayoutI {
  layoutInfo: LayoutInfo;
}
const Layout: React.FC<LayoutI> = ({ layoutInfo, children }) => {
  return (
    <div>
      <DarkNav {...{ layoutInfo }}>{children}</DarkNav>
    </div>
  );
};

export default Layout;
