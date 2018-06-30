import React from 'react';
import PropTypes from 'prop-types';
import Box from './grid-box';
import { withStyles } from '@material-ui/core/styles';

let styles = {
	"label": {
		fontSize: "2rem",
		fontFamily: 'HelveticaNeue, sans serif'
	}
}

// returns a border grid box (one of the boxes on the edge that will hold a label)
let LabelBox = (props) => {
	let {
		classes,
		...childProps
	} = props;
	return <Box {...childProps} className={props.classes.label}>{props.children}</Box>
};

LabelBox.propTypes = {
	dims: PropTypes.number.isRequired,
	show: PropTypes.bool,
	percent: PropTypes.number,
	classes: PropTypes.any.isRequired
}

LabelBox.defaultProps = {
	show: true
}

export default withStyles(styles)(LabelBox);