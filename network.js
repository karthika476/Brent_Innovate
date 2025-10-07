const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d', { alpha: true });

let nodes = [];
let dpr = Math.max(1, window.devicePixelRatio || 1);

function sizeCanvas(){
  const rect = canvas.getBoundingClientRect();
  canvas.width  = Math.floor(rect.width  * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function initNodes(){
  nodes = [];
  const area = (canvas.width/dpr) * (canvas.height/dpr);
  const count = Math.max(28, Math.floor(area / 12000));
  for(let i=0;i<count;i++){
    nodes.push({
      x: Math.random()*(canvas.width/dpr),
      y: Math.random()*(canvas.height/dpr),
      vx: (Math.random()*0.4-0.2),
      vy: (Math.random()*0.4-0.2)
    });
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width/dpr,canvas.height/dpr);

  for(let i=0;i<nodes.length;i++){
    const n = nodes[i];
    n.x += n.vx; n.y += n.vy;
    if(n.x<0||n.x>canvas.width/dpr)  n.vx *= -1;
    if(n.y<0||n.y>canvas.height/dpr) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 3, 0, Math.PI*2);
    ctx.fillStyle = '#1a3c78';
    ctx.fill();

    for(let j=i+1;j<nodes.length;j++){
      const m = nodes[j];
      const dist = Math.hypot(n.x-m.x, n.y-m.y);
      if(dist < 160){
        ctx.strokeStyle = 'rgba(26, 60, 120, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x,n.y);
        ctx.lineTo(m.x,m.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

function setup(){
  sizeCanvas();
  initNodes();
  draw();
}

window.addEventListener('resize', setup);
setup();
