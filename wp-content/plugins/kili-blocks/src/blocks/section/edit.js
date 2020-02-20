import { InnerBlocks } from "@wordpress/block-editor";
import { useState, useEffect, Fragment } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";
import { withState } from "@wordpress/compose";

const Columns = ({ size }) => {
  let num = size;
  const arr = [];
  for (let i = num; i > 0; i--) {
    arr.push(`columns ${i}`);
  }
  return (
    <ul>
      {arr.map(c => (
        <li>{c}</li>
      ))}
    </ul>
  );
};

const MySelectControl = withState({
  size: 2
})(({ size, setState }) => (
  <>
    <SelectControl
      label="Number of Columns: "
      value={size}
      options={[
        { label: "1 Column", value: 1 },
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
        { label: "5 Columns", value: 5 },
        { label: "6 Columns", value: 6 },
        { label: "12 Columns", value: 12 }
      ]}
      onChange={size => {
        setState({ size });
      }}
    />
    <Columns size={size} />
  </>
));

const RowSectionEdit = props => {
  const { attributes, setAttributes } = props;
  console.log("attribute edit", attributes);
  return <MySelectControl />;
};

export default RowSectionEdit;
