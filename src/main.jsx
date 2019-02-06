import React from 'react';
import ReactDOM from 'react-dom';

import Display from './display';
import Question from './question';

// testing the components - it displays the first component for 5 seconds and then shows the second component

const images = [
	'large_black_triangle.png', // months: 0, 7
	'large_green_triangle.png', // months: 1, 8
	'large_red_triangle.png', // months: 2, 9
	'large_grey_triangle.png', // months: 3, 10
	'small_blue_triangle.png', // months: 4, 11
	'small_orange_triangle.png', // month: 5
	'small_purple_triangle.png' // month: 6
];
const	dimension = 4;
const	display = document.getElementById('display');
const	question = document.getElementById('question');

const imageSetCombined = [...images, ...images]; // extend out the image set so we have enough to cover 12 months
const currentMonth = new Date().getMonth();
const currentImageIndex = images.indexOf(imageSetCombined[currentMonth]);

// handler everytime the user clicks on a box in the second component
let handleQSelect = (data) => {
	console.log(data);
};

// handler for when the second component stops displaying
let handleQComplete = (data) => {
	console.log(data);
};

// handler for when the first component that displays the grid is done displaying
let handleDComplete = (data) => {
	console.log(data);
	ReactDOM.render(
		<Question
			data={data}
			onComplete={handleQComplete}
			onSelect={handleQSelect}
			showLabels
		/>,
		question
	);
};

let handleRenderDisplayInstructions = ({ classes, imageDescription }) => {
	return (
		<div className={classes.imageDescription}>
			<p>My own display instructions for: {imageDescription}</p>
			<p>Some more instructions...</p>
		</div>
	)
}

ReactDOM.render(
	<Display
		currentImageIndex={currentImageIndex}
		dimension={dimension} 
		images={images} 
		onComplete={handleDComplete}
		onRenderInstructions={handleRenderDisplayInstructions}
		showLabels={false} 
	/>,
	display
);

// stop displaying the first component after 5 seconds
setTimeout(
	() => {
		ReactDOM.unmountComponentAtNode(display);
	},
	5000
);
