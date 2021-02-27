import Highlight, { defaultProps, PrismTheme } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import React, { memo, useCallback, useRef } from "react";
import {
  codePad,
  dotFontSize,
  regularLineHeight,
  dotLineHeight,
} from "./SuperCodeConstants";
import { createWordId, isWordSelectedSimple } from "./dynamicHLHelpers";
import SuperCodeScrolling from "./SuperCodeScrolling";

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
  id: string;
}

const SuperCode: React.FC<SuperCodeI> = ({
  codeString,
  theme = nightOwl,
  previewHeight,
  dots,
  id,
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
  const scrolling = fullSizeHeight > (dotsHeight + bottomDotsOffset) * 1.2;

  const spanOffsets = useRef<{ [spanId: string]: number }>({});

  if (scrolling)
    return (
      <SuperCodeScrolling
        {...{ codeString, theme, codeSelections, selectedStyle, id, dots }}
      />
    );

  const highlightedCode = useCallback(
    (small?: boolean) => (
      <Highlight
        {...defaultProps}
        theme={theme}
        code={codeString}
        language="jsx"
      >
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
                          const isSelected = isWordSelectedSimple(
                            codeSelections,
                            wordId
                          );

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
                          return words;
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
    ),
    [codeSelections]
  );

  return <div>{highlightedCode()}</div>;
};

const propsEqual = (prev: SuperContainerI, next: SuperContainerI) => {
  return prev.codeSelections === next.codeSelections;
};
const MemoSuper = memo(SuperContainer, propsEqual);

const SuperWithRef = React.forwardRef<HTMLDivElement, SuperContainerI>(
  (props, ref) => (
    <div ref={ref}>
      <MemoSuper {...props} />
    </div>
  )
);

export default SuperWithRef;
