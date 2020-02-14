import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
const { createElement } = wp.element;

registerBlockType("kili-blocks/kililayout", {
  title: __("Kili Layout", "kili-core"),
  description: __("Our block for Kili", "kili-core"),
  category: "kili-blocks",
  icon: "tagcloud",
  keywords: [__("kili", "kili-core")],
  edit: () => {
    return createElement("p", null, "Hola kili");
  },
  save: () => {
    return createElement("p", null, "Saved kili");
  }
});
