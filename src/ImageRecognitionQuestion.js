import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ImageRecognitionQuestion.css';

class ImageRecognitionQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBoxCoordinate: ""
    }

    this.actualDimension = props.dimension + 1;
    // labels for the grids
    this.columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.rowNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];

    // get the saved correct answer and coordinates from sessionStorage
    this.correctAnswer = sessionStorage.getItem('ImageRecognitionCorrectAnswer');
    this.correctCoordinate = sessionStorage.getItem('ImageRecognitionCorrectCoordinate');
    this.imageLinksGrid = sessionStorage.getItem('ImageRecognitionArrayTest');

    console.log(this.correctAnswer);
    console.log(this.correctCoordinate);
    console.log(this.imageLinksGrid);
  }

  static propTypes = {
    dimension: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    showLabels: PropTypes.bool.isRequired
  }

  renderBox(key) {
    let dimensionStyle = {
      width: Math.floor(90 / this.actualDimension) + 'vw',
      height: Math.floor(90 / this.actualDimension) + 'vw',
      maxHeight: Math.floor(90 / this.actualDimension) + 'vh',
      maxWidth: Math.floor(90 / this.actualDimension) + 'vh'
    };

    if (key === this.state.selectedBoxCoordinate) {
      return (<div className='box selected' key={key} style={dimensionStyle} onClick={() => this.handleClick(key)}></div>);
    } else {
      return (<div className='box' key={key} style={dimensionStyle} onClick={() => this.handleClick(key)}></div>);
    }
  }

  renderLabelBox(label, key) { // returns a border grid box (one of the boxes on the edge that will hold a label)
    let dimensionStyle = {
      width: Math.floor(90 / this.actualDimension) + 'vw',
      height: Math.floor(90 / this.actualDimension) + 'vw',
      maxHeight: Math.floor(90 / this.actualDimension) + 'vh',
      maxWidth: Math.floor(90 / this.actualDimension) + 'vh'
    };
    return (<div style={dimensionStyle} className='box-border' key={key}>{this.props.showLabels ? label : ''}</div>)
  }

  renderImagePrompt(imageLink) {
    return <div className='image-prompt-box'><img src={imageLink}></img></div>
  }

  renderGrid() {
    let gridComponents = [];
    // build the grid one row at a time and push each row onto the gridComponents array

    // the first row is the labels for the columns - so make an array of the labels first
    let firstRowLabels = new Array(this.props.dimension);
    for (let i = 0; i < firstRowLabels.length; i++) {
      firstRowLabels[i] = this.columnNames[i];
    }
    // turn the labels into components
    let firstRowComponents = firstRowLabels.map((label) => {
      return this.renderLabelBox(label, 'columnLabel' + firstRowLabels.indexOf(label));
    });
    firstRowComponents.unshift(this.renderLabelBox('', 'blank')); // the first label will be blank
    gridComponents.push(<div className='board-row' key='row0'>{firstRowComponents}</div>);

    // now do the rest of the rows with the initial row label and the image links
    for (let i = 0; i < this.props.dimension; i++) {
      let rowComponents = new Array(this.props.dimension);
      for (let j = 0; j < rowComponents.length; j++) {
        let component = this.renderBox(this.columnNames[j] + this.rowNames[i]);
        rowComponents[j] = component;
      }
      rowComponents.unshift(this.renderLabelBox(this.rowNames[i], 'rowLabel' + i)); // add the first label box
      gridComponents.push(<div className='board-row' key={'row' + (i + 1)}>{rowComponents}</div>)
    }

    return gridComponents;
  }

  render() {
    return (<div>
              {this.renderImagePrompt(this.correctAnswer)}
              {this.renderGrid()}
            </div>);
  }

  handleClick(coordinate) {
    let newState = {};
    if (coordinate === this.state.selectedBoxCoordinate) { // user has selected a box already selected - deselected it
      console.log('Deselected: ' + coordinate);
      newState.selectedBoxCoordinate = '';
    } else { // user has selected a new coordinate - this is the new selection
      console.log('Selected: ' + coordinate);
      newState.selectedBoxCoordinate = coordinate;
      if (coordinate === this.correctCoordinate) {
        console.log('Correct!');
      } else {
        console.log('Incorrect!');
      }
    }
    this.setState(newState);

    //TODO: Send the data on the selected box 
  }

}


export default (ImageRecognitionQuestion);
