var diagrams = (function() {

	var obj = {};

	var PI2 = Math.PI * 2;

	var drawPoly = obj.drawPoly = function(g, n, x, y, xs, ys, angle) {
		g.beginPath();
		for (var i = 0; i < n; i++) {
			var a = angle + (i / n) * PI2;
			var tx = x + Math.cos(a) * xs;
			var ty = y + Math.sin(a) * ys;
			if (i == 0) g.moveTo(tx, ty);
			else g.lineTo(tx, ty);
		}
		g.closePath();
	};

	var drawArrow = function(g, x, y, angle) {
		drawPoly(g, 3, x, y, 5, 5, angle);
	};
  
  var draw = function(id, drawing) {
    var canvas = document.getElementById(id);
    var g = canvas.getContext("2d");
    if (g) drawing(g, canvas.width, canvas.height);
  };
  
  return {
    RADIANS: Math.PI / 180,
    DEGREES: 180 / Math.PI,
    draw: draw, 
    drawPoly: drawPoly, 
    drawArrow: drawArrow
  };

}());

var fromPolar = function(length, angle) {
  return {
    x: Math.cos(angle) * length,
    y: Math.sin(angle) * length
  };
}

function drawCircle(graphics, x, y, radius, numLines) {

  var angleIncrement = (Math.PI * 2) / numLines;
  
  // Move the pen to the first point on the edge of the circle before drawing
  var p0 = fromPolar(radius, 0);
  graphics.moveTo(x + p0.x, y + p0.y);

  for (var i = 0; i <= numLines; i++) {
    var angle = angleIncrement * i;
    var point = fromPolar(radius, angle);
    graphics.lineTo(x + point.x, y + point.y);
  }

}

function drawSpiral(graphics, x, y, radius, numLines) {

  var angleIncrement = (Math.PI * 2) / numLines;
  var radiusIncrement = radius / numLines;

  // Move the pen to the centre of the spiral before drawing
  graphics.moveTo(x, y);

  for (var i = 0; i <= numLines; i++) {
    var length = radiusIncrement * i;
    var angle = angleIncrement * i;
    var point = fromPolar(length, angle);
    graphics.lineTo(x + point.x, y + point.y);
  }

}

function drawSpiralTurns(graphics, x, y, radius, numLines, numTurns) {

  var angleIncrement = ((Math.PI * 2) * numTurns) / numLines;
  var radiusIncrement = radius / numLines;

  // Move the pen to the centre of the spiral before drawing
  graphics.moveTo(x, y);

  for (var i = 0; i <= numLines; i++) {
    var length = radiusIncrement * i;
    var angle = angleIncrement * i;
    var point = fromPolar(length, angle);
    graphics.lineTo(x + point.x, y + point.y);
  }

}

function runAnimation(graphics, x, y, width, height, radius) {

  var numTurns = 0;
  var numLines = 60;

  return setInterval(function() {

    // Clear the canvas before drawing the new spiral
    graphics.beginPath();
    graphics.clearRect(0, 0, width, height);
    
    drawSpiralTurns(graphics, x, y, radius, numLines, numTurns);
    graphics.stroke();
    
    // Slightly increase the number of turns the next spiral will be drawn with
    numTurns += 0.025;

  }, 30);
}

// ----------------------------------------------------------------------------------------------

