// 2011-11-20

window.onload = function() {

  var g = document.getElementById("g");
  if (!g.getContext) return;
  
  document.getElementById("canvas").style.display = "block";
  var ctx = g.getContext("2d"); 

  var w = g.width;
  var r = w / 2;
  var q = 6;
  var n = 1000;
  var cw = w / n;

  var as = [];
  var ls = [];
  var ss = [];
  var sv = [];
  var sn = Math.random() < 0.5 ? 1 : -1;
  var vs = 3;
  
  var minSpeed = 0.2;
  var maxSpeed = 1;
  
  for (var i = 0; i < n; i++) {
    as.push(Math.random() * Math.PI * 2);
    ls.push(q + Math.random() * (r - q));
    ss.push(minSpeed + (maxSpeed - minSpeed) * Math.random());
    sv.push(Math.random() * vs);
  }
   
  var timer = setInterval(function() {
    
    ctx.clearRect(0, 0, w, w);
    
    ctx.globalCompositeOperation = "source-over";
    
    ctx.fillStyle = "#eee";
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    
    ctx.globalCompositeOperation = "source-atop";
        
    for (var i = 0; i < n; i++) {
      var a = as[i];
      var l = ls[i];
      var x = r + Math.cos(a) * l;
      var y = r + Math.sin(a) * l;
      var dist = 1 - (l / r);
      ctx.fillStyle = "rgba(100, 100, 100, " + (1-dist)  + ")";
      ctx.beginPath();
      ctx.arc(x, y, dist * 3, 0, Math.PI * 2, true);
      ctx.fill();
      if (dist < 0.05) {
        as[i] = Math.random() * Math.PI * 2
        ls[i] = q;
        ss[i] = minSpeed + (maxSpeed - minSpeed) * Math.random();
        sv[i] = Math.random() * vs;
      } else {
        as[i] += ss[i] * Math.pow(dist, 4) / 10 * sn;
        ls[i] += ss[i] * (0.5 + sv[i]);
      }
    }
  
  }, 30);
}