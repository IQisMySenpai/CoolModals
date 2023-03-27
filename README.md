# CoolModals

## Table of Contents

1. [About The Project](#about-the-project)
    - [Built With](#built-with)
2. [Examples](#examples)
    - [Creating a Modal](#creating-a-modal)
    - [Adding a Button](#adding-a-button)
    - [Adding an Input Field](#adding-an-input-field)
    - [Getting Input values](#getting-input-values)
    - [Full Example](#full-example)

## About The Project

Made my own Modal library to have cleaner code in the [Knox Password Manager](https://github.com/IQisMySenpai/KnoxPasswordManager)

### Built With

* [Javascript](www.javascript.com)
* [jQuery](www.jquery.com)

## Examples

Some Examples of how I use the library.

### Creating a Modal

Creating a new modal is done with the following parameters:
- *header*: Header-text of the modal.
- *width*: Width of the modal. This can be:
    - `small` width: 20%; maxWidth: 20rem;
    - `medium` width: 60%; maxWidth: 35rem;
    - `large` width: 90%; maxWidth: 50rem;
    - `auto` (default) maxWidth: 90%;

### Adding a Button

The add_button function has the following parameters:
- *text*: The text you want on the button.
- *func*: Function that is executed on click. The function has the `this` keyword set to the modal.
- *side*: The side you want the buttons on. This can either be `left` or `right`.

```js
modal.add_button('Cancel', function (event) {
    this.close();
}, 'right');
```

Note that `add_button` returns the modal for function-stacking as seen in full example.


### Adding an Input Field

The add_input function has the following parameters:
- *obj*: Object with info about the input or an array of input objects.
  - *id*: The id of the html node
  - *size*: The side of the input. This can either be `full` or `half`.
  - *type*: A HTML input type.
  - *label*: Label that should be next to the input. (Array for Checkbox/Radio Groups)
  - *value*: Initial value of the input. (Array for Select or Checkbox/Radio Groups)
  - *placeholder*: Placeholder if supported by the input-type.

```js
modal.add_input({
    'id': 'my_input',
    'size': 'full',
    'type': 'text',
    'label': 'My Favorite Input',
    'value': '',
    'placeholder': 'Enter Text Here'
});
```

Note that `add_input` returns the modal for function-stacking as seen in full example.

### Getting Input values

Getting the Inputs of the user is really simple and is done with 

```js
modal.get_inputs()
```
or if you want multiple inputs
```js
modal.get_inputs([])
```


### Full Example
This code works and is really simple to understand.
```js
let modal = new coolModal('My Modal', 'medium');

modal.add_button('Save', function (event) {
    console.log(this.get_inputs());
    this.close_modal();
}, 'right');

modal.add_button('Cancel', function (event) {
    this.close_modal();
}, 'right');

modal.add_input({
    'id': 'name',
    'size': 'half',
    'type': 'text',
    'label': 'Name: ',
    'value': '',
    'placeholder': 'Name'
});

modal.add_input({
    'id': 'last_name',
    'size': 'half',
    'type': 'text',
    'label': 'Last Name: ',
    'value': '',
    'placeholder': 'Last Name'
});
```

You could shorten this code by using an array of inputs and using the `add_inputs` function once.

```js
let modal = new coolModal('My Modal', 'medium');

let inputs = [
    {
        'id': 'name',
        'size': 'half',
        'type': 'text',
        'label': 'Name: ',
        'value': '',
        'placeholder': 'Name'
    },
    {
        'id': 'last_name',
        'size': 'half',
        'type': 'text',
        'label': 'Last Name: ',
        'value': '',
        'placeholder': 'Last Name'
    }
];

modal.add_button('Save', function (event) {
    console.log(this.get_inputs());
    this.close_modal();
}, 'right').add_button('Cancel', function (event) {
    this.close_modal();
}, 'right');

modal.add_inputs(inputs);
```