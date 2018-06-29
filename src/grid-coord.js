// Coordinate is a coordinate within a 2D grid and optionally contains an image.
//	The point of origin for the grid is the upper left hand corner
export default class Coord {

	// The row number this coordinate resides in
	row = undefined;

	// The column number this coordinate resides in
	col = undefined;

	// An optional image associated with this coordinate. This will be the image
	// file name or an empty string
	img = undefined;

	constructor(col, row, img) {
		this.col = col;
		this.row = row;
		this.img = img;
	}

	key() {
		return this.col + "," + this.row;
	}
}
