import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImageRecognition from './ImageRecognition';
import ImageRecognitionQuestion from './ImageRecognitionQuestion';



const images = ['large_black_triangle.png',
                'large_green_triangle.png',
                'large_red_triangle.png',
                'large_grey_triangle.png',
                'small_blue_triangle.png',
                'small_orange_triangle.png',
                'small_purple_triangle.png'];

const dimension = 4;
const displayTime = 3000;



class ImageRecognitionApp extends React.Component {

  handleImageRecogntionCompletion = (data) => {
    console.log(data);
  }

  handleImageRecognitionQuestionSelection = (data) => {
    console.log(data);
  }

  handleImageRecogntionQuestionCompletion = (data) => {
    console.log(data);
  }

  render() {
    return (<div><ImageRecognition
              dimension={dimension}
              images={images}
              showLabels={true}
              displayTime={displayTime}
              onComplete={this.handleImageRecogntionCompletion}/>

            <ImageRecognitionQuestion
              dimension={dimension}
              images={images}
              showLabels={true}
              correctImgName={'large_green_triangle.png'}
              correctCoordinate={'B1'}
              onSelect={this.handleImageRecognitionQuestionSelection}
              onComplete={this.handleImageRecogntionQuestionCompletion}/></div>);
  }
}

ReactDOM.render(<ImageRecognitionApp />, document.getElementById('root'));
