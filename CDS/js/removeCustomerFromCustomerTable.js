// removeCustomerFromCustomerTable.js

/**
 * Remove customer from customer table
 * @param  {number} id - Customer ID
 */
function removeCustomerFromCustomerTable(id) {
    var customerTable, customerRow;

    customerTable = document.querySelector('#customer_list table tbody');
    customerRow   = document.getElementById(id);

    if (customerRow !== null) {
        customerTable.removeChild(customerRow);
    }
}
