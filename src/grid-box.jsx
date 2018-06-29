import React from 'react';
import PropTypes from 'prop-types';
import Coord from './grid-coord';
import Theme from './theme';
import { withStyles } from '@material-ui/core/styles';


let styles = {
	box: {
		background: Theme.boxBackground,
		float: "left",
		marginRight: "-1px",
		marginTop: "-1px",
		padding: 0,
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	"selectable": {
		"&:hover": {
			cursor: "pointer",
			background: Theme.boxSelectableBackground
		},
		"&:active": {
			background: Theme.boxSelectedBackground
		}
	},
	"selected": {
		background: Theme.boxSelectedBackground,
		"&:hover": {
			cursor: "pointer",
			background: Theme.boxSelectedBackground
		}
	}
}

let dimensions = (size) => {
	return {
		width: Math.floor(90 / size) + 'vw',
		height: Math.floor(90 / size) + 'vw',
		maxHeight: Math.floor(90 / size) + 'vh',
		maxWidth: Math.floor(90 / size) + 'vh'
	};
}

let renderContent = (props) => {
	if (props.show) {
		return props.children;
	}
	return null;
}

let Box = (props) => {
	let cls = [props.classes.box];
	cls.push(props.className);
	if (typeof props.selected !== 'undefined' && props.selected.key() === props.coord.key()) {
		cls.push(props.classes.selected);
	} else if (typeof props.onSelect !== 'undefined') {
		cls.push(props.classes.selectable);
	}

	let handleClick = () => {
		if (typeof props.onSelect !== 'undefined') {
			props.onSelect(props.coord)
		}
	}
	return <div className={cls.join(" ")} style={dimensions(props.dims+1)} onClick={handleClick}>{renderContent(props)}</div>;
}

Box.propTypes = {
	dims: PropTypes.number.isRequired,
	show: PropTypes.bool,
	coord: PropTypes.instanceOf(Coord),
	onSelect: PropTypes.func,
	selected: PropTypes.instanceOf(Coord)
}

Box.defaultProps = {
	show: true
}

export default withStyles(styles)(Box);