// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

/**
 * My changes:
 * Global function is not overwritten, the reference to the resulting 
 * 'requestAnimationFrame' function is saved instead uder the projects namespace. 
 */
 
// Used to avoid polluting the namespace.
var Morrocoi = Morrocoi || {};
 
Morrocoi.requestAnimationFrame = (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
	var resultingFunction = window.requestAnimationFrame;
    for(var x = 0; x < vendors.length && !resultingFunction; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    }
 
    if (!resultingFunction){
        resultingFunction = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
	}
	
	return function(callBack){return resultingFunction(callBack);};
}());

Morrocoi.cancelAnimationFrame = (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
	var resultingFunction = window.cancelAnimationFrame;
    for(var x = 0; x < vendors.length && !resultingFunction; ++x) {
        resultingFunction = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!resultingFunction){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
	}
	
	return resultingFunction;
}());