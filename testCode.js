window.addEventListener('load', function() {
    let modal = new coolModal('My Modal', 'medium');

    modal.add_button('Save', function (event) {
        console.log(this.get_inputs());
        this.close_modal();
    }, 'right').add_button('Cancel', function (event) {
        this.close_modal();
    }, 'right').add_inputs([{
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
