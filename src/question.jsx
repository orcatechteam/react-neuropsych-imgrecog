import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import { withStyles } from '@material-ui/core/styles';

import Data from './data';
import Grid from './grid';
import ImageBox from './grid-box-image';

let styles = {
	"question": {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center"
	},
	"imageBox": {
		verticalAlign: "middle",
		float: "none",
		display: "inline-block"
	},
	"imageBoxWrapper": {
		"textAlign": "center",
		"fontSize": "1.5rem",
		"& p": {
			fontSize: '1.25rem'
		}
	}
};

class Question extends React.Component {

	static propTypes = {
		classes: PropTypes.object.isRequired,
		data: PropTypes.instanceOf(Data).isRequired,
		onComplete: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		percent: PropTypes.number,
		showLabels: PropTypes.bool.isRequired,
	}

	state = {
		selected: undefined,
	}

	boxCoords = {}

	// lifecycle functions
	componentDidMount() {
		this.props.data.questionStart = (new Date()).getTime();
	}

	componentWillUnmount() {
		this.props.data.questionStop = (new Date()).getTime();
		this.props.data.grid = [].concat(...this.props.data.grid);
		this.props.onComplete(this.props.data);
	}

	equals(coord1, coord2) {
		if (typeof coord1 === 'undefined' || typeof coord2 === 'undefined') {
			return false;
		}
		return coord1.key() === coord2.key();
	}

	handleSelect = ({ coord, pageX, pageY }) => {
		const correctCoord = this.props.data.coord;
		const correctBoxCoord = this.boxCoords[`r${correctCoord.row}c${correctCoord.col}`];
		let distanceToCorrect = null;
		if (correctBoxCoord !== undefined) {
			distanceToCorrect = this.getDistanceToCorrect({
				box: {
					x: correctBoxCoord.offsetLeft,
					y: correctBoxCoord.offsetTop,
					width: correctBoxCoord.offsetWidth,
					height: correctBoxCoord.offsetHeight,
				},
				click: {
					x: pageX,
					y: pageY,
				},
			});
		}
		coord = this.equals(coord, this.state.selected) ? undefined : coord;

		this.props.data.selected = coord;
		this.props.data.correct = this.equals(coord, this.props.data.coord);
		this.props.data.distanceToCorrect = distanceToCorrect;

		// update selection
		this.setState({ selected: coord });

		// append for final onComplete
		this.props.data.selections.push({
			stamp: (new Date()).getTime(),
			pickedCoord: this.props.data.selected,
			correctCoord: this.props.data.coord,
			correct: this.props.data.correct,
			distanceToCorrect,
		});

		let data = cloneDeep(this.props.data);
		data.questionStop = (new Date()).getTime();
		data.grid = [].concat(...data.grid);
		this.props.onSelect(data);
	}

	getDistanceToCorrect = (params) => {
		const { box, click } = params;
		return Math.round(Math.sqrt(
			(Math.pow(click.x - (box.x+(box.width/2)), 2)) + (Math.pow(click.y - (box.y+(box.height/2)), 2))
		));
	}

	handleBoxDOMCoordinate = (boxCoord) => {
		// console.log('handleBoxDOMCoordinate', boxCoord);
		// const { offsetLeft, offsetTop } = boxCoord;
		const { row, col } = boxCoord.coord;
		// console.log({ row, col }, { offsetLeft, offsetTop });
		// this.boxCoords = [...this.boxCoords, boxCoord];
		this.boxCoords[`r${row}c${col}`] = boxCoord;
	}

	render() {
		return (
			<div className={this.props.classes.question}>
				<div className={this.props.classes.imageBoxWrapper}>
					<span>Where in this grid did you initially see the following shape: </span>
					<ImageBox 
						className={this.props.classes.imageBox}
						coord={this.props.data.coord}
						dims={this.props.data.grid.length}
						onBoxCoord={() => {}}
						percent={this.props.percent}
						showBorder={false}
					/>
					<p>Take your best guess, even if you are not sure. Click a location in the grid closest to where you think you saw the shape before to end the survey.</p>
				</div>
				<Grid
					data={this.props.data}
					onBoxCoord={this.handleBoxDOMCoordinate}
					onSelect={this.handleSelect}
					percent={this.props.percent}
					selected={this.state.selected}
					showImages={false}
					showLabels={this.props.showLabels}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(Question);
