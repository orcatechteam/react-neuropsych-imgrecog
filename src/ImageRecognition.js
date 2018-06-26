import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ImageRecognition.css';

class ImageRecognition extends React.Component {
  constructor(props) {
    super(props);

    this.imageLinks = new Array(props.dimension * props.dimension); // array that will hold the image link or blank link if the box is empty
    this.actualDimension = props.dimension + 1;
    // labels for the grids
    this.columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.rowNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];
    this.time = 0;

    // first make an array of all the images for the boxes - empty strings correspond to a box with not image to be displayed
    for (let i = 0; i < props.images.length; i++) {
      this.imageLinks[i] = props.images[i]; // array of image links given as a property
    }
    for (let i = 0; i < this.imageLinks.length; i++) {
      if (this.imageLinks[i] === undefined) {
        this.imageLinks[i] = "";
      }
    }

    this.shuffleArray(this.imageLinks);

    // Now turn it into a 2D array
    this.imageLinksGrid = new Array(props.dimension);
    for (let i = 0; i < this.imageLinksGrid.length; i++) {
      let imageLinksRow = new Array(props.dimension);
      for (let j = 0; j < props.dimension; j++) {
        imageLinksRow[j] = this.imageLinks[(props.dimension * i) + j];
      }
      this.imageLinksGrid[i] = imageLinksRow;
    }

    // randomly select a correct answer
    this.correctAnswer = props.images[Math.floor(Math.random() * props.images.length)];
    for (let i = 0; i < props.dimension; i++) {
      for (let j = 0; j < props.dimension; j++) {
        if (this.imageLinksGrid[i][j] === this.correctAnswer) {
          this.correctCoordinate = this.columnNames[j] + this.rowNames[i];
        }
      }
    }

    // save the correct answer as the image name and the corrdinates of the correct box (eg: C3)
    // the React component for asking the user about where he or she saw the image will have to use these sessionStorage keys
    sessionStorage.setItem('ImageRecognitionCorrectAnswer', this.correctAnswer);
    sessionStorage.setItem('ImageRecognitionCorrectCoordinate', this.correctCoordinate);
    sessionStorage.setItem('ImageRecognitionArrayTest', this.imageLinksGrid);

    // console.log(this.correctCoordinate);
    // console.log(this.correctAnswer);
  }

  static propTypes = {
    dimension: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    showLabels: PropTypes.bool.isRequired,
    displayTime: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired
  }

  // lifecycle functions
  componentDidMount() {
    // create a timer
    this.timer = setTimeout(this.handleCompletion, this.props.displayTime);

    this.counter = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.counter);

    this.handleCompletion()
  }

  handleCompletion = () => {
    // done displaying the grid - send up the correct answer and coordinate
    let data = { // data to export
      timeDisplayed: this.time,
      correctImgName: this.correctAnswer,
      correctCoordinate: this.correctCoordinate,
      imageLinksGrid: this.imageLinksGrid,
      timeStamp: new Date()
    }
    this.props.onComplete(data);
  }

  tick = () => {
    this.time += 0.1;
  }

  renderImageBox(imageLink, key) { // returns a grid box
    let dimensionStyle = {
      width: Math.floor(90 / this.actualDimension) + 'vw',
      height: Math.floor(90 / this.actualDimension) + 'vw',
      maxHeight: Math.floor(90 / this.actualDimension) + 'vh',
      maxWidth: Math.floor(90 / this.actualDimension) + 'vh'
    };
    return (<div className='box' key={key} value={key} coordinate={key} style={dimensionStyle}><img src={imageLink} alt=''></img></div>);
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
    for (let i = 0; i < this.imageLinksGrid.length; i++) {
      let count = 0;
      let components = this.imageLinksGrid[i].map((imageLink) => {
        let component = this.renderImageBox(imageLink, this.columnNames[count] + this.rowNames[i]);
        count++;
        return component;
      });
      components.unshift(this.renderLabelBox(this.rowNames[i], 'rowLabel' + i)); // add the first label box
      gridComponents.push(<div className='board-row' key={'row' + (i + 1)}>{components}</div>)
    }

    return gridComponents;
  }

  render() {
    return this.renderGrid();
  }

  shuffleArray(inputArray) {

    for (let i = inputArray.length - 1; i >= 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let itemAtIndex = inputArray[randomIndex];

      inputArray[randomIndex] = inputArray[i];
      inputArray[i] = itemAtIndex;
    }

    return inputArray;
  }
}


export default (ImageRecognition);
