function generateID() {
  return (
    "--" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export default {
  columns: {
    type: "number",
    default: 1
  },
  viewportSize: {
    type: "string",
    default: "md"
  },
  containerSet: {
    type: "boolean",
    default: true
  },
  bgColor: {
    type: "string",
    default: ""
  },
  bgImg: {
    type: "string",
    default: ""
  },
  bgImgID: {
    type: "string",
    default: ""
  },
  bgImgSize: {
    type: "string",
    default: "cover"
  },
  bgImgPosition: {
    type: "string",
    default: "center center"
  },
  bgImgAttachment: {
    type: "string",
    default: "scroll"
  },
  bgImgRepeat: {
    type: "string",
    default: "no-repeat"
  },
  backgroundInline: {
    type: "bool",
    default: false
  },
  UUID: {
    type: "string",
    default: generateID()
  },
  bgStyle: {
    type: "string",
    default: ""
  }
};
