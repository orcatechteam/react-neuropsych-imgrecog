// Coordinate is a coordinate within a 2D grid and optionally contains an image.
//	The point of origin for the grid is the upper left hand corner
class Coord {

	// The row number this coordinate resides in
	row = undefined;

	// The column number this coordinate resides in
	col = undefined;

	// An optional image associated with this coordinate. This will be the image
	// file name or an empty string
	img = undefined;

	// unique key for this coordinate, can be used for equality or as a primary key
	key() {
		return this.col + "," + this.row;
	}

	// converts the Data object into a string
	stringify = () => {
		return JSON.stringify(this);
	}
}

Coord.generate = (col, row, img) => {
	let coord = new Coord();
	coord.col = col;
	coord.row = row;
	coord.img = img;
	return coord;
};

Coord.parse = (str) => {
	let obj = JSON.parse(str);
	if (typeof obj === 'undefined') {
		return undefined;
	}
	let coord = new Coord();
	coord.col = obj.col;
	coord.row = obj.row;
	coord.img = obj.img;
	return coord;
};

export default Coord;
