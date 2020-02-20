import { Fragment, Component } from "@wordpress/element";
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
  IconButton,
  PanelRow,
  RangeControl
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import uniqueId from "react-html-id";

class RowLayoutEdit extends Component {
  constructor(props) {
    super(props);
    uniqueId.enableUniqueIds(this);
  }

  render() {
    const { attributes, setAttributes } = this.props;
    console.log("attributes", attributes);
    const {
      fullWidth,
      heightSection,
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
        bgImg: img.url,
        UUID: this.nextUniqueId(),
        bgStyle: createStyletag()
      });
    };

    const onRemoveImage = () => {
      setAttributes({
        bgImgID: null,
        bgImg: null,
        bgStyle: ""
      });
    };

    const createStyletag = () => {
      let styles = "";
      const bgStyles = `.wp-block-kili-blocks-row-layout${UUID}{`;
      if (bgImg) {
        styles += `background-image: url("${bgImg}");`;
        if (bgImgSize) {
          styles += ` background-size: ${bgImgSize};`;
        }
        if (bgColor) {
          styles += ` background-color: ${bgColor};`;
        }
        if (bgImgPosition) {
          styles += ` background-position: ${bgImgPosition};`;
        }
        if (bgImgRepeat) {
          styles += ` background-repeat: ${bgImgRepeat};`;
        }
        if (bgImgAttachment) {
          styles += ` background-attachment: ${bgImgAttachment};`;
        }
      }
      // este style se revisará para ver si es necesario.
      if (heightSection) {
        styles += `min-height: ${heightSection}px;`;
      }
      if (bgColor) {
        styles += `background-color: ${bgColor};`;
      }
      styles = styles ? `${bgStyles}${styles}}` : "{}";
      return styles;
    };

    const onChangeHeight = height => {
      setAttributes({
        heightSection: height,
        UUID: this.nextUniqueId(),
        bgStyle: createStyletag()
      });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Row Settings", "kili-core")}
            initialOpen={false}
          >
            <ToggleControl
              label="Background Full-Width"
              onChange={value =>
                setAttributes({
                  fullWidth: value,
                  bgStyle: createStyletag()
                })
              }
              checked={fullWidth}
            />
            <ToggleControl
              label="Content inside Container?"
              onChange={value =>
                setAttributes({
                  containerSet: value,
                  bgStyle: createStyletag()
                })
              }
              checked={containerSet}
            />
            <RangeControl
              label={__("Section Height (px)", "kili-core")}
              value={heightSection}
              onChange={value => onChangeHeight(value)}
              min={200}
              max={800}
            />
          </PanelBody>
          <PanelBody
            title={__("Backgroung Settings", "kili-core")}
            initialOpen={false}
          >
            {/* <advancedColorControl
            label={__("Background Color", "kili-core")}
            colorValue={bgColor ? bgColor : ""}
            colorDefault={""}
            onColorChange={value => setAttributes({ bgColor: value })}
          /> */}
            <PanelBody
              title={__("Background Image", "kili-core")}
              initialOpen={false}
            >
              <PanelRow>
                <MediaUploadCheck>
                  <MediaUpload
                    value={bgImgID}
                    onSelect={onSelectImage}
                    allowedTypes={["image"]}
                    render={({ open }) => {
                      return (
                        <IconButton
                          className="components-icon-button components-toolbar__control"
                          label={__(
                            `${bgImgID ? "Edit Image" : "Add Image"}`,
                            "kili-core"
                          )}
                          onClick={open}
                          icon="format-image"
                        />
                      );
                    }}
                  />
                </MediaUploadCheck>
                {bgImg && (
                  <>
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
                  </>
                )}
              </PanelRow>
              {bgImg && <img src={bgImg} />}
              {/* <Tooltip
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
                    onChange={value =>
                      setAttributes({ backgroundInline: value })
                    }
                    />
                  </Tooltip> */}
              {bgImg && (
                <Fragment>
                  <SelectControl
                    label={__("Background Image Size", "kili-core")}
                    value={bgImgSize}
                    options={[
                      { value: "cover", label: __("Cover", "kili-core") },
                      { value: "contain", label: __("Contain", "kili-core") },
                      { value: "auto", label: __("Auto", "kili-core") }
                    ]}
                    onChange={value =>
                      setAttributes({
                        bgImgSize: value,
                        bgStyle: createStyletag()
                      })
                    }
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
                    onChange={value =>
                      setAttributes({
                        bgImgPosition: value,
                        bgStyle: createStyletag()
                      })
                    }
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
                    onChange={value =>
                      setAttributes({
                        bgImgRepeat: value,
                        bgStyle: createStyletag()
                      })
                    }
                  />
                  <SelectControl
                    label={__("Background Image Attachment", "kili-core")}
                    value={bgImgAttachment}
                    options={[
                      { value: "scroll", label: __("Scroll", "kili-core") },
                      { value: "fixed", label: __("Fixed", "kili-core") },
                      { value: "parallax", label: __("Parallax", "kili-core") }
                    ]}
                    onChange={value =>
                      setAttributes({
                        bgImgAttachment: value,
                        bgStyle: createStyletag()
                      })
                    }
                  />
                </Fragment>
              )}
            </PanelBody>
            <PanelColorSettings
              initialOpen={false}
              title={__("Background color", "kili-core")}
              colorSettings={[
                {
                  label: __("Choose color", "kili-core"),
                  value: { bgColor },
                  onChange: bgColor =>
                    setAttributes({
                      bgColor,
                      bgStyle: createStyletag(),
                      UUID: this.nextUniqueId()
                    })
                }
              ]}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks />
      </>
    );
  }
}

export default RowLayoutEdit;
