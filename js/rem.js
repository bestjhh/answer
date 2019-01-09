var win = window;
var doc = win.document;
var psdWidth = 750;
var tid;
var throttleTime = 100;
var metaEl = doc.querySelector('meta[name="viewport"]');
if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
}
metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1');

var resizeRem = function () {
    doc.documentElement.style.fontSize = window.innerWidth / psdWidth * 100 + 'px';

};

win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(resizeRem, throttleTime);
}, false);
win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(resizeRem, throttleTime);
    }
}, false);

resizeRem();
if (doc.readyState === 'complete') {
    resizeRem();
} else {
    doc.addEventListener('DOMContentLoaded', function (e) {
        resizeRem();
    }, false);
}
