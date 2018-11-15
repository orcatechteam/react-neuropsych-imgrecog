import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Data from './data';
import Grid from './grid';

const styles = {
	imageDescription: {
		fontSize: '1.25rem',
		textAlign: 'center'
	}
};

class Display extends React.PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		dimension: PropTypes.number.isRequired,
		images: PropTypes.array.isRequired,
		onComplete: PropTypes.func.isRequired,
		percent: PropTypes.number,
		showLabels: PropTypes.bool.isRequired,
		timeout: PropTypes.number,
	}

	static defaultProps = {
		timeout: 0
	}

	constructor(props) {
		super(props);
		this.data = Data.generate(props.images, props.dimension);
	}

	// lifecycle functions
	componentDidMount() {
		this.data.displayStart = (new Date()).getTime();
		clearTimeout(this.timeout);
		if (this.props.timeout > 0) {
			setTimeout(this.onTimeout, this.props.timeout);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
		this.onTimeout();
	}

	onTimeout = () => {
		this.data.displayStop = (new Date()).getTime();
		this.props.onComplete(this.data);
	}

	render() {
		// assume file name is also the description
		const imageDescription = this.data.coord.img.replace(/_/g, " ").split('.').slice(0, -1);

		return (
			<React.Fragment>
				<p className={this.props.classes.imageDescription}>
					Carefully examine this grid of shapes. You will be asked where the {imageDescription} is later.
					<br />
					This page will advance automatically.
				</p>
				<Grid
					data={this.data}
					percent={this.props.percent} 
					showImages
					showLabels={this.props.showLabels} 
				/>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Display);
