import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import { useState, useEffect, Fragment } from "@wordpress/element";

registerBlockType("kili-blocks/rlv2", {
  title: __("Row Layout", "kili-core"),
  description: __("Block made to build a layout", "kili-core"),

  edit:(props)=>{
    
    const [bgImg, setBgImg] = useState(initialState)
  }

})