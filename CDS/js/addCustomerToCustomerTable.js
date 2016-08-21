// addCustomerToCustomerTable.js

/**
 * Add customer to customer table
 * @param {object} customer - Object with customer data
 */
function addCustomerToCustomerTable(customer) {
    var customerTable, newRow;

    customerTable = document.querySelector('#customer_list table tbody');

    newRow = customerTable.insertRow(customerTable.rows.length - 1);

    newRow.id = customer.id;
    newRow.classList.add('info');
    newRow.innerHTML = [
        '<td><input type="checkbox" data-id="' + customer.id + '"></td>',
        '<td>' + parseOb(customer.name, ' ') + '</td>',
        '<td>' + parseOb(customer.email, ', ') + '</td>',
        '<td>' + parseOb(customer.telephone, ', ') + '</td>',
        '<td>' + parseOb(customer.address, ', ') + '</td>'
    ].join('');
}
