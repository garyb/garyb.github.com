// 2011-11-17

window.onload = function() {

  var g = document.getElementById("g");
  if (!g.getContext) return;
  
  document.getElementById("canvas").style.display = "block";
  var ctx = g.getContext("2d"); 

  var d = g.width;
  var r = d / 2;
  
  var ti = Math.random() * Math.PI * 2;
  var s = 160;
  var a = function(x, y) { return (x /= y) * x; }
            
  setInterval(function() {
    
    ctx.clearRect(0, 0, d, d);
    ctx.globalCompositeOperation = "source-over";
    
    var t = Math.PI / 2, x = r, y = r;
    for (var i = 0; i <= s; i++) {
      ctx.strokeStyle = "rgba(140, 140, 140, " + (1 - a(i, s)) + ")";
      ctx.beginPath();
      ctx.moveTo(x, y);
      var l = i / s * r;
      x = r + l * Math.cos(t);
      y = r + l * Math.sin(t);
      ctx.lineTo(x, y);
      ctx.stroke();
      t += ti;
    }
    
    ti += 0.0015;
    
    ctx.globalCompositeOperation = "destination-atop";
    ctx.fillStyle = "#eee";
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    
    ctx.translate(r, r);
    ctx.rotate(-0.116);
    ctx.translate(-r, -r);
  
  }, 30);
}