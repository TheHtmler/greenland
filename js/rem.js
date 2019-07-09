! function (window) {

  /* 设计图文档宽度 */
  var docWidth = 750;

  var doc = window.document,
    docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  var recalc = (function refreshRem() {
    var clientWidth = docEl.getBoundingClientRect().width;

    docEl.style.fontSize = clientWidth > 750 ?  100 + 'px' : clientWidth / docWidth * 100 + 'px';

    return refreshRem;
  })();

  /* 添加倍屏标识，安卓为1 */
  docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    /* 添加IOS标识 */
    doc.documentElement.classList.add('ios');
    /* IOS8以上给html添加hairline样式，以便特殊处理 */
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
      doc.documentElement.classList.add('hairline');
  }

  if (!doc.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

  window.addEventListener('resize', function () {
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  })
}(window);