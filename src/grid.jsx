import React from 'react';
import PropTypes from 'prop-types';
import Header from './grid-header';
import Row from './grid-row';
import Coord from './grid-coord';
import Data from './data';

let Grid = (props) => {

	let {
		selected,
		onSelect,
		onBoxCoord,
		...childProps
	} = props;

	let rows = [];
	for (let i = 0; i < props.data.grid.length; i++) {
		rows.push(
			<Row
				dims={props.data.grid.length}
				key={"row" + i}
				onBoxCoord={onBoxCoord}
				onSelect={onSelect}
				row={i}
				selected={selected}
				{...childProps}
			/>
		);
	}

	let header = null;
	if (props.showLabels) {
		header = (
			<Header
				dims={props.data.grid.length}
				selectable={typeof props.onSelect !== 'undefined'}
				{...childProps}
			 />
		);
	}

	return (
		<div>
			{header}
			{rows}
		</div>
	);
};

Grid.propTypes = {
	data: PropTypes.instanceOf(Data).isRequired,
	onBoxCoord: PropTypes.func,
	onSelect: PropTypes.func,
	percent: PropTypes.number,
	selected: PropTypes.instanceOf(Coord),
	showImages: PropTypes.bool.isRequired,
	showLabels: PropTypes.bool.isRequired,
};

export default Grid;
