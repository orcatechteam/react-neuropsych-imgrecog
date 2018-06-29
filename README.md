# ORCATECH Image Recognition Test

[![Build Status](https://travis-ci.org/orcatechteam/react-neuropsych-imgrecog.svg?branch=v0.0.1)](https://travis-ci.org/orcatechteam/react-neuropsych-imgrecog)

This repository holds a set of react components for administering and collecting data from an image recognition test. The test is performed by showing the user a grid of images, have them perform a different task, then show them the same grid without the images and ask where a particular image was.

## Components

There are two main components for this test: Display and Question.  

### Display

This component takes an array of image links and shuffles them into a grid. When this grid is done displaying, it calls the onComplete handler in the componentWillUnmount() lifecycle with a data object outlined below.

**Props**

| Name          | Type     | Description                                                                 |
| ------------- | -------- | --------------------------------------------------------------------------- |
| dimension     | Int      | The dimensions of the grid. (4x4, 5x5, etc...)                              |
| images        | Array    | An array of the names of the images that will be displayed in the grid. This array does not need to be as large as the total number of boxes in the grid because the additional boxes will just be empty spaces. However, the length of this array must be less than or equal to the number of boxes in the grid. |
| showLabels    | Boolean  | Whether you would like the grid to have the labels for the rows and columns |
| onComplete    | Function | Callback that is called with the data object right before the component is unmounted |

### Question

This component takes a data object from the first component to display a grid with an image prompt. The user can then select a box in the grid. Every time the user selects a box, the onSelect handler will be called with an updated data object. When the component is about to be unmounted the onComplete handler is collect with the final data object.

**Props**

| Name       | Type     | Description                                                                 |
| ---------- | ---------| --------------------------------------------------------------------------- |
| data       | Data     | The data object from the onComplete handler of the Display component        |
| showLabels | Boolean  | Whether you would like the grid to have the labels for the rows and columns |
| onSelect   | Function | Callback called with data object everytime the user selects a box.          |
| onComplete | Function | Callback called with data object right before the component is unmounted.   |

## Data

### Data

This is the top level data object returned from the Display component and received by all onComplete and onSelect handlers

```javascript

class Data {

	// A unix timestamp representing when the display component was mounted
	displayStart = undefined;

	// A unix timestamp representing when the display component was unmounted
	displayStop = undefined;

	// A unix timestamp representing when the question component was mounted
	questionStart = undefined;

	// A unix timestamp representing when the question component was unmounted
	questionStop = undefined;

	// the correct coordinate
	coord = undefined;

	// the currently selected coordinate
	selected = undefined;

	// True is they selected the correct coordinate
	// False if they selected the wrong coordinate
	// Undefined if a selection has not been made
	correct = undefined;

	// a grid of Coordinate objects
	//
	// from display this is a 2D array of NxN dimensions where N is the dimension
	// property given to the display component
	//
	// from questions the 2D array is flattened into an array of size N*N
	grid = new Array();

	// a list of selections made by the user when they were given an empty grid.
	selections = [];
}
```

### Coordinate

This represents a box in the grid. A Coordinate has a row and column position as well as the image displayed at it's position. Coordinate positions are relative to an origin in the upper left hand corner of the grid.

```javascript
// Coordinate is a coordinate within a 2D grid and optionally contains an image.
//	The point of origin for the grid is the upper left hand corner
class Coordinate {
	 // The row number this coordinate resides in
	 row = undefined;

	 // The column number this coordinate resides in
	 col = undefined;

	 // An optional image associated with this coordinate. This will be the image
	 // file name or an empty string
	 img = undefined;
}
```

### Selection

This represents a Coordinate selection made by the user in the Question component

```javascript
{
	// the time in which the selection was made as a unix timestamp
	stamp: (new Date()).getTime(),

	// the coordinate selected by the user
	pickedCoord: this.props.data.selected,

	// the correct coordinate (images matches the prompt)
	correctCoord: this.props.data.coord,

	// True if pickedCoord === correctCoord, false otherwise
	correct: this.props.data.correct
}
```

## Testing

To test the functionality, run:

```sh
make build && make serve
```

and an example test will be hosted at http://localhost:8081/index.html. The page will displays the first component for a short period then unmounts it and displays the second question.

## Example

This example displays the first component for 5 seconds and then shows the second component. When testing you will want the user to perform an intermediate task to prevent them from keeping the cursor in the same position.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Question, Display } from '@orcatech/react-neuropsych-imgrecog';

const images = [
		'large_black_triangle.png',
		'large_green_triangle.png',
		'large_red_triangle.png',
		'large_grey_triangle.png',
		'small_blue_triangle.png',
		'small_orange_triangle.png',
		'small_purple_triangle.png'
	],
	dimension = 4,
	timeout = 5000,
	display = document.getElementById('display'),
	question = document.getElementById('question');

// handler for when the user clicks on a box in the question component
let handleQuestionSelect = (data) => {
	console.log(data);
}

// handler for when the question component is unmounted
let handleQuestionComplete = (data) => {
	console.log(data);
}

// handler for when the display component is unmounted
let handleDisplayComplete = (data) => {
	console.log(data);
	ReactDOM.render(
		<Question
			showLabels={true}
			data={data}
			onComplete={handleQuestionComplete}
			onSelect={handleQuestionSelect}/>, question);
}

ReactDOM.render(
	<Display
		showLabels={false}
		dimension={dimension}
		images={images}
		onComplete={handleDisplayComplete}/>, display);

// stop displaying the first component after 5 seconds
setTimeout(() => { ReactDOM.unmountComponentAtNode(display) }, timeout);
```
