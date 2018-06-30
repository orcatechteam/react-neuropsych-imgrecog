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
}
let Row = (props) => {
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
		boxes[0] = (<LabelBox percent={props.percent} dims={props.dims} showImages={showImages} show={showLabels} key={'rowLabel' + row}>{row+1}</LabelBox>);
	} else {
		boxes[0] = null;
	}

	// add grid contents
	for (let col = 0; col < data.grid[row].length; col++) {
		let coord = data.grid[row][col];
		boxes[col + 1] = <ImageBox {...childProps} show={props.showImages} key={coord.key()} coord={coord}/>;
	};

	return <div className={props.classes.row} key={'row' + (row + 1)}>{boxes}</div>
}

Row.propTypes = {
	dims: PropTypes.number.isRequired,
	row: PropTypes.number.isRequired,
	percent: PropTypes.number,
	data: PropTypes.instanceOf(Data).isRequired,
	showLabels: PropTypes.bool,
	showImages: PropTypes.bool,
	selected: PropTypes.instanceOf(Coord),
	onSelect: PropTypes.func
}

Row.defaultProps = {
	showLabels: true,
	showImages: true
}

export default withStyles(styles)(Row);