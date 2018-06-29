import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grid-box';
import Coord from 'grid-coord';
import { withStyles } from '@material-ui/core/styles';
import Theme from './theme';

let styles = {
	"imageBox": {
		border: "1px solid " + Theme.boxBorderColor,
	},
	"image": {
		top: "50%",
		maxWidth: "100%",
		maxHeight: "100%",
		padding: "0 0 0 0"
	}
}
// returns a grid box for displaying an image or allowing the user to make a selection
let ImageBox = (props) => {
	let {
		classes,
		showBorder,
		...childProps
	} = props;
	let cls = [];
	if (showBorder) {
		cls.push(classes.imageBox)
	}
	return <Box className={cls.join(" ")} {...childProps}>
			{<img className={classes.image} src={props.coord.img} alt=''></img>}
		</Box>;
}

ImageBox.propTypes = {
	dims: PropTypes.number.isRequired,
	show: PropTypes.bool,
	showBorder: PropTypes.bool,
	coord: PropTypes.instanceOf(Coord),
	onSelect: PropTypes.func,
	selected: PropTypes.instanceOf(Coord)
}

ImageBox.defaultProps = {
	show: true,
	showBorder: true
}
export default withStyles(styles)(ImageBox);