// readData.js

/**
 * Read Data in IndexedDB Store
 * @param  {string}   database - Database name
 * @param  {string}   store    - Store name
 * @param  {[type]}   id       - ID of object to read
 * @param  {Function} callback - Success callback
 */
function readData(database, store, id, callback) {
    var db, request;

    request = indexedDB.open(database);

    request.onupgradeneeded = function () {
        db = request.result;
        db.createObjectStore(store, { keyPath: 'id' });
    }

    request.onsuccess = function () {
        var transaction;

        db = request.result;
        transaction = db.transaction([store], 'readonly').objectStore(store).get(id);

        transaction.onsuccess = function () {
            if (typeof callback === 'function') {
                callback(transaction.result);
            }
        }

        transaction.onerror = function (e) {
            console.error('Error reading object with ID: ' + id);
            console.error(e);
        }
    }

    request.onerror = function (e) {
        console.error('Error opening Database ' + database);
        console.error(e);
    }
}
