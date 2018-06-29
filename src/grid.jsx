import React from 'react'
import PropTypes from 'prop-types';
import Header from './grid-header';
import Row from './grid-row';
import Coord from './grid-coord';
import Data from './data';

let Grid = (props) => {

	let {
		selected,
		onSelect,
		...childProps
	} = props;

	let rows = [];
	for (let i = 0; i < props.data.grid.length; i++) {
		rows.push(<Row key={"row" + i} selected={selected} onSelect={onSelect} row={i} dims={props.data.grid.length}  {...childProps}/>);
	}

	let header = null;
	if (props.showLabels) {
		header = <Header dims={props.data.grid.length} selectable={typeof props.onSelect !== 'undefined'} {...childProps}/>;
	}

	return <div>
		{header}
		{rows}
	</div>;
}

Grid.propTypes = {
	showLabels: PropTypes.bool.isRequired,
	showImages: PropTypes.bool.isRequired,
	data: PropTypes.instanceOf(Data).isRequired,
	selected: PropTypes.instanceOf(Coord),
	onSelect: PropTypes.func
}

export default Grid;