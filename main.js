// ==UserScript==
// @name         Skin Changer V1
// @namespace    https://github.com/lugloose
// @version      2024-07-29
// @description  A browser script made to give enhancements on miniblox.io
// @author       Cr1ms0n
// @match        https://miniblox.io/*
// @icon         https://miniblox.io/favicon.png
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';

	async function execute(url, oldScript) {
		if (oldScript) oldScript.type = 'javascript/blocked';
		let data = await fetch("https://raw.githubusercontent.com/lugloose/SkinChangerForMiniblox/main/injection.js").then(e => e.text());
		if (oldScript) oldScript.type = 'module';
		eval(data.replace("scripturl", url));
	}

	// https://stackoverflow.com/questions/22141205/intercept-and-alter-a-sites-javascript-using-greasemonkey
	if(navigator.userAgent.indexOf("Firefox") != -1)
	{
		window.addEventListener("beforescriptexecute", function(e) {
			if(e.target.src.includes("https://miniblox.io/assets/index"))
			{
				e.preventDefault();
				e.stopPropagation();
				execute(e.target.src);
			}
		}, false);
	}
	else
	{
		new MutationObserver(async (mutations, observer) => {
			let oldScript = mutations
				.flatMap(e => [...e.addedNodes])
				.filter(e => e.tagName == 'SCRIPT')
				.find(e => e.src.includes("https://miniblox.io/assets/index"));

			if (oldScript) {
				observer.disconnect();
				execute(oldScript.src, oldScript);
			}
		}).observe(document, {
			childList: true,
			subtree: true,
		});
	}
})();
