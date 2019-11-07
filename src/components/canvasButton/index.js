import React, {Component} from 'react';
import {Group, Rect, Text} from 'react-konva';
import PropTypes from 'prop-types';

export default class CanvasButton extends Component {
  static propTypes = {
    id: PropTypes.string,
    initialX: PropTypes.number,
    initialY: PropTypes.number,
    districtWidth: PropTypes.number,
    districtHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    label: PropTypes.string,
    handleClick: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.x = this.props.initialX;
    this.y = this.props.initialY;
    this.textSize = 14;
    this.state = {
      textColor: '#A6A4A8',
      buttonStroke: '#F4A713',
      buttonFill: '#1A1819'
    }
  }
  getButtonStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      width,
      height
    } = this.props;
    const {buttonStroke, buttonFill} = this.state;
    const startX = initialX + (districtWidth - width) / 2;
    const startY = initialY + (districtHeight - height) / 2;
    return {
      x: startX,
      y: startY,
      width: width,
      height: height,
      stroke: buttonStroke,
      strokeWidth: 1.5,
      cornerRadius: 20,
      fill: buttonFill,
      onClick: this.props.handleClick,
      onMouseOver: this.handleMouseOver,
      onMouseLeave: this.handleMouseLeave
    }
  }
  getTextStyle() {
    const {
      initialX,
      initialY,
      districtWidth,
      districtHeight,
      width,
      height,
      label
    } = this.props;
    const {textColor} = this.state;
    const textSize = this.textSize;
    const fontWidth = textSize / 2 * label.length;
    const startX = initialX + (districtWidth - width) / 2 + (width - fontWidth) / 2;
    const startY = initialY + (districtHeight - height) / 2 + (height - textSize) / 2;
    return {
      x: startX,
      y: startY,
      text: label,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: textColor,
      onClick: this.props.handleClick,
      onMouseOver: this.handleMouseOver,
      onMouseLeave: this.handleMouseLeave
    }
  }
  handleMouseOver = () => {
    this.setState({buttonFill: '#F4A713', textColor: '#1A1819'});
  }
  handleMouseLeave = () => {
    this.setState({buttonFill: '#1A1819', textColor: '#A6A4A8'});
  }
  render() {
    const {label} = this.props;
    const buttonStyle = this.getButtonStyle();
    const textStyle = this.getTextStyle();
    return (<Group>
      <Rect {...buttonStyle}/>
      <Text {...textStyle}/>
    </Group>);
  }
}
