import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
const { RichText } = wp.blockEditor;
import "./parent";
import edit from "./edit";

const attributes = {
  title: {
    type: "string",
    source: "html",
    selector: "h4"
  },
  info: {
    type: "string",
    source: "html",
    selector: "p"
  },
  id: {
    type: "number"
  },
  alt: {
    type: "string",
    source: "attribute",
    selector: "img",
    attribute: "alt",
    default: ""
  },
  url: {
    type: "string",
    source: "attribute",
    selector: "img",
    attribute: "src"
  },
  social: {
    type: "array",
    default: [
      { link: "https://facebook.com", icon: "facebook" },
      { link: "https://twitter.com", icon: "twitter" }
    ]
  }
};

registerBlockType("kili-blocks/team-member", {
  title: __("Team Member", "kili-core"),
  description: __("Our block for Team member", "kili-core"),
  category: "layout",
  icon: "admin-users",
  parent: ["kili-blocks/team-members"],
  supports: {
    html: false,
    reusable: false
  },
  attributes,
  keywords: [__("Team", "kili-core"), __("Member", "kili-core")],
  edit,
  save: ({ attributes }) => {
    const { title, info, url, alt, id } = attributes;
    return (
      <div>
        {url && (
          <img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />
        )}
        {title && (
          <RichText.Content
            className="wp-block-kili-blocks-team-member__title"
            value={title}
            tagName={"h4"}
          />
        )}
        {info && (
          <RichText.Content
            className="wp-block-kili-blocks-team-member__info"
            value={info}
            tagName={"p"}
          />
        )}
      </div>
    );
  }
});
