# CoolModals

## Table of Contents

1. [About The Project](#about-the-project)
    - [Built With](#built-with)
2. [Examples](#examples)
    - [Creating a Modal](#creating-a-modal)
    - [Adding a Button](#adding-a-button)
    - [Adding an Input Field](#adding-an-input-field)
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
- *func*: Function that is executed on click. The function has the parameter events, with the `event.data.modal` as a self-reference.
- *side*: The side you want the buttons on. This can either be `left` or `right`.

```js
modal.add_button('Cancel', function (event) {
    event.data.modal.close_modal();
}, 'right');
```

### Adding an Input Field

The add_input function has the following parameters:
- *size*: The side of the input. This can either be `full` or `half`.
- *type*: A HTML input type.
- *label*: Label that should be next to the input
- *value*: Initial value of the input.
- *placeholder*: Placeholder if supported by the input-type.

```js
modal.add_input('half', 'text', 'Name:', '', 'Name');
```

### Full Example

```js
let modal = new coolModal('My Modal', 'medium');

modal.add_button('Save', function (event) {
    console.log(event.data.modal.get_inputs());
    event.data.modal.close_modal();
}, 'right');

modal.add_button('Cancel', function (event) {
    event.data.modal.close_modal();
}, 'right');

modal.add_input('half', 'text', 'Name:', '', 'Name');
modal.add_input('half', 'text', 'Surname:', '', 'Surname');
```