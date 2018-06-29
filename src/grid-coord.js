export default class Coord {
	constructor(col, row, img) {
		this.col = col;
		this.row = row;
		this.img = img;
	}

	key() {
		return this.col + "," + this.row;
	}
}
