const canvas = document.getElementById('netCanvas');
const ctx = canvas.getContext('2d');
let w, h, nodes = [];
const NODE_COUNT = 26;

function resize(){
  const hero = canvas.parentElement;
  w = canvas.width = hero.offsetWidth;
  h = canvas.height = hero.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

function initNodes(){
  nodes = [];
  for(let i=0;i<NODE_COUNT;i++){
    nodes.push({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3 });
  }
}
initNodes();

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function draw(){
  if(prefersReduced) return;
  ctx.clearRect(0,0,w,h);
  for(const n of nodes){
    n.x += n.vx; n.y += n.vy;
    if(n.x < 0 || n.x > w) n.vx *= -1;
    if(n.y < 0 || n.y > h) n.vy *= -1;
  }
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist < 140){
        ctx.strokeStyle = `rgba(79, 209, 197, ${1 - dist/140})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  for(const n of nodes){
    ctx.fillStyle = '#4FD1C5';
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
if(!prefersReduced) draw();