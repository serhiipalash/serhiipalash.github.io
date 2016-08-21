// deleteData.js

/**
 * Delete Data in IndexedDB Store
 * @param  {string}   database - Database name
 * @param  {string}   store    - Store name
 * @param  {number}   id       - ID of object to delete
 * @param  {Function} callback - Success callback
 */
function deleteData(database, store, id, callback) {
    var db, request;

    request = indexedDB.open(database);

    request.onupgradeneeded = function () {
        db = request.result;
        db.createObjectStore(store, { keyPath: 'id' });
    }

    request.onsuccess = function () {
        var transaction;

        db = request.result;
        transaction = db.transaction([store], 'readwrite').objectStore(store).delete(id);

        transaction.onsuccess = function () {
            if (typeof callback === 'function') {
                callback();
            }
        }

        transaction.onerror = function (e) {
            console.error('Error deleting object with ID: ' + id);
            console.error(e);
        }
    }

    request.onerror = function (e) {
        console.error('Error opening Database ' + database);
        console.error(e);
    }
}
