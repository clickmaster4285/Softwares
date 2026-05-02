<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js"></script>


html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000);
//var gui = new dat.GUI();
camera.position.set(0, 0, 150);

var texture = (function() {
  var w = 16, h = 16;
  var canvas = document.createElement('canvas');
  //canvas.style.position = 'fixed';
  //document.body.appendChild(canvas);
  canvas.width = w; canvas.height = h;
  var context = canvas.getContext('2d');
  var gradient = context.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.2, '#00ffff');
  gradient.addColorStop(0.4, '#000040');
  gradient.addColorStop(1, '#000000');
  context.fillStyle = gradient;
  context.fillRect(0, 0, w, h);
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}());

var params = {
  radius: 100,
  tube: 40,
  radialSegments: 512,
  tubularSegments: 64,
  p: 2, // shape
  q: 3, // shape
  heightScale: 1
};
var geometry = new THREE.TorusKnotGeometry(
  params.radius,
  params.tube,
  params.radialSegments,
  params.tubularSegments,
  params.p,
  params.q,
  params.heightScale
);
var material = new THREE.PointCloudMaterial({
  color: 0xffffff,
  size: 3,
  transparent: true,
  map: texture,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide
});

var pointCloud = new THREE.PointCloud(geometry, material);
pointCloud.sortParticles = true;
scene.add(pointCloud);  

document.body.appendChild(renderer.domElement);

var step = 0;
var render = function() {
  window.requestAnimationFrame(render);

  step += 0.01;
  pointCloud.rotation.x = step;
  pointCloud.rotation.z = step;

  renderer.render(scene, camera);

};

var resize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', resize);

resize();
render();