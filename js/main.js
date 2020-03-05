var camera, scene, renderer;
var mesh;
// Link to OSC data
socket = new NodeSocket();
init();
animate();
//startPlot();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;
  scene = new THREE.Scene();

  /*
    var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    */

  //geometry = new THREE.IcosahedronGeometry(200, 1);

  geometry = new THREE.BoxBufferGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    wireframeLinewidth: 2
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
  requestAnimationFrame(animate);
  console.log(socket.getBeta());
  if (socket.getBeta() > 5) {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

function plot(beta) {
  console.log("plotting");
  var trace1 = {
    type: "bar",
    x: ["beta", "alpha"],
    y: [beta],
    marker: {
      color: "#C8A2C8",
      line: {
        width: 2.5
      }
    }
  };

  var data = [trace1];

  var layout = {
    title: "Plotting",
    font: { size: 18 }
  };

  var config = { responsive: true };

  Plotly.newPlot("plot", data, layout, config);
}

function startPlot() {
  updateFreq = 250;
  plot(0);
  setInterval(() => {
    Plotly.restyle("plot", "y", [
      [socket.getBeta() * Math.random(), socket.getBeta() * Math.random()]
    ]);
    console.log("updating");
  }, updateFreq);
}
