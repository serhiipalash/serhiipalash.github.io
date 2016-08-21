// switchView.js

/**
 * Switch view
 * @param  {string} view - String contains ID of element to show
 */
function switchView(view) {
    var views, i, l;

    views = document.getElementsByClassName('view');

    for (i = 0, l = views.length; i < l; i++) {
        if (views[i].id === view) {
            views[i].classList.remove('hidden');
            continue;
        }
        views[i].classList.add('hidden');
    }
}
