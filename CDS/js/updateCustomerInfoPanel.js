// updateCustomerInfoPanel.js

/**
 * Update customer info panel
 * @param  {object} customer - Object with customer data
 */
function updateCustomerInfoPanel(customer) {
    var customerInfoPanel = document.getElementById('customer_info');

    customerInfoPanel.querySelector('h1').textContent = parseOb(customer.name, ' ');

    customerInfoPanel.querySelector('.panel-heading').textContent = 'ID: ' + customer.id;

    customerInfoPanel.querySelector('.panel-body').innerHTML = [
        '<p>Email: ' + customer.email + '</p>',
        '<p>Telephone: ' + customer.telephone + '</p>',
        '<p>Address: ' + parseOb(customer.address, ', ') + '</p>'
    ].join('');
}
