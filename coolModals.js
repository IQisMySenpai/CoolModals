class coolModal {
    // Elements
    backdrop = null;
    modal = null;
    header = null;
    body = null;
    buttons = null;

    // Other
    width_val;
    header_val;


    constructor (header = 'Modal', width = null) {
        this.initialize_elements();
        this.set_header(header);
        this.set_width(width); // Change width of modal

        this.backdrop.on('click', function (event) { // Make the modal close on backdrop click
            this.check_backdrop_click(event);
        }.bind(this))
        this.backdrop.data('modal', this);
    }

    initialize_elements() {
        this.backdrop = $('<div class="modal_backdrop"></div>');
        this.modal = $('<div class="modal"></div>');
        this.header = $('<div class="modal_header"></div>');
        this.body = $('<div class="modal_body"></div>');

        this.modal.append(this.header, this.body);
        this.backdrop.append(this.modal);

        $(document.body).append(this.backdrop);
    }

    set_header(text = 'Modal') {
        this.header_val = text;
        this.header.html(text);
    }

    set_width(width) {
        switch (width) {
            case 'small':
                this.modal.css({
                    'width': '20%',
                    'maxWidth': '20rem'
                });
                break;
            case 'medium':
                this.modal.css({
                    'width': '60%',
                    'maxWidth': '35rem'
                });
                break;
            case 'large':
                this.modal.css({
                    'width': '90%',
                    'maxWidth': '50rem'
                });
                break;
            case 'auto':
            default:
                this.modal.css({
                    'maxWidth': '90%'
                });
                break;
        }
        return this;
    }

    check_backdrop_click (event) {
        if ($(event.target).hasClass('modal_backdrop')) { // Check if the backdrop is really pressed
            this.close_modal();
        }
    }

    add_button(text, func, side) {
        if (this.buttons === null) { // Check if modal already has buttons
            this.buttons = $('<div class="modal_buttons"></div>');
            this.buttons.append($('<div class="modal_left_buttons"></div>'), $('<div class="modal_right_buttons"></div>'));
            this.modal.append(this.buttons);
        }
        let button = $('<button class="modal_button">' + text + '</button>');
        button.on('click', func.bind(this));
        this.modal.find('div.modal_' + side + '_buttons').append(button);
        return this;
    }

    add_input (input) {
        this.new_input(input);

        return this;
    }

    add_inputs (inputs) {
        for (let i = 0; i < inputs.length; i++) {
            this.new_input(inputs[i]);
        }
    }

    new_input (obj) {
        if (obj['id'] === undefined) {
            return this;
        }
        let wrapper = $('<div class="modal_input_wrapper_' + (obj['size'] || 'full') + '"></div>');
        let label, input;
        switch (obj['type']) {
            case 'text':
            case 'password':
            case 'url':
            case 'tel':
            case 'search':
            case 'number':
            case 'email':
                label = $('<label class="modal_input_label"></label>');
                label.attr({
                    'for': obj['id']
                });
                label.text(obj['label'] || 'Input');

                input = $('<input class="modal_input">');
                input.attr({
                    'type': (obj['type'] || 'text'),
                    'value': (obj['value'] || ''),
                    'placeholder': (obj['placeholder'] || ''),
                    'id': obj['id'],
                    'name': obj['id']
                })

                wrapper.append(label, input);
                break;
            case 'checkbox':
            case 'radio':
                if (Array.isArray(obj['value'])) {
                    for (let i = 0; i < obj['value'].length; i++) {
                        input = $('<input class="modal_input">');
                        input.attr({
                            'type': (obj['type'] || 'text'),
                            'checked': obj['value'][i],
                            'id': obj['id'] + i,
                            'name': obj['id'] + i
                        })

                        label = 

                        input += '<label class="modal_input_label" for="' + obj['id'] + '">';
                        input += (obj['label'][i] || 'Input') + '</label>';
                        if (i < obj['value'].length - 1) {
                            input += '<br>'
                        }
                    }
                } else {
                    input += '<input class="modal_input" type="' + (obj['type'] || 'text');
                    input += (obj['value'] ? '" checked' : '" ');
                    input += ' id="' + obj['id'] + '" name="' + obj['id'] + '">';
                    input += '<label class="modal_input_label" for="' + obj['id'] + '">';
                    input += (obj['label'] || 'Input') + '</label>';
                }
                break;
            case 'select':
                input += '<label class="modal_input_label" for="' + obj['id'] + '">';
                input += (obj['label'] || 'Input') + '</label>';
                input += '<select class="modal_input"';
                input += 'id="' + obj['id'] + '" name="' + obj['id'] + '">';
                for (let val = 0; val < obj['value'].length; val++) {
                    input += '<option value="';
                    input += obj['value'][val].toLowerCase() + '"';
                    input += (obj['selected'] === obj['value'][val] ? ' selected' : '');
                    input += '>' + obj['value'][val] + '</option>';
                }
                input += '</select>';
                break;
        }

        this.body.append(input);
    }

    get_inputs () {
        let inputs = this.modal.find('input,select'); // Finds all inputs

        let input;

        let values = {};

        for(let i = 0; i < inputs.length; i++) {
            input = $(inputs[i]);
            if (input.prop('tagName') === 'SELECT') {
                values[input.attr('name')] = input.find('option:selected').val();
            } else {
                switch (input.attr('type')) {
                    case 'checkbox':
                    case 'radio':
                        values[input.attr('name')] = input.prop("checked");
                        break;
                    default:
                        values[input.attr('name')] = input.val();
                }
            }
        }

        return values;
    }

    close_modal () {
        this.backdrop.remove();
    }
}