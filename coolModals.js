class coolModal {
    backdrop;
    modal;

    constructor (header = 'Modal', width = null) {
        let modal = '<div class="modal_backdrop">'; // Create Initial HTML
        modal += '<div class="modal">';
        modal += '<div class="modal_header">';
        modal += header
        modal += '</div>';
        modal += '<div class="modal_body">';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';

        this.header = header

        this.backdrop = $(modal); // Save entire modal
        this.backdrop.on('click', {modal: this}, function (event) { // Make the modal close on backdrop click
            event.data.modal.check_backdrop_click(event);
        })
        $(document.body).append(this.backdrop); // Append modal to
        this.modal = this.backdrop.find('div.modal'); // Save only the modal, for quicker access

        this.set_width(width); // Change width of modal
    }

    set_width(width) {
        switch (width) {
            case 'small':
                this.modal.css({
                    'width': '20%',
                    'maxWidth': '20rem'
                });
                break
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
    }

    check_backdrop_click (event) { // Check if the backdrop is really pressed
        if ($(event.target).hasClass('modal_backdrop')) {
            this.close_modal();
        }
    }

    add_button(text, func, side) { // Add button to modal
        if (this.modal.find('div.modal_buttons').length < 1) { // Check if modal already has buttons
            let buttons = '<div class="modal_buttons">';
            buttons += '<div class="modal_left_buttons">';
            buttons += '</div>';
            buttons += '<div class="modal_right_buttons">';
            buttons += '</div>';
            buttons += '</div>';
            this.modal.append(buttons);
        }
        let button = $('<button class="modal_button">' + text + '</button>');
        button.on('click', {modal: this}, func);
        this.modal.find('div.modal_' + side + '_buttons').append(button);
    }

    add_input (inputs) {
        if (Array.isArray(inputs)) {
            for (let input = 0; input < inputs.length; input++) {
                this.new_input(inputs[input]);
            }
        } else {
            this.new_input(inputs);
        }
    }

    new_input (obj) {
        if (obj['id'] === undefined) {
            return;
        }
        let input = '<div class="modal_input_wrapper_' + (obj['size'] || 'full') + '">';
        switch (obj['type']) {
            case 'text':
            case 'password':
            case 'url':
            case 'tel':
            case 'search':
            case 'number':
            case 'email':
                input += '<label class="modal_input_label" for="' + obj['id'] + '">';
                input += (obj['label'] || 'Input') + '</label>';
                input += '<input class="modal_input" type="' + (obj['type'] || 'text');
                input += '" value="' + (obj['value'] || '');
                input += '" placeholder="' + (obj['placeholder'] || '');
                input += '" id="' + obj['id'] + '" name="' + obj['id'] + '">';
                break;
            case 'checkbox':
            case 'radio':
                if (Array.isArray(obj['value'])) {
                    for (let val = 0; val < obj['value'].length; val++) {
                        input += '<input class="modal_input" type="' + (obj['type'] || 'text');
                        input += (obj['value'][val] ? '" checked' : '" ');
                        input += ' id="' + obj['id'] + val + '" name="' + obj['id'] + val + '">';
                        input += '<label class="modal_input_label" for="' + obj['id'] + '">';
                        input += (obj['label'][val] || 'Input') + '</label>';
                        if (val < obj['value'].length - 1) {
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
        input += '</div>';

        this.modal.find('div.modal_body').append(input);
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