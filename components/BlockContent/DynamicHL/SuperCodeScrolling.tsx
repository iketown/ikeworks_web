import { motion, useElementScroll, useTransform } from "framer-motion";
import Highlight, { defaultProps, PrismTheme } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import React, { useEffect, useRef } from "react";
import {
  codePad,
  dotFontSize,
  regularLineHeight,
  dotLineHeight,
} from "./SuperCodeConstants";
import { createWordId, isWordSelectedSimple } from "./dynamicHLHelpers";

interface SuperContainerI {
  codeString: string;
  codeSelections?: CodeSelection[];
  id: string;
  dots?: boolean;
}

const SuperContainer: React.FC<SuperContainerI> = ({
  codeString,
  codeSelections,
  id,
  dots,
}) => {
  const theme = nightOwl;
  return (
    <SuperCode
      {...{ codeString, theme, codeSelections, id, dots }}
      previewHeight={400}
    />
  );
};

interface SuperCodeI {
  codeString: string;
  theme?: PrismTheme;
  dots?: boolean;
  previewHeight: number;
  codeSelections?: CodeSelection[];
  selectedStyle?: React.CSSProperties;
}

const SuperCode: React.FC<SuperCodeI> = ({
  codeString,
  theme = nightOwl,
  previewHeight,
  dots,
  codeSelections,
  selectedStyle = {
    filter: "invert(100%)",
    background: "#223",
    boxShadow: "0 0 1rem #222",
  },
}) => {
  const lineCount = codeString.split("\n").length;
  const dotsHeight = dotLineHeight * lineCount + codePad * 2;
  const fullSizeHeight = regularLineHeight * lineCount + codePad * 2;
  const previewPct = previewHeight / fullSizeHeight;
  const bottomDotsOffset = previewHeight - previewPct * dotsHeight;

  const spanOffsets = useRef<{ [spanId: string]: number }>({});

  const previewRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useElementScroll(previewRef);
  const previewYOffset = useTransform(scrollYProgress, (y) => {
    const distanceToTravel = dotsHeight + bottomDotsOffset - previewHeight;
    return distanceToTravel * y;
  });
  const topDotsHeight = useTransform(scrollYProgress, (y) => {
    return y * dotsHeight;
  });
  useEffect(() => {
    if (!codeSelections?.length) return;
    const offsets = spanOffsets.current;
    const sortedCode = codeSelections.sort((a, b) => a.start - b.start);
    const { start } = sortedCode[0];
    const { end } = sortedCode[sortedCode.length - 1];
    const targetOffset = offsets[start];
    const startOffset = offsets[start];
    const endOffset = offsets[end];
    const previewTop = previewRef.current.scrollTop;
    const previewHeight = previewRef.current.clientHeight;
    const previewBottom = previewHeight + previewTop;
    if (
      previewTop < startOffset &&
      startOffset < previewBottom &&
      endOffset < previewBottom
      // all code is already in the window
    )
      return;
    // otherwise, scroll so the selection starts at the top of the window.
    previewRef.current.scrollTo({
      top: targetOffset - 20,
      behavior: "smooth",
    });
  }, [codeSelections]);

  const {
    plain: { backgroundColor },
  } = theme;

  const highlightedCode = (small?: boolean) => (
    <Highlight {...defaultProps} theme={theme} code={codeString} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={className}
            style={{
              ...style,
              padding: codePad,
              margin: 0,
              height: small ? dotsHeight : undefined,
              fontSize: small ? dotFontSize : undefined,
            }}
          >
            {tokens.map((line, lineIndex, arr) => {
              const { className, key, style } = getLineProps({
                line,
                key: lineIndex,
              });
              const lineId = (lineIndex + 1) * 1000;

              return (
                <div
                  key={lineId}
                  style={{
                    transformOrigin: "top left",
                    scale: small ? 0.5 : 1,
                    height: small ? dotLineHeight : undefined,
                  }}
                >
                  <div
                    id={`${lineId}`}
                    {...{ className, key }}
                    style={{
                      ...style,
                      display: "table-row",
                    }}
                  >
                    <span
                      ref={(r) => {
                        if (small || !r) return;
                        spanOffsets.current[lineId] = r.offsetTop;
                      }}
                      style={{
                        display: "table-cell",
                        textAlign: "right",
                        paddingRight: "1em",
                        opacity: 0.5,
                      }}
                    >
                      {lineIndex + 1}
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {line.map((token, key) => {
                        const { children, ...tokenProps } = getTokenProps({
                          token,
                          key,
                        });
                        const wordId = createWordId(lineIndex + 1, key);
                        const isSelected =
                          !small &&
                          isWordSelectedSimple(codeSelections, wordId);
                        const addSelectedStyles = isSelected
                          ? selectedStyle
                          : {};

                        const words = (
                          <span
                            id={wordId}
                            ref={(r) => {
                              if (small || !r) return;
                              spanOffsets.current[wordId] = r.offsetTop;
                            }}
                            {...tokenProps}
                            children={children}
                            style={{
                              ...tokenProps.style,
                              transition: ".5s all",
                              ...addSelectedStyles,
                            }}
                          />
                        );
                        const dotCode = (
                          <span
                            {...tokenProps}
                            children={`${children}`.replace(/\S/g, "·")}
                          />
                        );
                        return small && dots ? dotCode : words;
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );

  return (
    <div
      style={{
        backgroundColor,
        position: "relative",
        height: dotsHeight + bottomDotsOffset,
        width: "100%",
      }}
    >
      <motion.div
        // TOP DOTS
        style={{
          position: "absolute",
          zIndex: 10,
          height: topDotsHeight,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {highlightedCode(true)}
      </motion.div>
      <motion.div
        // SCROLLING FULL SIZE DOTS
        ref={previewRef}
        style={{
          position: "relative",
          zIndex: 20,
          top: 0,
          height: previewHeight,
          overflow: "scroll",
          y: previewYOffset,
          boxShadow: "0 0 10px #FFFFFF99",
          width: "100%",
        }}
      >
        {highlightedCode()}
      </motion.div>

      <div
        // BOTTOM DOTS
        style={{
          position: "absolute",
          width: "100%",
          height: dotsHeight,
          top: bottomDotsOffset,
        }}
      >
        {highlightedCode(true)}
      </div>
    </div>
  );
};

export default SuperContainer;
