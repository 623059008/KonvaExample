import React, {Component} from 'react';
import {Stage, Layer, Rect, Text, Line} from 'react-konva';
import './App.css';
import Contract from './contract';
import DragContract from './dragcontract'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      contract: true,
      drag: false,
      connect: {
        '0': [
          window.innerWidth / 2,
          window.innerHeight / 2
        ],
        '1': [
          window.innerWidth / 2 - 200,
          window.innerHeight / 2 - 200
        ]
      }
    }
  }
  updateConnect = (id, x, y) => {
    let {connect} = this.state;
    connect[id][0] = x;
    connect[id][1] = y;
    this.setState({connect});
  }
  getCenterText() {
    const text = 'Show Module Manager';
    const textSize = 30;
    const fontWidth = textSize / 2.25 * text.length;
    const x = (window.innerWidth - fontWidth) / 2;
    const y = (window.innerHeight - textSize) / 2;
    return {
      x: x,
      y: y,
      text: text,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: '#C2C4C3',
      shadowColor: '#ffffff',
      shadowBlur: 10,
      onClick: this.showContract
    }
  }
  getLineStyle = () => {
    const {connect} = this.state;
    const points = [];

    let x1 = connect['0'][0],
      y1 = connect['0'][1],
      x2 = connect['1'][0],
      y2 = connect['1'][1];
    // calculate the link point
    if (x1 < x2 && x2 - x1 > 200) {
      points.push(x1 + 200, y1 + 35, x2, y2 + 35);
    }
    if (x1 > x2 && x1 - x2 > 200) {
      points.push(x2 + 200, y2 + 35, x1, y1 + 35);
    }
    if (Math.abs(x1 - x2) < 200) {
      if (y1 < y2) {
        points.push(x1 + 100, y1 + 70, x2 + 100, y2);
      } else if (y1 > y2) {
        points.push(x2 + 100, y2 + 70, x1 + 100, y1);
      }
    }
    if (x2 - x1 === 200) {
      if (y1 < y2) {
        points.push(x1 + 200, y1 + 35, x2 + 100, y2);
      } else if (y1 >= y2) {
        points.push(x1 + 100, y1, x2, y2 + 35);
      }
    }
    if (x1 - x2 === 200) {
      if (y1 < y2) {
        points.push(x2 + 100, y2, x1, y1 + 35);
      } else if (y1 >= y2) {
        points.push(x2 + 100, y2 + 70, x1, y1 + 35);
      }
    }

    // console.log(points);
    return {points: points, stroke: '#EDB611', strokeWidth: 5, lineCap: 'round', lineJoin: 'round'};
  }
  showContract = () => {
    this.setState({contract: true});
  }
  hideContract = () => {
    this.setState({contract: false});
  }
  deployContract = (data) => {
    this.setState({contract: false, drag: true, name: data['nameInput']});
  }
  render() {
    const shadowPanel = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      fill: '#eee'
    }
    const pressTextStyle = this.getCenterText();
    const dragContracts = [];
    dragContracts.push(<DragContract key='0' id='0' updateConnect={this.updateConnect} connect={this.state.connect} initialX={window.innerWidth / 2} initialY={window.innerHeight / 2} text={this.state.name} width={200} height={70}/>)
    dragContracts.push(<DragContract key='1' id='1' updateConnect={this.updateConnect} connect={this.state.connect} initialX={window.innerWidth / 2 - 200} initialY={window.innerHeight / 2 - 200} text={'Default'} width={200} height={70}/>)
    return (<Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect {...shadowPanel}></Rect>
        {!this.state.drag && <Text {...pressTextStyle}/>}
        {this.state.contract && <Contract width={window.innerWidth} height={window.innerHeight} hideContract={this.hideContract} deployContract={this.deployContract}/>}
        {this.state.drag && dragContracts}
        {this.state.drag && <Line {...this.getLineStyle()}/>}
      </Layer>
    </Stage>);
  }
}
