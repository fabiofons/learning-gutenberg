import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import "./parent";
import { InnerBlocks } from "@wordpress/block-editor";

const attributes = {
  columns: {
    type: "number",
    default: 1
  }
};

registerBlockType("kili-blocks/row-section", {
  title: __("Row Section", "kili-bloks"),
  parent: ["kili-blocks/k-section"],
  category: "kili-blocks",
  supports: {
    html: false,
    reusable: false
  },
  keywords: [__("Row", "kili-blocks"), __("Kili", "kili-blocks")],
  edit,
  save: ({ attributes }) => {
    console.log(attributes);
    return (
      <div className={`content_inside_row_section`}>
        <InnerBlocks.Content />
      </div>
    );
  }
});
