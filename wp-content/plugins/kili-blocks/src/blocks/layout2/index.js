// import "./styles.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
const { RichText, BlockControls, AlignmentToolbar } = wp.blockEditor;
// import { RichText, BlockControls } from "@wordpress/block-editor";

registerBlockType("kili-blocks/kililayout2", {
  title: __("Kili Layout 2", "kili-core"),
  description: __("Our block for Kili 2", "kili-core"),
  category: "kili-blocks",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        d="M-74 29h48v48h-48V29zM0 0h24v24H0V0zm0 0h24v24H0V0z"
      />
      <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" />
    </svg>
  ),
  keywords: [__("kili2", "kili-core")],
  attributes: {
    content: {
      type: "string",
      source: "html",
      selector: "p"
    },
    align: {
      type: "string",
      default: ""
    }
  },
  edit: ({ className, attributes, setAttributes }) => {
    const { content, align } = attributes;
    const onChangeContent = content => {
      setAttributes({ content });
    };
    const onChangeAlign = newAlign => {
      setAttributes({ align: newAlign === undefined ? "" : newAlign });
    };
    return (
      <>
        <BlockControls>
          {content && content.length > 0 && (
            <AlignmentToolbar value={align} onChange={onChangeAlign} />
          )}
        </BlockControls>
        {console.log("classname", className)}
        <RichText
          tagName="p"
          className={align && `kili__align-${align}`}
          onChange={value => onChangeContent(value)}
          value={content}
        />
      </>
    );
  },
  save: ({ attributes }) => {
    const { content, align } = attributes;
    return (
      <RichText.Content
        className={align && `kili__align-${align}`}
        tagName="p"
        value={content}
      />
    );
  }
});
