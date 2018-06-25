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

class ImageRecognitionApp extends React.Component {

  render() {
    return (<div><ImageRecognition
              dimension={dimension}
              images={images}
              showLabels={true}/>
            <ImageRecognitionQuestion
              dimension={dimension}
              images={images}
              showLabels={true}/></div>);
  }
}

ReactDOM.render(<ImageRecognitionApp />, document.getElementById('root'));
