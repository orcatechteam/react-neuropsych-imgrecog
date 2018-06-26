import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImageRecognition from './ImageRecognition';
import ImageRecognitionQuestion from './ImageRecognitionQuestion';


// testing the components - it displays the first component for 5 seconds and then shows the second component

const images = ['large_black_triangle.png',
                'large_green_triangle.png',
                'large_red_triangle.png',
                'large_grey_triangle.png',
                'small_blue_triangle.png',
                'small_orange_triangle.png',
                'small_purple_triangle.png'];

const dimension = 4;

let finishDisplayingGrid = () => {
  // stop displaying the first component
  ReactDOM.unmountComponentAtNode(document.getElementById('display'));
}

// handler functions

// handler for when the first component that displays the grid is done displaying
let handleImageRecogntionCompletion = (data) => {
  console.log(data);

  // now
  ReactDOM.render(<ImageRecognitionQuestion
    dimension={dimension}
    images={images}
    showLabels={true}
    correctImgName={data.correctImgName}
    correctCoordinate={data.correctCoordinate}
    imageLinksGrid={data.imageLinksGrid}
    onSelect={handleImageRecognitionQuestionSelection}
    onComplete={handleImageRecogntionQuestionCompletion}/>, document.getElementById('question'));
}

// callbacks for the second component
let handleImageRecognitionQuestionSelection = (data) => { // handler everytime the user clicks on a box in the second component
  console.log(data);
}

let handleImageRecogntionQuestionCompletion = (data) => { // handler for when the second component stops displaying
  console.log(data);
}

setTimeout(finishDisplayingGrid, 5000);

ReactDOM.render(<ImageRecognition
            dimension={dimension}
            images={images}
            showLabels={true}
            onComplete={handleImageRecogntionCompletion}/>, document.getElementById('display'));





// class ImageRecognitionApp extends React.Component {
//
//
//
//   render() {
//     return (<div><ImageRecognitionQuestion
//       dimension={dimension}
//       images={images}
//       showLabels={true}
//       correctImgName={this.correctImgName}
//       correctCoordinate={this.correctCoordinate}
//       imageLinksGrid={this.imageLinksGrid}
//       onSelect={this.handleImageRecognitionQuestionSelection}
//       onComplete={this.handleImageRecogntionQuestionCompletion}/>
//       <ImageRecognition
//                 dimension={dimension}
//                 images={images}
//                 showLabels={true}
//                 displayTime={displayTime}
//                 onComplete={this.handleImageRecogntionCompletion}/>
//     </div>);
//   }
// }
//
// ReactDOM.render(<ImageRecognitionApp />, document.getElementById('root'));
