// putData.js

/**
 * Update Data in IndexedDB Store
 * @param  {string}   database - Database name
 * @param  {string}   store    - Store name
 * @param  {object}   object   - Object with data
 * @param  {Function} callback - Success callback
 */
function putData(database, store, object, callback) {
    var db, request;

    request = indexedDB.open(database, 1);

    request.onupgradeneeded = function () {
        db = request.result;
        db.createObjectStore(store, { keyPath: 'id' });
    }

    request.onsuccess = function () {
        var transaction;

        db = request.result;
        transaction = db.transaction([store], 'readwrite').objectStore(store).put(object);

        transaction.onsuccess = function () {
            if (typeof callback === 'function') {
                callback();
            }
        }

        transaction.onerror = function (e) {
            console.error('Error writing object');
            console.error(e);
        }
    }

    request.onerror = function (e) {
        console.error('Error opening Database ' + database);
        console.error(e);
    }
}
