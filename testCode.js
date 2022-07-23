window.addEventListener('load', function() {
    let modal = new coolModal('My Modal', 'medium');

    modal.add_button('Save', function (event) {
        console.log(event.data.modal.get_inputs());
        event.data.modal.close_modal();
    }, 'right').add_button('Cancel', function (event) {
        event.data.modal.close_modal();
    }, 'right').add_input([{
        'id': 'name',
        'size': 'half',
        'type': 'text',
        'label': 'Name: ',
        'value': '',
        'placeholder': 'Name'
    },{
        'id': 'last_name',
        'size': 'half',
        'type': 'text',
        'label': 'Last Name: ',
        'value': '',
        'placeholder': 'Last Name'
    }]);
});
