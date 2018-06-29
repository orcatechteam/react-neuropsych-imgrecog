import React from 'react';
import ReactDOM from 'react-dom';
import Display from './display';
import Question from './question';


// testing the components - it displays the first component for 5 seconds and then shows the second component

const images = [
		'large_black_triangle.png',
		'large_green_triangle.png',
		'large_red_triangle.png',
		'large_grey_triangle.png',
		'small_blue_triangle.png',
		'small_orange_triangle.png',
		'small_purple_triangle.png'
	],
	dimension = 4,
	display = document.getElementById('display'),
	question = document.getElementById('question');

// handler everytime the user clicks on a box in the second component
let handleQSelect = (data) => {
	console.log(data);
}

// handler for when the second component stops displaying
let handleQComplete = (data) => {
	console.log(data);
}

// handler for when the first component that displays the grid is done displaying
let handleDComplete = (data) => {
	console.log(data);
	ReactDOM.render(<Question showLabels={true} data={data} onComplete={handleQComplete} onSelect={handleQSelect}/>, question);
}

ReactDOM.render(<Display showLabels={false} dimension={dimension} images={images} onComplete={handleDComplete}/>, display);

// stop displaying the first component after 5 seconds
setTimeout(() => { ReactDOM.unmountComponentAtNode(display) }, 5000);