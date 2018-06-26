The first component is the ImageRecognition component. This component takes an array of image links and shuffle them into a grid. When this grid is done displaying, it calls a function in the componentWillUnmount() function that returns a timestamp, the time displayed, the correct image name, the correct image coordinate in the grid, and the 2D array of the image links. (empty strings indicate no image at that box).

The second component is ImageRecognitionQuestion. This component takes the correct image name, coordinate, and image links grid from the first component. This component will display a grid and an image prompt. The user can select a box in the grid. Every time the user selects a box, the selection handler will be called with data on the click. This function's data will include the timestamp, whether it was a selection or deselection, the selected coordinate, the image at the coordinate if there is any, and whether the answer is correct or incorrect. When the component is about to be unmounted, a function is called that has data on the timestamp, an array of the user box selection history, the correct image name, the correct image coordinate, the image links grid, and whether the user correctly answered the question based on the last user selection.

index.js
This just tests the two components, it first displays the first component for some time, and the unmounts it and displays the second question.


**Image Recognition Props**


| Name | Type | Description|
| ------------- | ------------- | ------------- |
| dimension | Int | The dimensions of the grid. (4x4, 5x5, etc...) |
| images | Array | An array of the names of the images that will be displayed in the grid. This array does not need to be as large as the total number of boxes in the grid because the additional boxes will just be empty spaces. However, the length of this array must be less than or equal to the number of boxes in the grid. |
| showLabels | Boolean | Whether you would like the grid to have the labels for the rows and columns |
| onComplete | Function | Callback that is called right before the component is unmounted. It is passed a data object with these properties: </br>**timeDisplayed**: the time the component was displayed for</br>**correctImgName**: the name of the image the user will be asked about later</br>**correctCoordinate**: the coordinates of the correctImgName (ex: B4)</br>**imageLinksGrid**: A 2D array representation of the grid that was displayed to the user. Empty strings are boxes where no image was displayed.</br>**timestamp**: A timestamp |


**Image Recognition Question Props** 


| Name | Type | Description |
| ------------- | ------------- | ------------- |
| dimension | Int | The dimensions of the grid. (4x4, 5x5, etc...) |
| images | Array | An array of the names of the images that will be displayed in the grid. This array does not need to be as large as the total number of boxes in the grid because the additional boxes will just be empty spaces. However, the length of this array must be less than or equal to the number of boxes in the grid. |
| showLabels | Boolean | Whether you would like the grid to have the labels for the rows and columns |
| correctImgName | String | The name of the image the user will be asked to find in the grid |
| correctCoordinate | String | The coordinate of the `correctImgName`|
| imageLinksGrid | Array | 2D array representation of the grid that was displayed to the user in the previous component. |
| onSelect | Function | Callback for everytime the user selects a box. It is passed the data with these properties  <br/>**timestamp**: A timestamp <br/>**coordinate**: The coordinate of the selected box <br/>**image**: The image at the coordinate if there is any</br>**action**: Whether this was a selection of deselection <br/>**status**: Whether the selection is correct or incorrect<br/> |
| onComplete | Function | Callback called right before the component is unmounted. The data passed includes these properties: <br/>**timestamp**: A timestamp<br/>**clicks**: An array of the all the users box selections. Each object in the array is in the same format as the data passed in the `onComplete` callback.<br/>**correctImgName**: The name of the image the user will be asked to find in the grid.</br>**correctCoordinate**: The coordinate of the `correctImgName`</br>**imageLinksGrid**: 2D array representation of the grid that was displayed to the user in the previous component.</br>**status**: Whether the selection is correct or incorrect
