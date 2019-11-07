import React, {Component} from 'react';
import {Group, Rect, Line, Text} from 'react-konva';
import PropTypes from 'prop-types';
import Konva from 'konva';

export default class CanvasInput extends Component {
  static propTypes = {
    id: PropTypes.string,
    initialX: PropTypes.number,
    initialY: PropTypes.number,
    districtWidth: PropTypes.number,
    districtHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    content: PropTypes.string,
    focus: PropTypes.bool,
    onChangeFocus: PropTypes.func,
    onChangeData: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    }
    this.x = this.props.initialX;
    this.y = this.props.initialY;
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }
  getLineStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      width,
      height,
      color
    } = this.props;
    const startX = initialX + (districtWidth - width) / 2;
    const startY = initialY + districtHeight - (districtHeight - height);
    const endX = startX + width;
    const endY = startY;
    const lineStyle = {
      points: [
        startX, startY, endX, endY
      ],
      stroke: color,
      strokeWidth: 2.5,
      lineJoin: 'round',
      shadowColor: '#F68C1E',
      shadowBlur: 8,
      shadowOffset: {
        x: 0,
        y: -3
      },
      shadowEnabled: !!this.props.focus
    }
    return lineStyle;
  }
  getLabelStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      width,
      height,
      color,
      label
    } = this.props;
    const textSize = 15; // default fontSize in input.
    const fontX = initialX + (districtWidth - width) / 2 + textSize / 2.25;
    const fontY = initialY + (districtHeight - height) / 2 + 30 - textSize;
    const textStyle = {
      x: fontX,
      y: fontY,
      text: label,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: color,
      shadowColor: color,
      shadowBlur: 4
    }
    return textStyle;
  }
  getInputRectStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      width,
      height,
      color,
      label
    } = this.props;
    const startX = initialX + (districtWidth - width * 0.95) / 2;
    const startY = initialY + (districtHeight - height) / 2 + 20;
    return {
      x: startX,
      y: startY,
      width: width * 0.95,
      height: height * 0.4,
      stroke: 'white',
      strokeWidth: 0
    }
  }
  getInputTextStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      width,
      height,
      color,
      label
    } = this.props;
    let text = this.state.content;
    const textSize = 20; // default fontSize in input.
    const startX = initialX + (districtWidth - width * 0.95) / 2;
    const startY = initialY + districtHeight - (districtHeight - height) - textSize * 1.5;

    return {
      x: startX,
      y: startY,
      text: text,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: '#F0F5F3'
    }
  }
  getBackRect() {
    return {x: this.x, y: this.y, width: this.props.districtWidth, height: this.props.districtHeight, onClick: this.handleFocus};
  }
  handleFocus = () => {
    this.props.onChangeFocus(this.props.id);
  }
  handleKeyDown = e => {
    let {content} = this.state;
    let {focus, id, onChangeData} = this.props;
    if (!focus) 
      return;
    if (e.keyCode > 8 && e.keyCode < 46 && e.keyCode !== 32 || e.keyCode === 91) 
      return;
    if (e.keyCode === 8) {
      content = content.substr(0, content.length - 1);
    } else {
      content += e.key;
    }
    if (content.length >= 23) {
      content = content.substr(0, 22);
    }
    onChangeData(id, content);
    this.setState({content});
  }
  render() {
    const backRectStyle = this.getBackRect();
    const lineStyle = this.getLineStyle();
    const inputRect = this.getInputRectStyle();
    const inputText = this.getInputTextStyle();
    const labelStyle = this.getLabelStyle();
    return (<Group>
      <Rect {...backRectStyle}/>
      <Text {...labelStyle}/>
      <Text {...inputText}/>
      <Line {...lineStyle}/>
    </Group>);
  }
}
