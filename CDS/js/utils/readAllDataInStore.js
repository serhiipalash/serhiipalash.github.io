// readAllDataInStore.js

/**
 * Read all data in Store and invoke callback after each success reading of stored objects
 * @param  {string}   database - Database name
 * @param  {string}   store    - Store name
 * @param  {Function} callback - Success callback
 */
function readAllDataInStore(database, store, callback) {
    var db, request;

    request = indexedDB.open(database);

    request.onupgradeneeded = function () {
        db = request.result;
        db.createObjectStore(store, { keyPath: 'id' });
    }

    request.onsuccess = function () {
        var transaction;

        db = request.result;
        transaction = db.transaction([store], 'readwrite').objectStore(store).openCursor();

        if (typeof callback === 'function') {
            transaction.onsuccess = callback;
        }

        transaction.onerror = function (e) {
            console.error('Error reading list of objects');
            console.error(e);
        }
    }

    request.onerror = function (e) {
        console.error('Error opening Database ' + database);
        console.error(e);
    }
}
