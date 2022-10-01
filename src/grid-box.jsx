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
};

let dimensions = (percent, size) => {
	return {
		width: Math.floor(percent / size) + 'vw',
		height: Math.floor(percent / size) + 'vw',
		maxHeight: Math.floor(percent / size) + 'vh',
		maxWidth: Math.floor(percent / size) + 'vh'
	};
};

let renderContent = (props) => {
	if (props.show) {
		return props.children;
	}
	return null;
};

let Box = (props) => {
	let cls = [props.classes.box];
	cls.push(props.className);
	if (typeof props.selected !== 'undefined' && props.selected.key() === props.coord.key()) {
		cls.push(props.classes.selected);
	} else if (typeof props.onSelect !== 'undefined') {
		cls.push(props.classes.selectable);
	}

	let handleClick = (evt) => {
		if (typeof props.onSelect !== 'undefined') {
			const { pageX, pageY } = evt.nativeEvent;
			props.onSelect({ coord: props.coord, pageX, pageY });
		}
	};
	return (
		<div
			className={cls.join(" ")}
			onClick={handleClick}
			style={dimensions(props.percent, props.dims+1)}
		>
			{renderContent(props)}
		</div>
	);
};

Box.propTypes = {
	coord: PropTypes.instanceOf(Coord),
	dims: PropTypes.number.isRequired,
	onSelect: PropTypes.func,
	percent: PropTypes.number,
	selected: PropTypes.instanceOf(Coord),
	show: PropTypes.bool
};

Box.defaultProps = {
	show: true,
	percent: 90
};

export default withStyles(styles)(Box);
