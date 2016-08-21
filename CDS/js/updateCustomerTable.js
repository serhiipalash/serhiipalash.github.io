// updateCustomerTable.js

/**
 * Update customer table using all data in Store
 */
function updateCustomerTable() {
    var customerTable, customers;

    customerTable = document.querySelector('#customer_list table tbody');
    customers = [];

    readAllDataInStore(DATABASE, STORE, function (e) {
        var cursor = e.target.result;

        if (cursor) {
            customers.push(cursor.value);
            cursor.continue();
        } else {
            customerTable.innerHTML = '';
            customers.forEach(function (customer) {
                addCustomerToCustomerTable(customer);
            });
        }
    });
}
