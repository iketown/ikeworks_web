import PortableText from "@sanity/block-content-to-react";
import React from "react";
import { motion } from "framer-motion";
import TargetTrigger from "./TargetTrigger";
import { useRouter } from "next/router";
import Link from "next/link";
import Highlight from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import SuperCodeContainer from "./DynamicHL/SuperCodeContainer";
import { BlockCtxProvider } from "../../context/BlockCtx";

const blockVariants = {
  hidden: { opacity: 0, y: 15, rotateX: 50 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, opacity: { duration: 1 } },
  },
};

const BlockRenderer = (props) => {
  // Fall back to default handling
  const { style = "normal" } = props.node;
  return (
    <motion.div variants={blockVariants}>
      {PortableText.defaultSerializers.types.block(props)}
    </motion.div>
  );
};

const serializers = {
  types: {
    block: BlockRenderer,
    code_block: SuperCodeContainer,
  },
  marks: {
    target_trigger: TargetTrigger,
    trigger: TargetTrigger,
    code: (props) => (
      <span className="text-gray-800 bg-gray-50 font-code">
        {props.children}
      </span>
    ),
    link: ({ children, mark }) => {
      const { href, new_window } = mark;
      if (new_window)
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      return <a href={href}>{children}</a>;
    },
    internal_link: ({ children, mark }) => {
      console.log("internal link", { mark });
      const { page_slug, project_slug } = mark;
      // return <a>{children}</a>;
      let href = `/dev/[project_slug]${page_slug ? `/[page_slug]` : ""}`;
      let as = `/dev/${project_slug}${page_slug ? "/" + page_slug : ""}${""}`;

      return (
        <Link {...{ href, as }}>
          <a>{children}</a>
        </Link>
      );
    },
    root_link: ({ children, mark }) => {
      console.log("root link", mark);
      const { as, href, className } = mark;
      return (
        <Link {...{ as, href }}>
          <a className={className}>{children}</a>
        </Link>
      );
    },
  },
};

const BlockContent = ({ blocks }) => {
  const { query } = useRouter();
  const { project_slug } = query;
  return (
    <BlockCtxProvider>
      <PortableText
        blocks={blocks}
        serializers={serializers}
        projectId={"iq4ljxqp"}
        dataset="production"
      />
    </BlockCtxProvider>
  );
};

export default BlockContent;
