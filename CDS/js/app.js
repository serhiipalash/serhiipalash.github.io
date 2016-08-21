// app.js

// constants
const APPNAME  = ' | Customer Data Service';
const DATABASE = 'CDS';
const STORE    = 'Customers';

// variables
var initialHash      = location.hash,
    listBtn          = document.getElementById('listBtn'),
    createBtn        = document.getElementById('createBtn'),
    readBtn          = document.getElementById('readBtn'),
    updateBtn        = document.getElementById('updateBtn'),
    deleteBtn        = document.getElementById('deleteBtn'),
    overallCheckbox  = document.getElementById('overall_checkbox'),
    customerForm     = document.querySelector('.view#customer_form form'),
    customerTable    = document.querySelector('#customer_list table tbody');


listBtn.onclick = function () {
    if (location.hash !== '#list') {
        location.hash = '#list';
    }
};

createBtn.onclick = function () {
    if (location.hash !== '#create') {
        location.hash = '#create';
    }
};

readBtn.onclick = function () {
    var checkedCheckboxes;

    if (/^#customer\/\d+\/update$/.test(location.hash)) {
        location.hash = location.hash.replace('/update', '');
    } else if (location.hash === '#list') {
        checkedCheckboxes = customerTable.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedCheckboxes.length === 1) {
            location.hash = '#customer/' + checkedCheckboxes[0].dataset.id;
        } else if (checkedCheckboxes.length > 1) {
            displayAlertBlock('warning', 'Select one customer to read.');
        } else if (checkedCheckboxes.length === 0) {
            displayAlertBlock('warning', 'Select the customer before reading.');
        }
    } else if (!/^#customer\/\d+$/.test(location.hash)) {
        displayAlertBlock('warning', 'Select the customer before reading.');
    }
};

updateBtn.onclick = function () {
    var checkedCheckboxes;

    if (/^#customer\/\d+$/.test(location.hash)) {
        location.hash += '/update';
    } else if (location.hash === '#list') {
        checkedCheckboxes = customerTable.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedCheckboxes.length === 1) {
            location.hash = '#customer/' + checkedCheckboxes[0].dataset.id + '/update';
        } else if (checkedCheckboxes.length > 1) {
            displayAlertBlock('warning', 'Select one customer to update.');
        } else if (checkedCheckboxes.length === 0) {
            displayAlertBlock('warning', 'Select the customer to update.');
        }
    } else {
        displayAlertBlock('warning', 'Select the customer to update.');
    }
};

deleteBtn.onclick = function () {
    var checkedCheckboxes, customerId, i, l;

    if (location.hash === '#list') {

        checkedCheckboxes = customerTable.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedCheckboxes.length > 0) {
            for (i = 0, l = checkedCheckboxes.length; i < l; i++) {
                (function (id) {
                    deleteData(DATABASE, STORE, id, function () {
                        removeCustomerFromCustomerTable(id);
                        displayAlertBlock('success', 'Customers were deleted successfully.');
                    });
                })( Number(checkedCheckboxes[i].dataset.id) );
            }
            overallCheckbox.checked = false;
        } else {
            displayAlertBlock('warning', 'Select the customer before deleting.');
        }

    } else if (/^#customer\/\d+(\/update)?$/.test(location.hash)) {

        customerId = Number(location.hash.match(/\d+/)[0]);

        deleteData(DATABASE, STORE, customerId, function () {
            removeCustomerFromCustomerTable(customerId);
            location.hash = '#list';
            displayAlertBlock('success', 'The customer was deleted successfully.');
        });
    } else {
        displayAlertBlock('warning', 'Select the customer before deleting.');
    }
};

customerForm.onsubmit = function (e) {
    e.preventDefault();

    var customer = {
        name: {},
        address: {}
    };

    customer.name.firstName = customerForm.elements['firstName'].value;
    customer.name.lastName  = customerForm.elements['lastName'].value;
    customer.email          = customerForm.elements['email'].value;
    customer.telephone      = customerForm.elements['telephone'].value;
    customer.address.street = customerForm.elements['street'].value;
    customer.address.city   = customerForm.elements['city'].value;
    customer.address.state  = customerForm.elements['state'].value;
    customer.address.zip    = customerForm.elements['zip'].value;

    if (location.hash === '#create') {
        customer.id = Date.now();

        writeData(DATABASE, STORE, customer, function () {
            location.hash = '#customer/' + customer.id;
            displayAlertBlock('success', 'The customer was created successfully.');
        });
    } else if (/^#customer\/\d+\/update$/.test(location.hash)) {
        customer.id = Number(location.hash.match(/\d+/)[0]);

        putData(DATABASE, STORE, customer, function () {
            location.hash = '#customer/' + customer.id;
            displayAlertBlock('success', 'The customer was updated successfully.');
        });
    }
};

customerTable.addEventListener('click', function (e) {
    if (e.target.cellIndex && e.target.cellIndex !== 0) {
        location.hash = '#customer/' + e.target.parentNode.id;
    }
}, false);

overallCheckbox.onchange = function () {
    var checkboxes, i, l;

    checkboxes = customerTable.querySelectorAll('input[type="checkbox"]')

    for (i = 0, l = checkboxes.length; i < l; i++) {
        checkboxes[i].checked = this.checked;
    }
};

window.addEventListener('load', function () {
    if (location.hash === '') {
        location.hash = '#list';
    } else {
        location.hash = '';
        location.hash = initialHash;
    }
}, false);

window.addEventListener('hashchange', function (e) {
    var hash, customerID;

    hash = location.hash;

    if (hash === '#list') {
        updateCustomerTable();
        overallCheckbox.checked = false;
        switchView('customer_list');
    } else if (hash === '#create') {
        clearCustomerForm();
        switchView('customer_form');
        customerForm.elements['firstName'].focus();
    } else if (/^#customer\/\d+$/.test(hash)) {
        customerID = Number(location.hash.match(/\d+/)[0]);
        readData(DATABASE, STORE, customerID, function (data) {
            if (data) {
                updateCustomerInfoPanel(data);
                switchView('customer_info');
            } else {
                location.hash = '#list';
            }
        });
    } else if (/^#customer\/\d+\/update$/.test(hash)) {
        customerID = Number(location.hash.match(/\d+/)[0]);
        readData(DATABASE, STORE, customerID, function (data) {
            if (data) {
                fillCustomerForm(data);
                switchView('customer_form');
                customerForm.elements['firstName'].focus();
            } else {
                location.hash = '#list';
            }
        });
    }
}, false);
