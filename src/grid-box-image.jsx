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
		padding: "2px"
	}
};

// returns a grid box for displaying an image or allowing the user to make a selection
class ImageBox extends React.Component {
	constructor(props) {
		super(props);
		this.imgBoxRef = React.createRef();
	}

	componentDidMount() {
		this.handleBoxCoord();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.handleBoxCoord();
	}

	handleBoxCoord = () => {
		const props = this.props;
		let {
			onBoxCoord,
		} = props;
		if (this.imgBoxRef.current && onBoxCoord !== undefined) {
			const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = this.imgBoxRef.current;
			const { coord } = props;
			const boxCoord = {
				offsetTop,
				offsetLeft,
				offsetWidth,
				offsetHeight,
				coord,
			};
			onBoxCoord(boxCoord);
		}

	}

	render() {
		const props = this.props;
		let {
			classes,
			showBorder,
			...childProps
		} = props;
		let cls = [];
		if (showBorder) {
			cls.push(classes.imageBox);
		}
		return (
			<div ref={this.imgBoxRef}>
				<Box
					className={cls.join(" ")}
					{...childProps}
				>
					{<img className={classes.image} src={props.coord.img} alt=''></img>}
				</Box>
			</div>
		);
	}
}

ImageBox.propTypes = {
	classes: PropTypes.object,
	coord: PropTypes.instanceOf(Coord),
	dims: PropTypes.number.isRequired,
	onBoxCoord: PropTypes.func,
	onSelect: PropTypes.func,
	percent: PropTypes.number,
	selected: PropTypes.instanceOf(Coord),
	show: PropTypes.bool,
	showBorder: PropTypes.bool,
};

ImageBox.defaultProps = {
	show: true,
	showBorder: true
};

export default withStyles(styles)(ImageBox);

