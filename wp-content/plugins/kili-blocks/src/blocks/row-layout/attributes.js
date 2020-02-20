export default {
  fullWidth: {
    type: "boolean",
    default: true
  },
  columns: {
    type: "number",
    default: 1
  },
  heightSection: {
    type: "number",
    source: "html",
    selector: "section",
    default: 200
  },
  viewportSize: {
    type: "string",
    default: "md"
  },
  containerSet: {
    type: "boolean",
    source: "html",
    selector: "section",
    default: true
  },
  bgColor: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgImg: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgImgID: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgImgSize: {
    type: "string",
    source: "html",
    selector: "section",
    default: "cover"
  },
  bgImgPosition: {
    type: "string",
    source: "html",
    selector: "section",
    default: "center center"
  },
  bgImgAttachment: {
    type: "string",
    source: "html",
    selector: "section",
    default: "scroll"
  },
  bgImgRepeat: {
    type: "string",
    source: "html",
    selector: "section",
    default: "no-repeat"
  },
  backgroundInline: {
    type: "bool",
    source: "html",
    selector: "section",
    default: false
  },
  UUID: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgStyle: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  }
};
