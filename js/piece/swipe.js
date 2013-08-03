/*jshint browser: true, bitwise: true, camelcase: true, curly: false, 
eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: false, 
noarg: true, noempty: true, nonew: true, undef: true, unused: true, 
strict: true, sub: false, quotmark: double */
/*global $ */

// 2013-08-03

(function () {

    "use strict";
    
    var canvas = document.getElementById("g");
    if (!canvas.getContext) return;
    
    // --- sizing -------------------------------------------------------------
    
    var w = 0;
    var h = 0;
    
    var resizeCanvas = function () {
        w = $(window).innerWidth();
        h = $(window).innerHeight();
        $("#g").attr({ width: w, height: h });
    };
    
    // --- swipe --------------------------------------------------------------
    
    var g = canvas.getContext("2d");

    var swipe = function (hue) {
    
        var axis = Math.random() < 0.5 ? "x" : "y"; 
        var o = 300;
        var pos = {
            x: axis === "x" ? Math.random() * w : Math.random() < 0.5 ? -o : w + o,
            y: axis === "y" ? Math.random() * h : Math.random() < 0.5 ? -o : h + o
        };
        
        var radiusInc = 1.5;
        var maxRadius = Math.max(w, h) * (0.5 + Math.random());
        var minI = Math.floor((maxRadius * 0.5) / radiusInc);
        var maxI = Math.floor(maxRadius / radiusInc);
        var i = minI;
        
        return function () {
            var t = (i - minI) / (maxI - minI);
            var alpha = t < 0.5 ? (t * 2) : 1 - (t - 0.5) * 2;
            g.strokeStyle = "hsla(" + hue + ", 50%, 50%, " + alpha + ")";
            g.beginPath();
            g.arc(pos.x, pos.y, radiusInc * i, 0, Math.PI * 2);
            g.stroke();
            i++;
            return i < maxI;
        };
    };
    
    // --- hues ------------------------------------------------------------
    
    var nextHue = (function () {
    
        var hueSet = [];
        var hues = [];
        var numHues = 16;
        var hueInc = 360 / numHues;
        
        for (var i = 0; i < numHues; i++) {
            hueSet[i] = hueInc * i;
        }
        
        return function () {
            if (hues.length === 0) {
                hues = hueSet.slice();
                hues.sort(function () { 
                    return Math.random() < 0.5 ? 1 : -1;
                });
            }
            return hues.pop();
        };
    
    }());
    
    // --- init ---------------------------------------------------------------
    
    $(window).on("resize", function () {
        resizeCanvas();
    });

    resizeCanvas();
    $("#g").css("display", "block");
    
    var swipes = [];
    var numSwipers = 8;
    
    var frameTick = 1000 / 20;
    
    var runSwipes = function () {
        for (var i = 0; i < swipes.length; i++) {
            var keep = swipes[i]();
            if (!keep) swipes.splice(i--, 1);
        }
        while (swipes.length < numSwipers) {
            swipes.push(swipe(nextHue()));
        }
        setTimeout(runSwipes, frameTick);
    };
    
    runSwipes();

}());