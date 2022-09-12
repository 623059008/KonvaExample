import React, {Component} from 'react';
import {Group, Rect, Line, Text} from 'react-konva';
import './index.css';
import CanvasInput from '../components/canvasInput';
import CanvasRadio from '../components/canvasRadio';
import CanvasButton from '../components/canvasButton';

export default class Contract extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }
  cancelContract = () => {
    this.props.hideContract();
  }
  deployContract = (e, data) => {
    this.props.deployContract(data);
  }
  setFormNode = node => {
    this.contractLayer = node;
  }
  render() {
    const w = this.props.width;
    const h = this.props.height;
    return (<ContractForm ref={this.setFormNode} windowHeight={h} windowWidth={w} width={600} onDeploy={this.deployContract} onCancel={this.cancelContract}/>);
  }
}
class ContractForm extends Component {
  constructor(props) {
    super(props);
    const rectAttrs = this.getRectAttrs()
    this.state = {
      backgroundStyle: rectAttrs,
      titleHeight: 60,
      bodyHeight: 250,
      footerHeight: 60,
      focus: {
        'nameInput': 0,
        'symbolInput': 0,
        'decimalInput': 0,
        'supplyInput': 0
      },
      data: {
        'nameInput': 'Dashboard',
        'symbolInput': 'Dashboard',
        'decimalInput': '2',
        'supplyInput': '10000000',
        'mintable': false,
        'freezable': false,
        'burnable': false
      }
    }
    this.x = rectAttrs.x;
    this.y = rectAttrs.y;
  }
  getRectAttrs() {
    const formW = this.props.width;
    const formH = formW * 0.618;
    const rectAttrs = {
      x: (this.props.windowWidth - formW) / 2,
      y: (this.props.windowHeight - formH) / 2,
      width: formW,
      height: formH,
      fill: '#1B1A1B',
      shadowBlur: 2,
      shadowColor: '#F7F1F1',
      cornerRadius: 10
    }
    return rectAttrs;
  }
  getTextStyle(x, y, width, height, text, textSize, align, color, blur) {
    const fontWidth = textSize / 2.25 * text.length;
    const fontX = x + this.x + (width - fontWidth) / 2;
    const fontY = y + this.y + (height - textSize) / 2;
    const textStyle = {
      x: fontX,
      y: fontY,
      text: text,
      fontSize: textSize,
      fontFamily: "'Source Code Pro', monospace",
      fill: color,
      shadowColor: color,
      shadowBlur: blur
    }
    return textStyle;
  }
  getStraightLineStyle(start, end, strokeColor) {
    const x = this.x;
    const y = this.y
    return {
      points: [
        x + start[0],
        y + start[1],
        x + end[0],
        y + end[1]
      ],
      stroke: strokeColor,
      strokeWidth: 1,
      lineJoin: 'round'
    };
  }
  getInputStyle(id, x, y, dw, dh, w, h, co, label, content) {
    id = id || 'input' + parseInt(Math.random() * 1000);
    w = dw * 0.9 || w;
    h = dh * 0.9 || h;
    co = co || '#F4A713';
    label = label.replace(label[0], label[0].toUpperCase());
    content = content || label;
    return {
      id: id,
      initialX: x,
      initialY: y,
      districtWidth: dw,
      districtHeight: dh,
      width: w,
      height: h,
      color: co,
      label: label,
      content: content,
      focus: !!this.state.focus[id],
      onChangeFocus: this.onChangeFocus,
      onChangeData: this.onChangeData
    }
  }
  getRadioStyle(id, x, y, dw, dh, padx, pady, co, label) {
    id = id || 'radio' + parseInt(Math.random() * 1000);
    co = co || '#AEB3AC';
    label = label.replace(label[0], label[0].toUpperCase());
    return {
      id: id,
      initialX: x,
      initialY: y,
      districtWidth: dw,
      districtHeight: dh,
      paddingX: padx,
      paddingY: pady,
      color: co,
      label: label,
      focus: !!this.state.focus[id],
      onChangeFocus: this.onChangeFocus,
      onChangeData: this.onChangeData
    }
  }
  getButtonStyle(id, x, y, dw, dh, w, h, label, clickFunc) {
    id = id || 'button' + parseInt(Math.random() * 1000);
    w = w || dw * 0.5;
    h = h || dh * 0.7;
    return {
      id: id,
      initialX: x,
      initialY: y,
      districtWidth: dw,
      districtHeight: dh,
      width: w,
      height: h,
      label: label,
      handleClick: clickFunc
    }
  }
  onChangeFocus = id => {
    let {focus} = this.state;
    for (const k in focus) {
      focus[k] = false;
    }
    focus[id] = !focus[id];
    this.setState({focus});
  }
  onChangeData = (id, v) => {
    let {data} = this.state;
    data[id] = v;
    this.setState({data});
  }
  submitData = e => {
    this.props.onDeploy(e, this.state.data);
  }
  render() {
    const {backgroundStyle, titleHeight, bodyHeight, footerHeight, data} = this.state;
    const x = this.x;
    const y = this.y;
    const titleText = this.getTextStyle(0, 0, backgroundStyle.width - 20, titleHeight, data['nameInput'], 30, 'center', '#C6C3C8', 4);
    const titleLineStyle = this.getStraightLineStyle([
      0.5, titleHeight
    ], [
      backgroundStyle.width - 0.5,
      titleHeight
    ], '#878B86');
    const buttonLineStyle = this.getStraightLineStyle([
      0.5, 0.5 + titleHeight + bodyHeight
    ], [
      backgroundStyle.width - 0.5,
      0.5 + titleHeight + bodyHeight
    ], '#878B86');

    const inputHeight = bodyHeight / 4 * 3 / 2;
    const inputWidth = backgroundStyle.width / 2;
    const nameInputStyle = this.getInputStyle('nameInput', x, y + titleHeight, inputWidth, inputHeight, null, null, null, 'name', data['nameInput']);
    const symbolInputStyle = this.getInputStyle('symbolInput', x + inputWidth, y + titleHeight, inputWidth, inputHeight, null, null, null, 'symbol', data['symbolInput']);
    const decimalInputStyle = this.getInputStyle('decimalInput', x, y + titleHeight + inputHeight, inputWidth, inputHeight, null, null, null, 'decimal', data['decimalInput']);
    const supplyInputStyle = this.getInputStyle('supplyInput', x + inputWidth, y + titleHeight + inputHeight, inputWidth, inputHeight, null, null, null, 'supply', data['supplyInput']);

    const radioGroupText = this.getTextStyle(20, titleHeight + 2 * inputHeight, 40, 20, 'Attributes:', 14, 'center', '#797779', 0);

    const radioHeight = bodyHeight / 4;
    const radioWidth = backgroundStyle.width / 4;
    const marginTop = 10;
    const mintableRadioStyle = this.getRadioStyle('mintableRadio', x, y + titleHeight + 2 * inputHeight + marginTop, radioWidth, radioHeight, 15, 20, null, 'checkbox 1');
    const freezableRadioStyle = this.getRadioStyle('freezableRadio', x + radioWidth, y + titleHeight + 2 * inputHeight + marginTop, radioWidth, radioHeight, 15, 20, null, 'checkbox 2');
    const burnableRadioStyle = this.getRadioStyle('burnableRadio', x + radioWidth * 2, y + titleHeight + 2 * inputHeight + marginTop, radioWidth, radioHeight, 15, 20, null, 'checkbox 3');

    const buttonHeight = footerHeight;
    const buttonWidth = backgroundStyle.width / 2;

    const cancelButtonStyle = this.getButtonStyle('cancelButton', x, y + titleHeight + bodyHeight, buttonWidth, buttonHeight, null, null, 'Cancel', this.props.onCancel);
    const deployButtonStyle = this.getButtonStyle('deployButton', x + buttonWidth, y + titleHeight + bodyHeight, buttonWidth, buttonHeight, null, null, 'Add a Module', this.submitData);

    return (<Group>
      <Rect {...backgroundStyle}/>
      <Text {...titleText}/>
      <Line {...titleLineStyle}/>
      <CanvasInput {...nameInputStyle}/>
      <CanvasInput {...symbolInputStyle}/>
      {/* <CanvasInput {...decimalInputStyle}/>
      <CanvasInput {...supplyInputStyle}/> */}
      <Text {...radioGroupText}/>
      <CanvasRadio {...mintableRadioStyle}/>
      <CanvasRadio {...freezableRadioStyle}/>
      <CanvasRadio {...burnableRadioStyle}/>
      <Line {...buttonLineStyle}/>
      <CanvasButton {...cancelButtonStyle}/>
      <CanvasButton {...deployButtonStyle}/>
    </Group>);
  }
}
