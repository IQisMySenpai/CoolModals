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

    add_input (size = 'full', type = 'text', label = 'Input', value = '', placeholder = '') {
        let input = '<div class="modal_input_wrapper_' + size + '">';
        switch (type) {
            case 'text':
            case 'password':
                input += '<label class="modal_input_label">' + label + '</label>';
                input += '<input class="modal_input" type="' + type;
                input += '" value="' + value;
                input += '" placeholder="' + placeholder + '">';
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

window.addEventListener('load', function() {
    let modal = new coolModal('Modal', 'medium');
    modal.add_button('Save', function (event) {
        console.log('Test');
    }, 'right');
    modal.add_button('Cancel', function (event) {
        event.data.modal.close_modal();
    }, 'right');
    modal.add_input('half', 'text', 'Test:', );
    modal.add_input('half', 'text', 'Test2:', );
});
