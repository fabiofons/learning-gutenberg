import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import edit from "./edit";

registerBlockType("kili-blocks/k-column", {
  title: __("Kili-Column", "kili-blocks"),
  parent: ["kili-blocks/k-section"],
  category: "kili-blocks",
  attributes: {
    columns: {
      type: "string",
      default: ""
    },
    numberColT: {
      type: "number",
      default: 12
    },
    numberColM: {
      type: "number",
      default: 12
    },
    align: {
      type: "string",
      default: ""
    },
    topPaddingD: {
      type: "number",
      default: 0
    },
    leftPaddingD: {
      type: "number",
      default: 0
    },
    rightPaddingD: {
      type: "number",
      default: 0
    },
    bottomPaddingD: {
      type: "number",
      default: 0
    },
    topPaddingT: {
      type: "number",
      default: 0
    },
    leftPaddingT: {
      type: "number",
      default: 0
    },
    rightPaddingT: {
      type: "number",
      default: 0
    },
    bottomPaddingT: {
      type: "number",
      default: 0
    },
    topPaddingM: {
      type: "number",
      default: 0
    },
    leftPaddingM: {
      type: "number",
      default: 0
    },
    rightPaddingM: {
      type: "number",
      default: 0
    },
    bottomPaddingM: {
      type: "number",
      default: 0
    }
  },
  supports: {
    align: true,
    align: ["left", "center", "right"]
  },
  icon: "columns",
  keywords: [__("Column", "kili-blocks"), __("Kili", "kili-blocks")],
  edit,
  save: ({ attributes }) => {
    const { columns, numberColM, numberColT } = attributes;
    const createClass = att => {
      const {
        align,
        topPaddingD,
        bottomPaddingD,
        rightPaddingD,
        leftPaddingD
      } = att;
      let classes = "";

      if (topPaddingD) {
        classes += `padding-top__${topPaddingD} `;
      }
      if (bottomPaddingD) {
        classes += `padding-bottom__${bottomPaddingD} `;
      }
      if (leftPaddingD) {
        classes += `padding-left__${leftPaddingD} `;
      }
      if (rightPaddingD) {
        classes += `padding-right__${rightPaddingD} `;
      }
      switch (align) {
        case "left":
          classes += "justify-content__left ";
          break;
        case "center":
          classes += "justify-content__center ";
          break;
        case "right":
          classes += "justify-content__right ";
          break;
        default:
          "";
          break;
      }

      return classes;
    };

    const createBasis = (D, T, M) => {
      let value = "";
      if (D) {
        const fbasis = (Number(D) / 12) * 100;
        value += `medium--flex-basis__${fbasis} `;
      }
      if (T) {
        const fbasis = (Number(T) / 12) * 100;
        value += `small--flex-basis__${fbasis} `;
      }
      if (M) {
        const fbasis = (Number(M) / 12) * 100;
        value += `xsmall--flex-basis__${fbasis} `;
      }
      return value;
    };

    const className = createClass(attributes);
    const basis = createBasis(columns, numberColT, numberColM);
    return (
      <div className={`flexgrid__item ${basis}`}>
        <div className={`kili-column-inner ${className}`}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
});
