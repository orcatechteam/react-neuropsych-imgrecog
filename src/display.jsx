import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Data from './data';
import Grid from './grid';

export default class Display extends React.PureComponent {

	static propTypes = {
		dimension: PropTypes.number.isRequired,
		images: PropTypes.array.isRequired,
		timeout: PropTypes.number,
		onComplete: PropTypes.func.isRequired,
		showLabels: PropTypes.bool.isRequired,
		percent: PropTypes.number
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
		return <Grid percent={this.props.percent} showLabels={this.props.showLabels} showImages={true} data={this.data}/>;
	}
}