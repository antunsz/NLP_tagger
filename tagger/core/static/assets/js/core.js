function make_swal(title, html, button_class) {
    return swal({
        title: title,
        html: html,
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success ' + button_class,
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    });
}

function make_datatable(){
    var table = $('.datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                "url": "https://cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
            }
        });
    
}