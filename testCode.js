window.addEventListener('load', function() {
    let modal = new coolModal('Modal', 'medium');
    modal.add_button('Save', function (event) {
        console.log('Test');
    }, 'right');
    modal.add_button('Cancel', function (event) {
        event.data.modal.close_modal();
    }, 'right');
    modal.add_input();
});
