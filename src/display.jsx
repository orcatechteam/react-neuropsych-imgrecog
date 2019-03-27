import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Data from './data';
import Grid from './grid';

const styles = {
	imageDescription: {
		fontSize: '1.25rem',
		textAlign: 'center',
		'& p': {
			marginBottom: '1em'
		}
	}
};

class Display extends React.PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		currentImageIndex: PropTypes.number,
		delayedStart: PropTypes.bool,
		dimension: PropTypes.number.isRequired,
		images: PropTypes.array.isRequired,
		onComplete: PropTypes.func.isRequired,
		onRenderContentBelowGrid: PropTypes.func,
		onRenderInstructions: PropTypes.func,
		onStart: PropTypes.func,
		percent: PropTypes.number,
		showLabels: PropTypes.bool.isRequired,
		timeout: PropTypes.number,
	}

	static defaultProps = {
		currentImageIndex: null,
		delayedStart: false,
		onRenderContentBelowGrid: undefined,
		onRenderInstructions: undefined,
		onStart: () => {},
		timeout: 0,
	}

	constructor(props) {
		super(props);
		this.data = Data.generate(props.images, props.dimension, props.currentImageIndex);
	}

	state = {
		startDisplay: false
	}

	// lifecycle functions
	componentDidMount() {
		if (this.props.delayedStart === false) {
			this.handleTimeoutStart();
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
		this.onTimeout();
	}

	handleTimeoutStart = () => {
		this.data.displayStart = (new Date()).getTime();
		clearTimeout(this.timeout);
		if (this.props.timeout > 0) {
			setTimeout(this.onTimeout, this.props.timeout);
		}
		this.setState({ startDisplay: true });
		this.props.onStart();
	}

	onTimeout = () => {
		this.data.displayStop = (new Date()).getTime();
		this.props.onComplete(this.data);
	}

	renderInstructions = () => {
		// NOTE: let's assume the image file name is also the description
		const { img } = this.data.coord;
		const { classes } = this.props;
		const imgFile = (img.indexOf('http') > -1) ? img.substr(img.lastIndexOf('/') + 1) : img;
		const imageDescription = imgFile.replace(/_/g, " ").split('.').slice(0, -1);
		if (this.props.onRenderInstructions !== undefined) {
			return this.props.onRenderInstructions({ classes, imageDescription });
		}
		return (
			<div className={classes.imageDescription}>
				<p>Carefully examine this grid of shapes. You will be asked where the {imageDescription} is later.</p>
				<p>This page will advance automatically.</p>
			</div>
		);
	}

	onRenderContentBelowGrid = () => {
		if (!this.state.startDisplay) {
			return null;
		}
		const { classes } = this.props;
		if (this.props.onRenderContentBelowGrid !== undefined) {
			return this.props.onRenderContentBelowGrid({ classes });
		}
		return null;
	}

	render() {
		return (
			<React.Fragment>
				{this.renderInstructions()}
				{this.state.startDisplay ? (
					<Grid
						data={this.data}
						percent={this.props.percent}
						showImages
						showLabels={this.props.showLabels}
					/>
				) : (
					<div style={{ textAlign: 'center' }}>
						<button onClick={this.handleTimeoutStart}>Start</button>
					</div>
				)}
				{this.onRenderContentBelowGrid()}
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Display);