$(function() {

  diagrams.draw("polarcoords", function(g, w, h) {

    var r = 160;
    var cx = w / 2;
    var cy = h / 2;

    g.font = "12px Helvetica, Arial, sans-serif";
    g.textBaseline = "middle";
    
    g.globalCompositeOperation = "destination-over";
    
    // Pole
    g.strokeStyle = "#1a2138";
    g.fillStyle = "#1a2138";
    g.arc(cx, cy, 5, 0, Math.PI * 2);
    g.fill();  
    
    // Polar axis
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(cx, cy);
    g.lineTo(cx + r, cy);
    g.stroke();
    diagrams.drawArrow(g, cx + r, cy, 0);
    g.fill();
    
    // Pole labels
    g.fillStyle = "#333";
    g.textAlign = "right";
    g.fillText("Pole", cx - 8, cy - 12);
    g.textAlign = "left";
    g.fillText("Polar axis", cx + r + 15, cy);
    
    g.font = "italic 12px Helvetica, Arial, sans-serif";

    // P0
    var p0p = { length: 100, angle: -76 * diagrams.RADIANS };
    var p0 = fromPolar(p0p.length, p0p.angle);
    g.strokeStyle = "#ba585c";
    g.fillStyle = "#ba585c";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(cx, cy);
    g.lineTo(cx + p0.x, cy + p0.y);
    g.stroke();
    g.beginPath();
    g.arc(cx + p0.x, cy + p0.y, 5, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.lineWidth = 1;
    g.arc(cx, cy, 20, p0p.angle, 0);
    g.stroke();
    g.textAlign = "center";
    g.fillStyle = "#333";
    g.fillText("P0 (distance=100, angle=-76°)", cx + p0.x, cy + p0.y - 15);
    
    // P1
    var p1p = { length: 160, angle: 150 * diagrams.RADIANS };
    var p1 = fromPolar(p1p.length, p1p.angle);
    g.strokeStyle = "#627194";
    g.fillStyle = "#627194";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(cx, cy);
    g.lineTo(cx + p1.x, cy + p1.y);
    g.stroke();
    g.beginPath();
    g.arc(cx + p1.x, cy + p1.y, 5, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.lineWidth = 1;
    g.arc(cx, cy, 20, 0, p1p.angle);
    g.stroke();
    g.textAlign = "center";
    g.fillStyle = "#333";
    g.fillText("P1 (distance=160, angle=150°)", cx + p1.x, cy + p1.y + 15);

  });
  
  // ----------------------------------------------------------------------------------------------
  
  diagrams.draw("circle", function(g, w, h) {
  
    g.strokeStyle = "#999";
    g.lineWidth = 2;
    g.beginPath();
    drawCircle(g, w / 2, h / 2, 70, 50);
    g.stroke();
  
  });
  
  // ----------------------------------------------------------------------------------------------
  
  diagrams.draw("polys", function(g, w, h) {
  
    g.strokeStyle = "#999";
    g.lineWidth = 2;
    
    g.beginPath();
    drawCircle(g, w / 4, h / 2, 70, 3);
    g.stroke();
    
    g.beginPath();
    drawCircle(g, w * 3 / 4, h / 2, 70, 5);
    g.stroke();
  
  });
  
  // ----------------------------------------------------------------------------------------------
  
  diagrams.draw("spiral1", function(g, w, h) {
  
    g.strokeStyle = "#999";
    g.lineWidth = 2;
    
    g.beginPath();
    drawSpiral(g, w / 2, h / 2, 70, 50);
    g.stroke();
  
  });
  
  // ----------------------------------------------------------------------------------------------
  
  diagrams.draw("spiral2", function(g, w, h) {
  
    g.strokeStyle = "#999";
    g.lineWidth = 2;
    
    g.beginPath();
    drawSpiralTurns(g, w / 2, h / 2, 70, 80, 3.5);
    g.stroke();
  
  });
  
  // ----------------------------------------------------------------------------------------------
  
  diagrams.draw("spiral3", function(g, w, h) {
  
    g.strokeStyle = "#999";
    g.lineWidth = 2;
    
    g.beginPath();
    drawSpiralTurns(g, w / 2, h / 2, 70, 80, 15);
    g.stroke();
  
  });
  
  // ----------------------------------------------------------------------------------------------
  
  diagrams.draw("unwind1", function(g, w, h) {
  
    var x = w / 2;
    var y = h / 2;
    var radius = Math.min(w, h) * 0.4;
  
    g.strokeStyle = "#999";
    g.lineWidth = 1;
    
    var interval = -1;
    
    var $toggle = $("<a href=\"#\">Start animation</a>");
    $toggle.click(function() {
      if (interval == -1) {
        $toggle.text("Stop animation");
        interval = runAnimation(g, x, y, w, h, radius, 60);
      } else {
        $toggle.text("Restart animation");
        clearInterval(interval);
        interval = -1;
      }
      return false;
    });
    
    $("#unwind1").after($toggle);
  
  });
  
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

});