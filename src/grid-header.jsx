import React from 'react';
import PropTypes from 'prop-types';
import Data from './data';
import { withStyles } from '@material-ui/core/styles';
import LabelBox from 'grid-box-label';

const letters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
];

const styles = {
	"gridHeader": {
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "center"
	},
	"selectable": {
		"&:after": {
			clear: "both",
			content: "''",
			display: "table"
		}
	}
};

let Header = (props) => {
	let {
		data,
		classes,
		selectable,
		showLabels,
		...childProps
	} = props;

	let cls = [classes.gridHeader];
	if (selectable) {
		cls.push(classes.selectable);
	}

	let boxes = new Array(data.grid.length + 1);

	// the first label will be blank
	boxes[0] = <LabelBox {...childProps} key='columnLabelBlank' show={showLabels} />;

	// add the column labels
	for (let i = 1; i < data.grid.length + 1; i++) {
		boxes[i] = (<LabelBox
			{...childProps}
			key={'columnLabel' + i}
			show={showLabels}
		            >
			{Array(Math.ceil(i / letters.length)+1).join(letters[(i-1) % letters.length])}
		</LabelBox>);
	}

	return (<div className={cls.join(" ")} key='row0'>{boxes}</div>);
};

Header.propTypes = {
	data: PropTypes.instanceOf(Data).isRequired,
	dims: PropTypes.number.isRequired,
	percent: PropTypes.number,
	selectable: PropTypes.bool,
	showImages: PropTypes.bool,
	showLabels: PropTypes.bool,
};

Header.defaultProps = {
	selectable: false,
	showLabels: true,
	showImages: true
};

export default withStyles(styles)(Header);