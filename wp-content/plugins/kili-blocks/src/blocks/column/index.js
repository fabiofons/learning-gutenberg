import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

registerBlockType("kili-blocks/k-column", {
  title: __("Kili Column", "kili-blocks"),
  parent: ["kili-blocks/k-section"],
  category: "kili-blocks",
  attributes: {
    columns: {
      type: "string",
      default: ""
    }
  },
  // supports: {
  //   html: false,
  //   reusable: false
  // }
  icon: "calendar",
  keywords: [__("Column", "kili-blocks"), __("Kili", "kili-blocks")],
  edit: props => {
    console.log("props column", props);
    return (
      <div className="kili-column-edit-space">
        <InnerBlocks />
      </div>
    );
  },
  save: ({ attributes }) => {
    const { columns } = attributes;
    return (
      <div className={`flexgrid__item --col-${columns}`}>
        <InnerBlocks.Content />
      </div>
    );
  }
});
