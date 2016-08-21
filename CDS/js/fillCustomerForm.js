// fillCustomerForm.js

/**
 * Fill customer form
 * @param  {object} customer - Object with customer data
 */
function fillCustomerForm(customer) {
    var customerForm = document.querySelector('.view#customer_form form');

    customerForm.querySelector('h1').textContent = parseOb(customer.name, ' ');
    customerForm.elements['firstName'].value = customer.name.firstName;
    customerForm.elements['lastName'].value = customer.name.lastName;
    customerForm.elements['email'].value = customer.email;
    customerForm.elements['telephone'].value = customer.telephone;
    customerForm.elements['street'].value = customer.address.street;
    customerForm.elements['city'].value = customer.address.city;
    customerForm.elements['state'].value = customer.address.state;
    customerForm.elements['zip'].value = customer.address.zip;
}
