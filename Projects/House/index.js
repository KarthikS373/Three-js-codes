//* SCENE
const scene = new THREE.Scene();

//* SIZE
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspect = size.width / size.height;
const fov = 45;
let near = 0.1;
let far = 100;

//* OBJECTS
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: "#969CBA",
  })
);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// House
const house = new THREE.Group();
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(2, 2, 2),
  new THREE.MeshNormalMaterial({
    color: "brown",
  })
);
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(2, 2, 4),
  new THREE.MeshNormalMaterial({
    color: "brown",
  })
);
roof.position.y = 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1.3, 5),
  new THREE.MeshStandardMaterial({
    color: "brown",
    side: THREE.DoubleSide,
  })
);
door.position.z = 1.01;
house.add(door);

house.position.y = 1;
scene.add(house);

// Stairs
const stairs = new THREE.Group();
const stairMat = new THREE.MeshNormalMaterial();

const stair1 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.5, 0.5, 0.5),
  stairMat
);
stairs.add(stair1);

const stair2 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.25, 0.25, 0.5),
  stairMat
);
stair2.position.set(0, -0.125, 0.2);
stairs.add(stair2);

stairs.position.set(0, 0.25, 1.01);
scene.add(stairs);

//* CAMERA
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
scene.add(camera);
camera.position.set(0, 8, 8);

//* LIGHTS
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

//* RENDERER
const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setClearColor("#969CBA");
renderer.render(scene, camera);

//* CONTROLLER
const controls = new THREE.OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.enableDamping = true;
controls.update();

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  // * Rendering out to screen
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Updating the camera aspect
  camera.aspect - size.width / size.height;
  camera.updateProjectionMatrix();

  // Updating the renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});
