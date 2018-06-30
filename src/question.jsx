import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Data from './data';
import Grid from './grid';
import ImageBox from './grid-box-image';
import { withStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash.clonedeep';

let styles = {
	"question": {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center"
	},
	"imageBox": {
		verticalAlign: "middle",
		float: "none",
		display: "inline-block"
	},
	"imageBoxWrapper": {
		"textAlign": "center",
		"fontSize": "1.5rem"
	}
}

class Question extends React.Component {

	static propTypes = {
		onSelect: PropTypes.func.isRequired,
		onComplete: PropTypes.func.isRequired,
		data: PropTypes.instanceOf(Data).isRequired,
		showLabels: PropTypes.bool.isRequired,
		percent: PropTypes.number
	}

	state = {
		selected: undefined
	}

	// lifecycle functions
	componentDidMount() {
		this.props.data.questionStart = (new Date()).getTime();
	}

	componentWillUnmount() {
		this.props.data.questionStop = (new Date()).getTime();
		this.props.data.grid = [].concat(...this.props.data.grid);
		this.props.onComplete(this.props.data);
	}

	equals(coord1, coord2) {
		if (typeof coord1 === 'undefined' || typeof coord2 === 'undefined') {
			return false
		}
		return coord1.key() === coord2.key();
	}

	handleSelect = (coord) => {
		coord = this.equals(coord, this.state.selected) ? undefined : coord;

		this.props.data.selected = coord;
		this.props.data.correct = this.equals(coord, this.props.data.coord);

		// update selection
		this.setState({ selected: coord });

		// append for final onComplete
		this.props.data.selections.push({
			stamp: (new Date()).getTime(),
			pickedCoord: this.props.data.selected,
			correctCoord: this.props.data.coord,
			correct: this.props.data.correct
		});

		let data = cloneDeep(this.props.data);
		data.questionStop = (new Date()).getTime();
		data.grid = [].concat(...data.grid);
		this.props.onSelect(data)
	}

	render() {
		return <div className={this.props.classes.question}>
      <div className={this.props.classes.imageBoxWrapper}>
				<span>Where in this grid did you initially see the following shape: </span>
				<ImageBox className={this.props.classes.imageBox} percent={this.props.percent} dims={this.props.data.grid.length} showBorder={false} coord={this.props.data.coord}/>
			</div>
			<Grid percent={this.props.percent} showLabels={this.props.showLabels} showImages={false} data={this.props.data} onSelect={this.handleSelect} selected={this.state.selected}/>
    </div>;
	}
}

export default withStyles(styles)(Question);