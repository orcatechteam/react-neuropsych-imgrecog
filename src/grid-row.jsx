import React from 'react';
import PropTypes from 'prop-types';
import Coord from './grid-coord';
import LabelBox from './grid-box-label';
import ImageBox from './grid-box-image';
import Data from './data';
import { withStyles } from '@material-ui/core/styles';

let styles = {
	"row": {
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "center"
	}
};

const Row = props => {

	let {
		row,
		data,
		classes,
		showImages,
		showLabels,
		...childProps
	} = props;

	let boxes = new Array(data.grid[row].length + 1);

	// add the first label box
	if (showLabels) {
		boxes[0] = (
			<LabelBox 
				dims={props.dims} 
				key={'rowLabel' + row}
				percent={props.percent} 
				show={showLabels} 
				showImages={showImages} 
			>
				{row+1}
			</LabelBox>
		);
	} else {
		boxes[0] = null;
	}

	// add grid contents
	for (let col = 0; col < data.grid[row].length; col++) {
		let coord = data.grid[row][col];
		boxes[col + 1] = (
			<ImageBox
				{...childProps}
				coord={coord}
				key={coord.key()}
				show={props.showImages}
			/>
		);
	};

	return (
		<div
			className={classes.row}
			key={'row' + (row + 1)}
		>
			{boxes}
		</div>
	);
};

Row.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.instanceOf(Data).isRequired,
	dims: PropTypes.number.isRequired,
	onBoxCoord: PropTypes.func,
	onSelect: PropTypes.func,
	percent: PropTypes.number,
	row: PropTypes.number.isRequired,
	selected: PropTypes.instanceOf(Coord),
	showImages: PropTypes.bool,
	showLabels: PropTypes.bool,
};

Row.defaultProps = {
	showLabels: true,
	showImages: true
};

export default withStyles(styles)(Row);
