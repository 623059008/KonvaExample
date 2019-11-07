import React, {Component} from 'react';
import {Group, Rect, Line, Text} from 'react-konva';
import PropTypes from 'prop-types';

export default class CanvasRadio extends Component {
  static propTypes = {
    id: PropTypes.string,
    initialX: PropTypes.number,
    initialY: PropTypes.number,
    districtWidth: PropTypes.number,
    districtHeight: PropTypes.number,
    paddingX: PropTypes.number,
    paddingY: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    focus: PropTypes.bool,
    onChangeFocus: PropTypes.func,
    onChangeData: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      value: false
    }
    this.x = this.props.initialX;
    this.y = this.props.initialY;
    this.boxSize = 15;
    this.textSize = 14;
  }

  getLabelStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      paddingX,
      paddingY,
      color,
      label
    } = this.props;
    const boxSize = this.boxSize;
    const textSize = this.textSize;
    const fontX = initialX + paddingX + boxSize + 5;
    const fontY = initialY + paddingY;
    const textStyle = {
      x: fontX,
      y: fontY,
      text: label,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: color
    }
    return textStyle;
  }
  getCheckBoxStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      paddingX,
      paddingY
    } = this.props;
    const startX = initialX + paddingX;
    const startY = initialY + paddingY;
    const boxSize = this.boxSize;
    return {
      x: startX,
      y: startY,
      width: boxSize,
      height: boxSize,
      stroke: '#929690',
      strokeWidth: 0.5
    }
  }
  getCheckLineStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      paddingX,
      paddingY,
      color
    } = this.props;
    const boxSize = this.boxSize;
    const startX = initialX + paddingX + 2;
    const startY = initialY + paddingY + 3;
    const middleX = initialX + paddingX + boxSize / 2;
    const middleY = initialY + paddingY + boxSize / 5 * 4;
    const endX = initialX + paddingX + boxSize + 2;
    const endY = initialY + paddingY - 2;
    return {
      points: [
        startX,
        startY,
        middleX,
        middleY,
        endX,
        endY
      ],
      stroke: color,
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      visible: !!this.state.value
    };
  }
  getBackRect() {
    return {x: this.x, y: this.y, width: this.props.districtWidth, height: this.props.districtHeight, onClick: this.handleFocus};
  }
  handleFocus = () => {
    let {value} = this.state;
    value = !value;
    this.props.onChangeData(this.props.id, value);
    this.props.onChangeFocus(this.props.id);
    this.setState({value});
  }
  render() {
    const backRectStyle = this.getBackRect();
    const checkBoxStyle = this.getCheckBoxStyle();
    const checkLineStyle = this.getCheckLineStyle();
    const labelStyle = this.getLabelStyle();
    return (<Group>
      <Rect {...checkBoxStyle}/>
      <Line {...checkLineStyle}/>
      <Text {...labelStyle}/>
      <Rect {...backRectStyle}/>
    </Group>);
  }
}
