// 2011-11-20

window.onload = function() {

  var g = document.getElementById("g");
  if (!g.getContext) return;
  
  document.getElementById("canvas").style.display = "block";
  var ctx = g.getContext("2d"); 

  var w = g.width;
  var r = w / 2;
  var n = 9;
  var cw = w / n;
  
  var xs = [];
  var ps = [];
  var ss = [];
  var ys = [];
  
  for (var i = 0; i <= n; i++) {
    ps[i] = Math.random();
    ss[i] = Math.random();
    ys[i] = i % 2 == 0 ? -20 : 0;
  }
  
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  
  ctx.globalCompositeOperation = "source-atop";
  
  var minSpeed = 0.05 / 2;
  var maxSpeed = 0.25 / 2;
  
  var timer = setInterval(function() {
    
    ctx.strokeStyle = "#b4b4b4";
    ctx.beginPath();
    
    var min = Infinity;
    
    for (var i = 0; i <= n; i++) {
      var v = i == 0 || i == n ? 0 : 0.5 + (Math.sin(ps[i]) / 2)
      var x = i * cw + (v * cw);
      var y = ys[i];
      if (y < min) min = y;
      if (i == 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      ys[i] += 1.5;
      ps[i] += minSpeed + (maxSpeed - minSpeed) * ss[i];
    }
    
    ctx.stroke();
    ctx.closePath();
    
    if (min > w) clearInterval(timer);
  
  }, 30);
}