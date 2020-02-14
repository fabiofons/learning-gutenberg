import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import attributes from "./attributes";

registerBlockType("kili-blocks/row-layout", {
  title: __("Row Layout", "kili-core"),
  description: __("Block made to build a layout", "kili-core"),
  icon: "layout",
  category: "kili-blocks",
  keywords: [__("Layout", "kili-core")],
  attributes,
  edit,
  // deprecated: [
  //   {
  //     attributes: {
  //       ...attributes,
  //       UUID: {
  //         type: "string",
  //         default: generateID()
  //       }
  //     }
  //   }
  // ],
  save(props) {
    const { attributes } = props;
    const { UUID, containerSet, bgStyle } = attributes;

    return (
      <section
        className={`wp-block-kili-blocks-row-layout${UUID} ${
          containerSet ? "container " : ""
        }`}
      >
        <InnerBlocks.Content />
        {bgStyle ? <style>{bgStyle}</style> : ""}
      </section>
    );
  }
});
