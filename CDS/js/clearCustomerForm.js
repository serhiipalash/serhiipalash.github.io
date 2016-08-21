// clearCustomerForm.js

/**
 * Clear customer form
 */
function clearCustomerForm() {
    var customerForm, inputs, i, l;

    customerForm = document.querySelector('.view#customer_form form'),
    inputs = customerForm.getElementsByTagName('input');

    for (i = 0, l = inputs.length; i < l; i++) {
        inputs[i].value = '';
    }

    customerForm.querySelector('h1').textContent = 'New Customer';
}
