import { InnerBlocks } from "@wordpress/block-editor";
import { Component } from "@wordpress/element";
import { SelectControl, Button, TextControl } from "@wordpress/components";

const ColumnsSettings = props => {
  const { onChangeValue, settings } = props;

  return (
    <>
      <div className="flexgrid">
        {settings.map((col, index) => {
          return (
            <div className="flexgrid__item" key={index}>
              <TextControl
                label={"Size (columns)"}
                value={col}
                onChange={val => onChangeValue(val, index)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const MySelectControl = ({ size, onChangeColumns }) => {
  return (
    <>
      <SelectControl
        label="Number of Columns: "
        value={size}
        options={[
          { label: "1 Column", value: 1 },
          { label: "2 Columns", value: 2 },
          { label: "3 Columns", value: 3 },
          { label: "4 Columns", value: 4 },
          { label: "6 Columns", value: 6 },
          { label: "12 Columns", value: 12 }
        ]}
        onChange={value => onChangeColumns(value)}
      />
    </>
  );
};

const Grid = ({ settings }) => {
  const newTemplate = columns => {
    return columns.map((col, index) => {
      return ["kili-blocks/k-column", { columns: `${col}` }];
    });
  };
  return (
    <>
      <div className="kili-section__row">
        <InnerBlocks template={newTemplate(settings)} />
      </div>
    </>
  );
};

class RowSectionEdit extends Component {
  constructor(props) {
    super(props);
    console.log("object", props);
    this.state = {
      isCreated: props.attributes.isCreated,
      size: 2,
      settings: [6, 6]
    };
  }

  render() {
    const { attributes, setAttributes } = this.props;
    const { isCreated } = attributes;
    const fillArray = (value, len) => {
      if (len == 0) return [];
      var a = [value];
      while (a.length * 2 <= len) a = a.concat(a);
      if (a.length < len) a = a.concat(a.slice(0, len - a.length));
      return a;
    };

    const toggleCreate = () => {
      this.setState({ isCreated: !this.state.isCreated });
      setAttributes({ isCreated: !this.state.isCreated });
    };
    const onChangeColumns = value => {
      this.setState({
        size: Number(value),
        settings: fillArray(12 / Number(value), Number(value))
      });
    };
    const onChangeValue = (newValue, index) => {
      const newSettings = [...this.state.settings];
      newSettings[index] = newValue;
      this.setState({ settings: newSettings });
    };
    return (
      <>
        {console.log("state", this.state)}
        <div className="select-menu">
          {!this.state.isCreated && (
            <>
              <MySelectControl
                size={this.state.size}
                onChangeColumns={v => onChangeColumns(Number(v))}
              />
              <ColumnsSettings
                size={this.state.size}
                onChangeValue={onChangeValue}
                settings={this.state.settings}
              />
              <Button onClick={toggleCreate}>Click</Button>
            </>
          )}
        </div>
        <div className="kili-columns">
          {this.state.isCreated && <Grid settings={this.state.settings} />}
        </div>
      </>
    );
  }
}

export default RowSectionEdit;
