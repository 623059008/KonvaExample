import React, {Component} from 'react';
import {render} from 'react-dom';
import {Group, Text, Rect} from 'react-konva';
import PropTypes from 'prop-types';

export default class DragContract extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    initialX: PropTypes.number,
    initialY: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    text: PropTypes.string,
    connect: PropTypes.object,
    updateConnect: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      fill: '#D2D0D0'
    };
    this.x = props.initialX;
    this.y = props.initialY;
  }

  setNode = node => {
    this.rect = node;
  }
  updateLine = e => {
    const x = this.x + e.target.attrs.x;
    const y = this.y + e.target.attrs.y;
    const {id, updateConnect} = this.props;
    updateConnect(id, x, y);
  }
  getRectStyle() {
    const {initialX, initialY, width, height} = this.props;
    return {
      x: initialX,
      y: initialY,
      width: width,
      height: height,
      stroke: '#C6C3C8',
      strokeWidth: 0.1,
      cornerRadius: 10,
      fill: '#ffffff'
    }
  }
  getNameStyle() {
    const {text, width, height} = this.props;
    const textSize = 15;
    const fontWidth = textSize / 2 * text.length;
    const fontX = this.x + (width - fontWidth) / 2;
    const fontY = this.y + (height - textSize) / 2;
    return {
      x: fontX,
      y: fontY,
      text: text,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: '#2D2C2C'
    }
  }

  render() {
    const rectStyle = this.getRectStyle();
    const nameStyle = this.getNameStyle();
    return (<Group draggable="draggable" onDragMove={this.updateLine}>
      <Rect ref={this.setNode} {...rectStyle}/>
      <Text {...nameStyle}/>
    </Group>);
  }
}
