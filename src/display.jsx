import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Data from './data';
import Grid from './grid';

export default class Display extends React.Component {

	static propTypes = {
		dimension: PropTypes.number.isRequired,
		images: PropTypes.array.isRequired,
		onComplete: PropTypes.func.isRequired,
		showLabels: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props);
		this.data = new Data(props.images, props.dimension);
	}

	// lifecycle functions
	componentDidMount() {
		this.data.displayStart = (new Date()).getTime()
	}

	componentWillUnmount() {
		this.data.displayStop = (new Date()).getTime()
		this.props.onComplete(this.data); // send the data regarding the display time and correct answers
	}

	render() {
		return <Grid showLabels={this.props.showLabels} showImages={true} data={this.data}/>;
	}
}