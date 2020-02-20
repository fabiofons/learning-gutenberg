/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
// import { column as icon } from "@wordpress/icons";
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  InnerBlocks
} from "@wordpress/block-editor";
import {
  IconButton,
  Tooltip,
  Button,
  Dashicon,
  PanelRow,
  PanelBody
} from "@wordpress/components";

/**
 * Internal dependencies
 */

registerBlockType("kili-blocks/k-section", {
  title: __("Kili Section", "kili-blocks"),
  description: __(
    "Add section where you can create diferents sections for the main page",
    "kili-blocks"
  ),
  category: "kili-blocks",
  icon: "excerpt-view",
  keywords: [__("Section", "kili-blocks")],
  supports: {
    html: false,
    align: true,
    align: ["full", "wide"]
  },
  attributes: {
    id: {
      type: "string",
      default: ""
    },
    url: {
      type: "string",
      default: ""
    },
    alt: {
      type: "string",
      default: ""
    }
  },
  edit: ({ attributes, setAttributes }) => {
    const { id, url, alt } = attributes;
    const onSelectImage = ({ id, url, alt }) => {
      setAttributes({ id, url, alt });
    };
    const onRemoveImage = () => {
      setAttributes({
        id: null,
        url: null,
        alt: null
      });
    };
    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Background Settings", "kili-blocks")}>
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  value={id}
                  onSelect={img => onSelectImage(img)}
                  allowedTypes={["image"]}
                  render={({ open }) => {
                    return (
                      <IconButton
                        className="button--add_edit"
                        label={__(
                          `${url ? "Edit Image" : "Add Image"}`,
                          "kili-core"
                        )}
                        onClick={open}
                        icon="format-image"
                      />
                    );
                  }}
                />
              </MediaUploadCheck>
              {id && (
                <>
                  <Tooltip text={__("Remove Image", "kili-core")}>
                    <Button
                      className={"button--close"}
                      onClick={() => onRemoveImage()}
                    >
                      <Dashicon icon="no-alt" />
                    </Button>
                  </Tooltip>
                </>
              )}
            </PanelRow>
            <PanelRow>{url && <img src={url} alt={alt} />}</PanelRow>
          </PanelBody>
        </InspectorControls>
        <InnerBlocks />
      </>
    );
  },
  save: ({ attributes, className }) => {
    console.log("kili-section-save", attributes, className);
    return (
      <section>
        <InnerBlocks.Content />
      </section>
    );
  }
});
