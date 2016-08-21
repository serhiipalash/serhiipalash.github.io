// displayAlertBlock.js

/**
 * Display alert block
 * @param  {string} type - Type of alert block. Can be 'success', 'warning', 'danger', 'info'
 * @param  {string} text - Text to display
 */
function displayAlertBlock(type, text) {
    var alertBlock, alertType, alertText;

    alertBlock = document.getElementById('alert_block');
    alertType  = alertBlock.querySelector('#alert_type');
    alertText  = alertBlock.querySelector('#alert_text');

    alertType.textContent = type[0].toUpperCase() + type.substring(1) + '!';
    alertText.textContent = text;
    alertBlock.className  = 'alert alert-' + type;

    setTimeout(function (argument) {
        alertBlock.classList.add('hidden');
    }, 3000);
}
