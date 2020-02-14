import { useState, useEffect, Fragment } from "@wordpress/element";
import {
  InspectorControls,
  InnerBlocks,
  MediaUpload,
  MediaUploadCheck,
  advancedColorControl,
  PanelColorSettings
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  Tooltip,
  Button,
  Dashicon,
  SelectControl,
  IconButton
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const createStyletag = values => {
  const { attributes } = values;
  const {
    bgImg,
    bgImgID,
    bgImgSize,
    bgImgPosition,
    bgImgRepeat,
    UUID
  } = attributes;
  let styles = "";
  const bgStyles = `wp-block-kili-blocks-row-layout${UUID}`;
  if (bgImg) {
    styles += `.${bgStyles} {background-image: url("${bgImg}");`;
    if (bgImgSize) {
      styles += ` background-size: ${bgImgSize};`;
    }
    if (bgImgPosition) {
      styles += ` background-position: ${bgImgPosition};`;
    }
    if (bgImgRepeat) {
      styles += ` background-repeat: ${bgImgRepeat};`;
    }
  }
  styles = styles ? `${styles}}` : "{}";
  return styles;
};

const RowLayoutEdit = props => {
  console.warn(props);
  const { attributes, setAttributes } = props;
  const {
    containerSet,
    bgColor,
    bgImg,
    bgImgID,
    bgImgSize,
    bgImgPosition,
    bgImgRepeat,
    backgroundInline,
    bgImgAttachment,
    UUID
  } = attributes;

  const onSelectImage = img => {
    setAttributes({
      bgImgID: img.id,
      bgImg: img.url
    });
  };

  const onRemoveImage = () => {
    setAttributes({
      bgImgID: null,
      bgImg: null
    });
  };

  setAttributes({ bgStyle: createStyletag(props) });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Local Settings", "kili-core")}>
          <ToggleControl
            label="Container Class"
            onChange={value => setAttributes({ containerSet: value })}
            checked={containerSet}
          />
        </PanelBody>
        <PanelBody title={__("Backgroung Settings", "kili-core")}>
          <PanelColorSettings
            title={__("Background color", "kili-core")}
            colorSettings={[
              {
                label: __("Choose color", "kili-core"),
                value: { bgColor },
                onChange: bgColor => setAttributes({ bgColor })
              }
            ]}
          />
          {/* <advancedColorControl
            label={__("Background Color", "kili-core")}
            colorValue={bgColor ? bgColor : ""}
            colorDefault={""}
            onColorChange={value => setAttributes({ bgColor: value })}
          /> */}
          <MediaUploadCheck>
            <MediaUpload
              value={bgImgID}
              onSelect={onSelectImage}
              allowedTypes={["image"]}
              render={({ open }) => {
                return (
                  <IconButton
                    className="components-icon-button components-toolbar__control"
                    label={__("Edit Image", "kili-code")}
                    onClick={open}
                    icon="format-image"
                  />
                );
              }}
            />
          </MediaUploadCheck>
          {bgImg && (
            <Fragment>
              <Tooltip text={__("Remove Image", "kili-core")}>
                <Button
                  className={
                    "components-button components-icon-button kt-remove-img kt-cta-upload-btn"
                  }
                  onClick={onRemoveImage}
                >
                  <Dashicon icon="no-alt" />
                </Button>
              </Tooltip>
              <Tooltip
                text={__(
                  "Some Lazyloads only support this type of background images.",
                  "kili-core"
                )}
              >
                <ToggleControl
                  label={__("Force Background Image inline?", "kili-core")}
                  checked={
                    undefined !== backgroundInline ? backgroundInline : false
                  }
                  onChange={value => setAttributes({ backgroundInline: value })}
                />
              </Tooltip>
              <SelectControl
                label={__("Background Image Size", "kili-core")}
                value={bgImgSize}
                options={[
                  { value: "cover", label: __("Cover", "kili-core") },
                  { value: "contain", label: __("Contain", "kili-core") },
                  { value: "auto", label: __("Auto", "kili-core") }
                ]}
                onChange={value => setAttributes({ bgImgSize: value })}
              />
              <SelectControl
                label={__("Background Image Position")}
                value={bgImgPosition}
                options={[
                  {
                    value: "center top",
                    label: __("Center Top", "kili-core")
                  },
                  {
                    value: "center center",
                    label: __("Center Center", "kili-core")
                  },
                  {
                    value: "center bottom",
                    label: __("Center Bottom", "kili-core")
                  },
                  {
                    value: "left top",
                    label: __("Left Top", "kili-core")
                  },
                  {
                    value: "left center",
                    label: __("Left Center", "kili-core")
                  },
                  {
                    value: "left bottom",
                    label: __("Left Bottom", "kili-core")
                  },
                  {
                    value: "right top",
                    label: __("Right Top", "kili-core")
                  },
                  {
                    value: "right center",
                    label: __("Right Center", "kili-core")
                  },
                  {
                    value: "right bottom",
                    label: __("Right Bottom", "kili-core")
                  }
                ]}
                onChange={value => setAttributes({ bgImgPosition: value })}
              />
              <SelectControl
                label={__("Background Image Repeat", "kili-core")}
                value={bgImgRepeat}
                options={[
                  {
                    value: "no-repeat",
                    label: __("No Repeat", "kili-core")
                  },
                  { value: "repeat", label: __("Repeat", "kili-core") },
                  {
                    value: "repeat-x",
                    label: __("Repeat-x", "kili-core")
                  },
                  { value: "repeat-y", label: __("Repeat-y", "kili-core") }
                ]}
                onChange={value => setAttributes({ bgImgRepeat: value })}
              />
              <SelectControl
                label={__("Background Image Attachment", "kili-core")}
                value={bgImgAttachment}
                options={[
                  { value: "scroll", label: __("Scroll", "kili-core") },
                  { value: "fixed", label: __("Fixed", "kili-core") },
                  { value: "parallax", label: __("Parallax", "kili-core") }
                ]}
                onChange={value => setAttributes({ bgImgAttachment: value })}
              />
            </Fragment>
          )}
        </PanelBody>
      </InspectorControls>
      <InnerBlocks />
    </>
  );
};

export default RowLayoutEdit;
