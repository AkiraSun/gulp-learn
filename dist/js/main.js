"use strict";!function(){var t=navigator.userAgent,e=/Android/.test(t),a=/iPhone|iPad/.test(t),i=/MicroMessenger/.test(t),n=/Weibo/.test(t),o=a&&!/Version.+Safari/.test(t),d=a&&!o,u=/douban/.test(t),r=/\sQQ\//.test(t);window.ua={iOS:a,Android:e,Wechat:i,Weibo:n,iOSWebView:o,iOSSafari:d,Douban:u,QQ:r},window.document.addEventListener("touchstart",function(){},!1);var s=window.document.documentElement;s.hidden=!0,function(){ua.iOSWebView?s.dataset.ua="iOSWebView":ua.iOSSafari?s.dataset.ua="iOSSafari":ua.Android&&(s.dataset.ua="Android")}(),function(){var t=document.querySelector("#downloadLink");ua.Weibo?t.href="http://t.cn/Rt8oSLV":ua.Wechat?t.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android&g_f=991703":ua.Android?t.href="http://api.zhihu.com/client/download/apk":ua.iOS?t.href="itms-apps://itunes.apple.com/app/apple-store/id432274380":t.href="https://www.zhihu.com/app"}(),function(){s.dataset.layout="showOpenGuide";var t=document.querySelector("#guideText");ua.iOSSafari?t.textContent="请下拉页面点击「打开」":ua.iOS?t.textContent="请点击右上角用「Safari」打开":t.textContent="请点击右上角用浏览器打开"}(),s.hidden=!1}();