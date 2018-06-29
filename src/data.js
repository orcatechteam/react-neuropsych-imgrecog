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

export default class Data {

	// the time the grid was first display with images
	displayStart = 0

	// the time the grid with images was removed
	displayStop = 0

	// the time when the empty grid was shown
	questionStart = 0

	// the time when the final selection was made
	questionStop = 0

	// the correct coordinate
	coord = undefined;

	// the selected cooordinate
	selected = undefined

	// if they selected the correct coord
	correct = undefined;

	// a 2D grid of coordinates to image links
	grid = new Array();

	// a list of selections made by the user when they were given an empty grid
	selections = [];

	constructor(images, dimension) {
		this.grid = new Array(dimension);

		// array that will hold the image link or blank link if the box is empty
		let imageLinks = new Array(dimension * dimension);

		// first make an array of all the images for the boxes - empty strings correspond to a box with no image to be displayed
		for (let i = 0; i < images.length; i++) {
			// array of image links given as a property
			imageLinks[i] = images[i] === undefined ? "" : images[i];
		}

		// randomly place the images in the grid
		shuffle(imageLinks);

		// randomly select a correct answer
		this.image = images[Math.floor(Math.random() * images.length)];

		// Now turn it into a 2D array
		for (let i = 0; i < this.grid.length; i++) {
			let row = new Array(dimension);
			for (let j = 0; j < dimension; j++) {
				row[j] = new Coord(j, i, imageLinks[(dimension * i) + j]);
				if (row[j].img === this.image) {
					this.coord = row[j];
				}
			}
			this.grid[i] = row;
		}

		console.log('Correct: (row: ' + this.coord.row + ', col: ' + this.coord.col + ', img: ' + this.coord.img + ')');
	}
}
