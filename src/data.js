import Coord from './grid-coord';

// this function just shuffles the array randomly
const shuffle = (inputArray) => {

	for (let i = inputArray.length - 1; i >= 0; i--) {
		let randomIndex = Math.floor(Math.random() * (i + 1));
		let itemAtIndex = inputArray[randomIndex];

		inputArray[randomIndex] = inputArray[i];
		inputArray[i] = itemAtIndex;
	}

	return inputArray;
};

class Data {

	// A unix timestamp representing when the display component was mounted
	displayStart = undefined;

	// A unix timestamp representing when the display component was unmounted
	displayStop = undefined;

	// A unix timestamp representing when the question component was mounted
	questionStart = undefined;

	// A unix timestamp representing when the question component was unmounted
	questionStop = undefined;

	// the correct coordinate
	coord = undefined;

	// the currently selected coordinate
	selected = undefined;

	// True is they selected the correct coordinate
	// False if they selected the wrong coordinate
	// Undefined if a selection has not been made
	correct = undefined;

	// a grid of Coordinate objects
	//
	// from display this is a 2D array of NxN dimensions where N is the dimension
	// property given to the display component
	//
	// from questions the 2D array is flattened into an array of size N*N
	grid = new Array();

	// a list of selections made by the user when they were given an empty grid.
	selections = [];

	// converts the Data object into a string
	stringify = () => {
		return JSON.stringify(this);
	}
}

// parses the string into a Data object
Data.parse = (str) => {
	let obj = JSON.parse(str);
	if (typeof obj === 'undefined') {
		return undefined;
	}
	let data = new Data();

	// numbers
	data.displayStart = obj.displayStart;
	data.displayStop = obj.displayStop;
	data.questionStart = obj.questionStart;
	data.questionStop = obj.questionStop;

	// coord objects needs to be parsed
	data.coord = Coord.parse(JSON.stringify(obj.coord));
	data.selected = obj.selected;

	if (typeof obj.grid !== 'undefined') {
		for (let i = 0; i < obj.grid.length; i++) {
			for (let j = 0; j < obj.grid[i].length; j++) {
				obj.grid[i][j] = Coord.parse(JSON.stringify(obj.grid[i][j]));
			}
		}
	}
	data.grid = obj.grid;

	// bool
	data.correct = obj.correct;

	// native objects
	data.selections = obj.selections;

	return data;
};

// generate create a new dataset and populates the grid with the images and dimensions given
Data.generate = (images, dimension, currentImageIndex) => {
	let data = new Data();

	if (typeof images === 'undefined' || dimension === 0) {
		return data;
	}

	data.grid = new Array(dimension);

	// array that will hold the image link or blank link if the box is empty
	let imageLinks = new Array(dimension * dimension);

	// first make an array of all the images for the boxes - empty strings correspond to a box with no image to be displayed
	for (let i = 0; i < images.length; i++) {
		// array of image links given as a property
		imageLinks[i] = images[i] === undefined ? "" : images[i];
	}

	// randomly place the images in the grid
	imageLinks = shuffle(imageLinks);

	let isRandom = false;
	if (currentImageIndex !== null && typeof currentImageIndex === 'number' && images[currentImageIndex] !== undefined) {
		// use a static correct answer
		data.image = images[currentImageIndex];
	} else {
		// use a random correct answer
		isRandom = true;
		data.image = images[Math.floor(Math.random() * images.length)];
	}

	// Now turn it into a 2D array
	for (let i = 0; i < data.grid.length; i++) {
		let row = new Array(dimension);
		for (let j = 0; j < dimension; j++) {
			row[j] = Coord.generate(j, i, imageLinks[(dimension * i) + j]);
			if (row[j].img === data.image) {
				data.coord = row[j];
			}
		}
		data.grid[i] = row;
	}

	console.log("Correct: (row: %s, col: %s, img: %s, isRandom: %s)", data.coord.row, data.coord.col, data.coord.img, isRandom);
	return data;
};

export default Data;
